/* eslint-disable react/prop-types */

import styles from "./DbConnection.module.scss";
import { useContext } from "react";
import { field } from "../../ContextProvider";
import GetAllSessions from "../DBCredentials/DBCredentials";
import { useState } from "react";
import { storedata } from "../../services/DatabaseSessions";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "../../common/Select/Select";
import { acceptedDBs, formLabel } from "../../constants/constants";
import { DBForm } from "../../common/Form/Form";
export default function DatabaseConnection({ id, setClicked, dbType, common }) {
  const [file, setFile] = useState("");
  const { setDBDetails, DBdetails, token,tableSchema, setTableSchema } = useContext(field);
  const setDataBase = (e) => {
    e.preventDefault();
    setClicked(true);
    if (file != "")
      storedata({ ...DBdetails[common], file, dbType: DBdetails[dbType] }, token);
  };

  /**
   * 
   * @description invoked when the DB type is changed and set stores the database type
   */
  const handleDBChange=(e,type)=>{
    setDBDetails((prev) => ({ ...prev, [type]: e.target.value }));
  }
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableSchema({})
    setDBDetails((prev) => ({
      ...prev,
      [common]: {
        ...prev[common],
        [name]: value,
        type: DBdetails[dbType],
      },
    }));
  };
  return (
    <div className={styles.main_container_dbbox}>
      <ToastContainer />
      {id == "1" ? (
        <h2 className={styles.main_container_dbbox_heading}>Source</h2>
      ) : (
        <h2 className={styles.main_container_dbbox_heading}>Target</h2>
      )}
      <form className={styles.form}>
        <label htmlFor="">{formLabel.dbType}</label>
        <Select options={acceptedDBs} defaultValue={DBdetails[dbType]} handleChange={handleDBChange} type={dbType} name={dbType}/>
        {(DBdetails[dbType] == "mysql" ||
          DBdetails[dbType] == "postgres" ||
          DBdetails[dbType] == "oracle") && (
          <>
            <GetAllSessions
              id={"1"}
              setDBDetails={setDBDetails}
              DBdetails={DBdetails}
              dbType={DBdetails[dbType]}
              common={common}
              setFile={setFile}
            />
            <DBForm connection={DBdetails[common]} handleChange={handleChange}/>

            <ButtonComponent type={"submit"} status={true} variant={"contained"} size={"small"} disable={tableSchema?.status} label={"Save"} clickFunction={setDataBase}/>
          </>
        )}
        
      </form>
    </div>
  );
}
