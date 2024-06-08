import { request } from "./Axios/Httpcalls";
import { notify } from "./Toast";
/**
 * 
 * @param {object} fileToDB 
 * @param {CallableFunction} setfileDB 
 * @param {CallableFunction} setFileStatus 
 * @param {string} token 
 * @param {blob} file 
 * @description uploads a single csv file and stores the response
 */
export const upload = async (fileToDB,setfileDB,token,file) => {
  try{
    const formData = new FormData();
    formData.append("file", file);
    const res = await request("POST", "file", formData,token);
    if(!res.status)notify(res.message, res.status);
    setfileDB({
      ...fileToDB,
      fileMessage: res.message,
      fileName: res.filename,
      uploadStatus:res.status
    });
  }
  catch(e){
    notify(e.message,"Error")
  }
  };

/**
 * 
 * @param {object} fileToDB 
 * @param {CallableFunction} setfileDB 
 * @param {string} token 
 * @description calls an api initialfiletodbcompare(checks the headers order and headers count) and stores the response
 */  
export const checkColumn = async (fileToDB,initialCompareFiletoDB,setInitialCompareFiletoDB,token,setDroppedValues,setIndex) => {
 
try{  
    const res = await request(
      "POST",
      "initialfiletodbcompare",
      { dataDb: fileToDB.dbFile, dataFile: fileToDB.fileName },
      token
    );
    setInitialCompareFiletoDB({
      sourceHeaders: res.header1,
      targetHeaders: res.header2,
      message: res.message,
      status: res.status,
    });
    if(!res.status || res.status=="error")
      notify(res.message,res.status)
    setDroppedValues([])
    setIndex({})
  }
  catch(e){
    notify(e.message,"error")
  }
  };

  