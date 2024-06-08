import { request } from "./Axios/Httpcalls";
import { notify } from "./Toast";
/**
 * 
 * @param {object} ind 
 * @param {Array} sourceHeaders 
 * @param {Array} targetHeaders 
 * @param {string} type 
 * @param {object} fileToDB 
 * @param {CallableFunction} setMisMatches 
 * @param {Array} misMatches 
 * @param {Object} csvFields 
 * @param {number} minLength 
 * @param {CallableFunction} setStep 
 * @param {string} token 
 * @description calls the final comparision api based on the "type" and stores the response.
 */
export const finalCompare = async (ind,sourceHeaders,targetHeaders,type,fileToDB,setMisMatches,misMatches,csvFields,minLength,setStep,isEnable,token,page,setLoader) => {

    setLoader(true)
    let values = Object.values(ind);
    let keys = Object.keys(ind);
    if(!isEnable){
      values=[]
      keys=[]
    }
    else{
    for (let i = 0; i < keys.length; i++) {
      keys[i] = Number(keys[i]);
    }
  }
    if (
      (sourceHeaders.length == targetHeaders.length &&
        values.length == minLength &&
        type == "file to db") ||
      (values.length <= minLength && type == "file to db")
    ) {
      const res = await request("POST", "filetodbcompare", {
        primarykey: fileToDB.primaryKeyFile,
        datadb: fileToDB.dbFile,
        datafile: fileToDB.fileName,
        condition: [values,keys],
      },token);
      setMisMatches({
        ...misMatches,
        misMatchesCount: res.numberOfRecords,
        message: res.message,
        records: res.LostData,
        misMatchFile: res.misMatchFile,
        status:res.status
      });
    } else if (
      (sourceHeaders.length == targetHeaders.length &&
        values.length == minLength &&
        type == "csv to csv") ||
      (values.length <= minLength && type == "csv to csv")
    ) {
      await handleCSV({
        condition: [keys,values],
        source: csvFields?.sourceFile,
        target: csvFields?.targetFile,
        
      },setMisMatches,token);
    } 
    setLoader(false)

    setStep(page);
  };


const handleCSV = async (payload,setMisMatches,token) => {
  try{
    let res = await request("POST", "csvcompare", payload,token);
    setMisMatches({
      status:res?.status,
      records: res?.mismatches,
      message: res?.message,
      misMatchFile: res?.misMatchFile,
      misMatchesCount: res?.numberOfRecords,
    });
  }
  catch(e){
    notify(e.message,"error")
  }
  };