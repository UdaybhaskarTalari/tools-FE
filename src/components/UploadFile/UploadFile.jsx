import styles from "./UploadFile.module.scss";
import { upload } from "../../services/FileToDBCompare.js";
import { useContext, useState, useEffect } from "react";
import { field } from "../../ContextProvider.jsx";
import { uploadCSV } from "../../constants/constants.jsx";
import Loader from "../../common/Loader/Loader.jsx";
import { Upload } from "../../common/Upload/Upload.jsx";
import { ButtonComponent } from "../../common/Button/ButtonComponent.jsx";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../services/Toast.js";
import { ToastContainer } from "react-toastify";
/**
 *
 * @description uploads a csv file for the file to db comparison
 */
export const UploadFile = () => {
  const [loader, setLoader] = useState(false);
  const { fileToDB, setfileDB, setStep, token, uploadFile} = useContext(field);

  useEffect(() => {
    setLoader(false);

  }, [fileToDB]);

  /**
   *
   * @param {object} data stores the file to be uploaded
   * @description
   * 1. function called on submitting the csv file
   * 2. calls a function to make a request to upload the file
   */

  const setFormData = async(e) => {
    e.preventDefault();
    setLoader(true);
    await upload(fileToDB, setfileDB, token, uploadFile.source);
  };
 

  /**
   *
   * @description function to store the file name to display it.
   */

  return (
    <>
  <ToastContainer/>
      <div className={styles.uploads_container}>
        <div className={styles.button}>
          <ButtonComponent type={"button"} status={fileToDB.uploadStatus} variant={"contained"} size={"small"} disable={false} label={"Next"} clickFunction={() => setStep(2)}/>
        </div>
        <form onSubmit={setFormData} className={styles.form}>
          <Loader loader={loader} color={"#7a7a7b"} size={150} />
          <Upload type={"source"} setFileState={setfileDB} label={uploadCSV.click+" Source"} caption={uploadCSV.supportedType +" CSV & XLSX"}/>
          <p className={styles.content}>{uploadFile.sourceName}</p>
          <div> 
          <ButtonComponent   type={"submit"}   status={true}   variant={"contained"}   size={"small"}   disable={fileToDB.uploadStatus}   label={uploadCSV.upload}   clickFunction={setFormData} />
          </div>
        </form>
      </div>
     
    </>
  );
};
