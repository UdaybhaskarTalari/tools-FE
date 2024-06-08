import styles from "./CSVInputs.module.scss";
import { useContext, useEffect, useState } from "react";
import { field } from "../../ContextProvider";
import { csvUploadFile, csvInitialCompare } from "../../services/csvCompare";
import Loader from "../../common/Loader/Loader";
import { Upload } from "../../common/Upload/Upload";
import { uploadCSV } from "../../constants/constants";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const CSVInputs = () => {
  const [loader, setLoader] = useState(false);
  const {
    setCSVFields,
    csvFields,
    setStep,
    token,
    initialCompareCSVtoCSV,
    setInitialCompareCSVtoCSV,
    setDroppedValues,
    setIndex,
    uploadFile,
  } = useContext(field);

  useEffect(() => {
    if (csvFields?.uploadStatus){
       csvInitialCompare(
        csvFields,
        setInitialCompareCSVtoCSV,
        token,
        setDroppedValues,
        setIndex
      );
    }
  }, [csvFields]);

  /**
   *
   * @param {object} data - gets the form data on submitting the form
   * @description uploads the csv files and calls the csvUploadFile function
   * to send a request to upload the files
   */
  const setFormData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadFile?.source);
    formData.append("file", uploadFile?.target);
    setCSVFields({
      ...csvFields,
      inputs: [uploadFile?.sources, uploadFile?.target],
    });
   
    setLoader(true);
  
      await csvUploadFile(formData, setCSVFields, token);
      if(csvFields?.status)  
      setInitialCompareCSVtoCSV({ ...initialCompareCSVtoCSV, status: false });
      setLoader(false);
  };
  const handleNextButtonClick = () => {
    setStep(2);
  };

  return (
    <>
     <ToastContainer />
     
        <div className={styles.controls}>
          <ButtonComponent
            type={"button"}
            status={initialCompareCSVtoCSV?.status }
            variant={"contained"}
            size={"small"}
            disable={false}
            label={"Next"}
            clickFunction={handleNextButtonClick}
          />
          
        </div>
        <form onSubmit={setFormData} className={styles.form}>
            <div>
              <Upload type={"sources"} setFileState={setCSVFields} label={uploadCSV.click+" Source"} caption={uploadCSV.supportedType+" CSV "} />
              <p>{uploadFile?.sourcesName}</p>
            </div>
            <div>
              <Upload type={"target"} setFileState={setCSVFields} label={uploadCSV.click+" Target"} caption={uploadCSV.supportedType+" CSV "}/>
              <p>{uploadFile?.targetName}</p>
            </div>
        </form>
        <ButtonComponent
          type={"submit"}
          status={true}
          variant={"contained"}
          size={"small"}
          disable={csvFields?.uploadStatus}
          label={"Upload"}
          clickFunction={setFormData}
        />
      <Loader loader={loader} color={"#7a7a7b"} size={150} />
    </>
  );
};
