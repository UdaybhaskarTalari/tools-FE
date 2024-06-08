/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import styles from "./TableSchemaComparision.module.scss";
import { request } from "../../services/Axios/Httpcalls";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { field } from "../../ContextProvider";

import { useNavigate } from "react-router-dom";
import { IoMdSwap } from "react-icons/io";
import {
  swapText,
  tableQueryComparison,
  files,
} from "../../constants/constants";
import MisMatches from "../MisMatches/misMatches";
import Loader from "../../common/Loader/Loader";
import { Checkbox } from "../../common/CheckBox/CheckBox";
import { TextArea } from "../../common/TextArea/TeatArea";
import { ToastContainer } from "react-toastify";
import { notify } from "../../services/Toast";
export default function TableSchemaComparision({ setCurrentStep }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    DBdetails,
    token,
    misMatches,
    setMisMatches,
    dbQuery,
    setDbQuery,
    setEnable,
    isEnable
  } = useContext(field);

  const [isSwap, setSwap] = useState(false);
  useEffect(() => {
    if (isSwap) {
      setDbQuery((prev) => ({ source: prev.target, target: prev.source }));
    }
  }, [misMatches, isSwap]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      sourceDBQuery: dbQuery.source,
      targetDBQuery: dbQuery.target,
      sourceDBType: DBdetails.sourceDbType,
      targetDBType: DBdetails.targetDbType,
      caseSensitive: !isEnable,
      swap: isSwap,
      data:{
        source:{...DBdetails.sourceCommon},
        target:{...DBdetails.targetCommon}
      }
    };
    setLoader(true);
    try {
      const res = await request("POST", "compareData", formData, token);
      setMisMatches({
        message: res.message,
        misMatchesCount: res.numberOfRecords,
        records: res.data,
        status: res.status,
        misMatchFile: res.fileName,
      });
      setLoader(false);
      notify(res.message,res.status)
      
      if (res.status) setCurrentStep(5);
    } catch (error) {
      setLoader(false);
      notify(error.message,"Error")
    }
  };
  const handleBack=()=>{
    setCurrentStep(2);
      
  }
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.compare}>
        <ButtonComponent
          type={"button"}
          status={true}
          variant={"contained"}
          size={"small"}
          disable={false}
          label={"Back"}
          clickFunction={() => handleBack()}
        />
      </div>
      <Loader loader={loader} color={"#7a7a7b"} size={150} />
      
      <h1 className={styles.container_heading}>{tableQueryComparison.heading}</h1>
      <p className={styles.container_description}>{tableQueryComparison.subheading}</p>
      <form>
        <div className={styles.container_textarea}>
          <div className={styles.container_textarea_block}>
          <div className={styles.container_subheading}>
              <span>{files[0]}</span>
              <span className={styles.container_caption}>({DBdetails.sourceDbType})</span>
          </div>
            <TextArea
              type={"source"}
              dbQuery={dbQuery}
              setDbQuery={setDbQuery}
              row={"10"}
              col={"50"}
              placehoder={"Enter table details"}
            />
          </div>
          <div className={styles.swap}>
            <IoMdSwap onClick={() => setSwap(!isSwap)} className="icon" />
            {isSwap && <small>{swapText}</small>}
          </div>
          <div className={styles.container_textarea_block}>
          <div className={styles.container_subheading}>
              <span>{files[2]}</span>
              <span className={styles.container_caption}>({DBdetails.targetDbType})</span>
          </div>
            <TextArea
              type={"target"}
              dbQuery={dbQuery}
              setDbQuery={setDbQuery}
              row={"10"}
              col={"50"}
              placehoder={"Enter table details"}
            />
          </div>
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            isEnable={isEnable}
            setEnable={setEnable}
            label={tableQueryComparison.enable}
          />
        </div>
      </form>
      <div className={styles.submit_button}>
        <ButtonComponent
          type={"submit"}
          status={true}
          variant={"contained"}
          size={"small"}
          disable={false}
          label={"Submit"}
          clickFunction={handleSubmit}
        />
      </div>

      
    </div>
  );
}
