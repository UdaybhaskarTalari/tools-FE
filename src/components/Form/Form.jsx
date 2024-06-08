import { useContext, useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { request } from "../../services/Axios/Httpcalls.js";
import { field } from "../../ContextProvider.jsx";
import { checkColumn } from "../../services/FileToDBCompare.js";
import { submit ,acceptedfileDB, formLabel} from "../../constants/constants.jsx";
import { useNavigate } from "react-router-dom";
import GetAllSessions from "../DBCredentials/DBCredentials.jsx";
import { storedata } from "../../services/DatabaseSessions.js";
import Loader from "../../common/Loader/Loader.jsx";
import { ButtonComponent } from "../../common/Button/ButtonComponent.jsx";
import { notify } from "../../services/Toast.js";
import { ToastContainer } from "react-toastify";
import { Select } from "../../common/Select/Select.jsx";
import { DBForm } from "../../common/Form/Form.jsx";
export const Form = () => {
  const Navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState("");
  const {
    fileToDB,
    setfileDB,
    setStep,
    token,
    initialCompareFiletoDB,
    setInitialCompareFiletoDB,
    setDroppedValues,
    setIndex,
  } = useContext(field);
  useEffect(() => {
    if (fileToDB.connectionStatus) {
      checkColumn(
        fileToDB,
        initialCompareFiletoDB,
        setInitialCompareFiletoDB,
        token,
        setDroppedValues,
        setIndex
      );
    }
  }, [fileToDB]);

  const handleChange = (e) => {
    setInitialCompareFiletoDB({})
    setfileDB((prev)=>({
      ...prev,
      connectionStatus: false,
      tables:[],
      dbValues:{...prev.dbValues,[e.target?.name]: e.target?.value},
    }));
  };
  /**
   *
   * @param {object} formdata stores the input of the dbcredentials for file to db comparison
   * @description
   * 1.stores the formdata in a state `setDBInput` to retirive the data for the user when going back
   * 2.send a request to build a database connection
   * 3.stores the response in `setfileDB` state
   */
  const setDatabaseData = async (e) => {
    e.preventDefault();
    try {
      let data = {
        host: fileToDB["dbValues"].host,
        databaseName: fileToDB["dbValues"].databaseName,
        userName: fileToDB["dbValues"].userName,
        password: fileToDB["dbValues"].password,
        dbType: fileToDB["dbValues"].DBType,
        tableName: "",
        port: fileToDB["dbValues"].port,
        istable:true
      };
      setLoader(true);
      await databaseConnection(data);
      if (file != "") storedata({ ...data, file }, token);
      setInitialCompareFiletoDB({ ...initialCompareFiletoDB, status: false });
      setLoader(false);
    } catch (e) {
      notify(e.message,"Error")
      Navigate("/error");
    }
  };
  const tableSelection=async (e,type)=>{

    e.preventDefault()
    try{
    setfileDB((prev)=>({
      ...prev,
      connectionStatus: false,
      dbValues:{...prev.dbValues,[e.target.name]: e.target.value},
    }));
    let data = {
      host: fileToDB["dbValues"].host,
      databaseName: fileToDB["dbValues"].databaseName,
      userName: fileToDB["dbValues"].userName,
      password: fileToDB["dbValues"].password,
      dbType: fileToDB["dbValues"].DBType,
      tableName: e.target.value,
      port: fileToDB["dbValues"].port,
      istable:false
    };
    const res = await request("POST", "databaseconnection", data, token);
    setfileDB({
      ...fileToDB,
      dbFile: res?.filename,
      connectionStatus: res?.status,
    });
  }
  catch(error){
    notify(error.message,"error")
  }
  };
  const databaseConnection = async (data) => {
    try{
    const res = await request("POST", "databaseconnection", data, token);
    setfileDB({
      ...fileToDB,
      dbMessage: res?.message,
      tables:res?.tables
    
    });
    if(!res?.status)
    notify(res?.message,res?.status)
    }
    catch(error){
      notify(error.message,"error")
    }
  };
  return (
    <>
      <ToastContainer/>
      <div className={styles.buttons}>
          <div >
            <ButtonComponent
              type={"button"}
              status={true}
              variant={"contained"}
              size={"small"}
              disable={false}
              label={"Back"}
              clickFunction={() => {setStep(1);
                                    setfileDB(prev=>({...prev,dbMessage:"",dbFile:"",tables:[],connectionStatus:false,dbValues:{}}))
                                    setInitialCompareFiletoDB({})
                                  }
                                  }
            />
          </div>
          <div >
            <ButtonComponent
              type={"button"}
              status={initialCompareFiletoDB?.status}
              variant={"contained"}
              size={"small"}
              disable={false}
              label={"Next"}
              clickFunction={() => setStep(3)}
            />
          </div>
        </div>
      <div className={styles.form_container}>
        <div className={styles.container}>
          <Loader loader={loader} color={"#7a7a7b"} size={150} />
          <form onSubmit={setDatabaseData} className={styles.form}>
          <p className={styles.heading}>Enter Database details</p>
            <Select options={acceptedfileDB} defaultValue={fileToDB["dbValues"]?.DBType} handleChange={handleChange}type={"target"} name={"DBType"}/>

            {fileToDB["dbValues"]?.DBType != null && (
              <GetAllSessions
                id={"2"}
                setDBDetails={setfileDB}
                DBdetails={fileToDB}
                dbType={fileToDB["dbValues"]?.DBType}
                common={setfileDB}
                setFile={setFile}
              />
            )}
            <DBForm connection={fileToDB["dbValues"]} handleChange={handleChange} />
            <div className="controls">
              <ButtonComponent
                type={"submit"}
                status={true}
                variant={"contained"}
                size={"small"}
                disable={fileToDB?.tables?.length>0}
                label={submit}
              />
            </div>
            {fileToDB?.tables?.length>0 &&
            <div className={styles.input_div}>
              <label>{formLabel.table}</label>
              <Select options={fileToDB?.tables} handleChange={tableSelection} type={"target"} name={"tableName"}/>
              </div>
            }
          </form>
        </div>
      </div>
    </>
  );
};
