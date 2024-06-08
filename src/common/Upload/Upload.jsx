/* eslint-disable react/prop-types */
import fileImage from "../../assets/upload.svg";
import { useContext } from "react";
import styles from "./Upload.module.scss";
import { field } from "../../ContextProvider.jsx";
import { notify } from "../../services/Toast.js";
export const Upload = ({ type, setFileState ,label,caption}) => {
  const { setUploadFile } = useContext(field);

  const showfile = (e) => {
    e.preventDefault();
    try{
    if (type == "source") {
      setUploadFile((prev) => ({
        ...prev,
        source: e.target.files[0],
        sourceName: e.target.files[0]?.name,
      }));
    } else if (type == "sources") {
      setUploadFile((prev) => ({
        ...prev,
        source: e.target.files[0],
        sourcesName: e.target.files[0]?.name,
      }));
    } else {
      setUploadFile((prev) => ({
        ...prev,
        target: e.target.files[0],
        targetName: e.target.files[0]?.name,
      }));
    }
    setFileState((prev) => ({ ...prev, uploadStatus: false, fileMessage: "" }));
  }catch(e){
    console.log(e)
    notify(e.message,"error")
  }
  };
  return (
    <>
      <label htmlFor={type} className={styles.form_label}>
        <div>
          <img src={fileImage} alt="upload"/>
        </div>
        <p className={styles.form_label_description}>
          <span>
            {label}
          </span>
          <span className={styles.form_label_caption}>
            {caption}
          </span>
        </p>
      </label>
      <input
        id={type}
        type="file"
        className={styles.form_input}
        required
        onInput={showfile}
      />
    </>
  );
};
