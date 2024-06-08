/**
 * 
 * @param {CallableFunction} Navigate 
 * @param {CallableFunction} setMisMatches 
 * @param {CallableFunction} setfileDB 
 * @param {CallableFunction} setCSVFields 
 * @param {CallableFunction} setStep 
 * @param {string} route 
 * @param {string} token 
 * @description navigates to the home page and resets all the states
 */
export const navigate = (Navigate,route) => {
    Navigate(`/${route}`);
  };
  export const Reset=(setMisMatches,setfileDB,setCSVFields,setStep,setEnable,setDBDetails,setUploadFile,setInitialCompareCSVtoCSV,setTableSchema,setDbQuery)=>{
    setTableSchema({})
    setInitialCompareCSVtoCSV({})
    setDbQuery({
      source: "select * from ;",
      target: "select * from ;",
    })
    setUploadFile({})
    setEnable(false);
    setMisMatches({});
    setfileDB({
      fileMessage: "",
      fileName: "",
      dbMessage: "",
      dbFile: "",
      primaryKeyFile: "",
      sourceHeader: [],
      targetHeader: [],
      finalMessage: "",
    });
    setCSVFields({
      sourceHeaders: [],
      targetHeaders: [],
      status: "",
      sourceFile: "",
      targetFile: "",
    });
    setStep(1);
    setDBDetails({})
  }