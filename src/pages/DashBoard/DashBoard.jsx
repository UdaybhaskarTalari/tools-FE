/* eslint-disable no-undef */

import { styledModal } from "../../styles/styles";
import styles from "./DashBoard.module.scss";
import { useNavigate } from "react-router-dom";
import { logOut,logIn } from "../../services/auth";
import { dashboard } from "../../constants/constants";
import { useContext, useEffect, useState } from "react";
import { field } from "../../ContextProvider";
import { Box, Modal } from "@mui/material";
import {Reset} from '../../services/navigate';
import { ButtonComponent } from "../../common/Button/ButtonComponent";
export const DashBoard = () => {
  const Navigate = useNavigate();
  const [open,setOpen]=useState(false)
  const { token, removeCookie } = useContext(field);
  const { setStep, setfileDB, setCSVFields, setMisMatches,setEnable,setDBDetails,setUploadFile,setInitialCompareCSVtoCSV ,setTableSchema,setDbQuery} = useContext(field);

  useEffect(()=>{
    Reset(setMisMatches,setfileDB,setCSVFields,setStep,setEnable,setDBDetails,setUploadFile,setInitialCompareCSVtoCSV,setTableSchema,setDbQuery)
  },[])
  const openTool = (index) => {
    if (token == undefined) setOpen(!open)
    else Navigate(dashboard.routes[index]);
  };

  return (
    <div className={styles.home}>
      <div className={styles.home_header}>
          <ButtonComponent type={"button"}
          status={token == undefined || token == "" }
          variant={"contained"}
          size={"small"}
          disable={false}
          label={dashboard.auth[0]} clickFunction={logIn}/>
          <ButtonComponent clickFunction={() => logOut(removeCookie,Navigate)} status={!(token == undefined || token == "") }
          variant={"contained"}
          size={"small"}
          disable={false}
          label={dashboard.auth[1]}/>
         
      </div>
      <div className={styles.home_dashboard}>
        <h1 className={styles.home_dashboard_heading}>{dashboard.heading}</h1>
        <div className={styles.home_dashboard_card}>
          {dashboard.tools.map((each, index) => (
            <div
              className={styles.home_dashboard_card_content}
              onClick={() => openTool(index)}
              key={index}
            >
              <button>{each}</button>
              <span className={styles.text}>{dashboard.start}</span>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(!open)}>
          <Box sx={styledModal}>
            <p>Login to use the Utility</p>
          </Box>
      </Modal>
    </div>
  );
};
