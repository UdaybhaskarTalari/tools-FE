/* eslint-disable react/prop-types */
import { field } from "../../ContextProvider";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Box } from "@mui/material";
import styles from "./MisMatches.module.scss";
import { count, mismatches } from "../../constants/constants";
import { dataGridStyle } from "../../styles/styles";
import { DownLoad } from "../../common/DownLoad/DownLoad";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid } from "../../common/Grid/Grid";
/**
 *
 * @param {Array} columnNames - a prop that stores the targetHeaders
 * @param {number} page - a prop that stores the previous stepper number
 * @returns
 */
export default function MisMatches({ columnNames, page, type,resetValues }) {
  const { misMatches, setStep } = useContext(field);
  const [column, setColumns] = useState([]);
  //Re-renders the component when the target column names are updated
  useEffect(() => {
    if (misMatches?.records?.length > 0) setColumns(allColumns());
  }, [columnNames]);

  /**
   *
   * @returns {object}
   * returns an object with a strucuture suitable to handle the columns in the datagrid
   */
  const allColumns = () => {
    return Object.keys(misMatches.records[0]).map((each) => ({
      field: each,
      width: 200,
    }));
  };

  return (
    <div className={styles.contianer}>
      <ToastContainer/>
      <div className={styles.mismatch_back}>
        <ButtonComponent type={"button"} status={true} variant={"contained"} size={"small"} disable={false} label={"Back"} clickFunction={() => {   setStep(page); }}
        />
        <ButtonComponent type={"button"} status={true} variant={"contained"} size={"small"} disable={false} label={"Finish"} clickFunction={() => {   
                                                                                                                                                            resetValues()
                                                                                                                                                          }}
                                                                                                                                                        />
      </div>
      {misMatches?.records?.length > 0 && (
        <>
          <div className={styles.mismatch}>
            <div className={styles.mismatch_details}>
              <div className={styles.mismatch_heading}>{mismatches}</div>
              <div className={styles.misMatch_heading}>
                <span>{count}</span>
                <span>&nbsp;{misMatches.misMatchesCount}</span>
              </div>
            </div>

            <DownLoad
              status={misMatches.records.length > 0}
              mismatches={misMatches.misMatchFile}
              type={type}
            />
          </div>
          <Box sx={dataGridStyle}>
            <Grid rows={misMatches.records} column={column} id={"Serial No"} size={[5,10]}/>

          </Box>
        </>
      )}
      {misMatches.status && 
        <p className="success">{misMatches.message}</p>
      }
    </div>
  );
}
