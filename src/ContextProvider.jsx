/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const field = createContext(null);
export const ContextProvider=({children})=>{

const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const [DBdetails, setDBDetails] = useState({});
  const [dbQuery, setDbQuery] = useState({
    source: "select * from ;",
    target: "select * from ;",
  });
  const [uploadFile, setUploadFile] = useState({});
  const [droppedValues, setDroppedValues] = useState(null);
  const [index, setIndex] = useState({});
  const [currentStep, setStep] = useState(1);
  const [dbcred, setDBcred] = useState([]);
  const [misMatches, setMisMatches] = useState({});
  const [fileToDB, setfileDB] = useState({});
  const [isEnable, setEnable] = useState(false);
  const [initialCompareFiletoDB, setInitialCompareFiletoDB] = useState({
    status: false,
    sourceHeaders: [],
    targetHeaders: [],
    message: "",
  });
  const [csvFields, setCSVFields] = useState({
    sourceFile: "",
    targetFile: "",
    uploadMessage: "",
    uploadStatus: false,
  });

  const [initialCompareCSVtoCSV, setInitialCompareCSVtoCSV] = useState({});
  const [tableSchema, setTableSchema] = useState({});

    return(
        <field.Provider value={{dbQuery,
            setDbQuery,
            DBdetails,
            setDBDetails,
            isEnable,
            setEnable,
            index,
            setIndex,
            droppedValues,
            setDroppedValues,
            uploadFile,
            setUploadFile,
            initialCompareCSVtoCSV,
            setInitialCompareCSVtoCSV,
            setInitialCompareFiletoDB,
            initialCompareFiletoDB,
            dbcred,
            setDBcred,
            token,
            removeCookie,
            setCookie,
            misMatches,
            setMisMatches,
            csvFields,
            setCSVFields,
            tableSchema,
            setTableSchema,
            currentStep,
            setStep,
            fileToDB,
            setfileDB,}}>

            {children}
        </field.Provider>
    )
}