import { request } from "./Axios/Httpcalls"
import { notify } from "./Toast"
/**
 * 
 * @param {CallableFunction} setDBcred 
 * @param {object} dbcred 
 * @param {string} token 
 * @description to gets all details of the database sessions 
 */
export const getpastdata=async(id,setDBcred,DBdetails,dbType,token)=>{
  try{
    const res= await request("POST","getpastdata",{dbType:dbType},token)
    if(!res.status)
      notify(res?.message,res?.status)
    else
      setDBcred(res?.files)
  }
  catch(e){
    notify(e.message,"error")
  }
  }

/**
 * 
 * @param {CallableFunction} setDbName 
 * @param {CallableFunction} setPort 
 * @param {CallableFunction} setHost 
 * @param {CallableFunction} setUsername 
 * @param {CallableFunction} setPassword 
 * @param {CallableFunction} setMongoURI 
 * @param {CallableFunction} setMongoDBName 
 * @param {CallableFunction} setSqlitePath 
 * @param {string} token 
 * @param {string} fileName 
 * @description gets the selected database details and sets the details in the form
 */
export const getdata=async(id,setDBDetails,DBdetails,token,fileName,common)=>{
  try{
    const res= await request("POST","getdata", {file:fileName},token)
    if(id=="1")
    setDBDetails({...DBdetails,[common]:{
      type:res.data.dbType,
      host: res.data.host,
      databaseName: res.data.databaseName,
      userName: res.data.userName,
      password: res.data.password,
      port: res.data.port,
    }})
    else{
      setDBDetails({...DBdetails,
        dbValues:{
        DBType:res.data?.dbType,
        host: res.data?.host,
        databaseName: res.data?.databaseName,
        userName: res.data?.userName,
        password: res.data?.password,
        port: res.data.port,
        tableName:res?.data?.tableName
        }
      })
    }
    if(!res.status)
      notify(res?.message,false)
  }catch(e){
    notify(e.message,"Error")
  }
  }

  export const deleteSession=async(setDBcred,item, token,type)=>{
    try{
    const res=await request("DELETE",'deletesession',{file:item,dbType:type},token)
    setDBcred(res?.files)
    if(!res.stauts)
      notify(res?.message,false)
    }catch(e){
      notify(e.message,"Error")
    }
}
export const storedata = async (data,token) => {
  try{
  await request("POST", "setdata", data, token);
  }catch(e){
    notify(e.message,"error")
  }

};