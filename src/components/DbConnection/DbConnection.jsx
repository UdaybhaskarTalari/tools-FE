/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import styles from "./DbConnection.module.scss";
import DatabaseConnection from "./DatabaseConnection";
import { field } from "../../ContextProvider";

import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { request } from "../../services/Axios/Httpcalls";
import { useNavigate } from "react-router-dom";
import { dataBase } from "../../constants/constants";
import Loader from "../../common/Loader/Loader";
import { notify } from "../../services/Toast";
import { ToastContainer } from "react-toastify";
export default function DbConnection({ setCurrentStep }) {
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();
  //setTableSchema -> to globally store the response from the submit post API call
  const { tableSchema, setTableSchema, token, DBdetails } = useContext(field);
  useEffect(() => {}, [DBdetails, tableSchema]);

  //set to true when database1 details are saved, passed as props to databaseConnection.jsx
  const [isClicked1, setClicked1] = useState();

  //set to true when database2 details are saved, passed as props to databaseConnection.jsx
  const [isClicked2, setClicked2] = useState();

  //To update the form values
  useEffect(() => {}, [tableSchema]);

  /**
   *
   * @param {Event} e
   * @description `DBdetails` are stored globally in the component DatabaseConnection
   * based on the DBTypes of the source and target the request data is arranged
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      let req = {};
      if (DBdetails.sourceDbType == "mongo")
        req.source = { ...DBdetails.sourceMongo };
      else req.source = { ...DBdetails.sourceCommon };

      if (DBdetails.targetDbType == "mongo")
        req.target = { ...DBdetails.targetMongo };
      else req.target = { ...DBdetails.targetCommon };

      const res = await request("POST", "connect", req, token);
      setTableSchema(res);
      
      setLoader(false);  
      if (!res.status)notify(res.message,false)

      if (res.status) setCurrentStep(2);
    } catch (error) {
      Navigate("/error");
      setLoader(false);
    }
  };

  return (
    <>
    <ToastContainer/>
      <div className={styles.btn}>
        <ButtonComponent
          type={"button"}
          status={tableSchema?.status}
          variant={"contained"}
          size={"small"}
          disable={false}
          label={"Next"}
          clickFunction={() => setCurrentStep(2)}
        />
      </div>
      <div className={styles.main}>
        <h1 className={styles.main_heading}>{dataBase.heading}</h1>
        <p className={styles.main_subheading}>{dataBase.subheading}</p>
        <div className={styles.main_container}>
          <DatabaseConnection
            id={1}
            dbType={"sourceDbType"}
            common={
              DBdetails.sourceDbType == "mongo" ? "sourceMongo" : "sourceCommon"
            }
            setClicked={setClicked1}
            
          />
          <DatabaseConnection
            id={2}
            dbType={"targetDbType"}
            common={
              DBdetails.targetDbType == "mongo" ? "targetMongo" : "targetCommon"
            }
            setClicked={setClicked2}
            
          />
        </div>
        <br />
        <div className={styles.connect}>
          <ButtonComponent
            type={"button"}
            status={isClicked1 && isClicked2}
            variant={"contained"}
            size={"small"}
            disable={tableSchema?.status}
            label={"Connect"}
            clickFunction={handleSubmit}
          />
        </div>
      </div>
      <Loader loader={loader} color={"#7a7a7b"} size={150} />
    </>
  );
}
