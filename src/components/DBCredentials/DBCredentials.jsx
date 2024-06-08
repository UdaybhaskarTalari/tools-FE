/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { field } from "../../ContextProvider";
import { useContext, useEffect, useState } from "react";
import {
  deleteSession,
  getdata,
  getpastdata,
} from "../../services/DatabaseSessions";
import { RxCross2 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import styles from "./DBCredentials.module.scss";
const filter = createFilterOptions();
export default function GetAllSessions({
  id,
  setDBDetails,
  DBdetails,
  dbType,
  common,
  setFile,
}) {
  const { dbcred, setDBcred, token } = useContext(field);
  const [value, setValue] = useState(null);
  useEffect(() => {
    getpastdata(id, setDBcred, DBdetails, dbType, token);
  }, [dbType]);
  return (
    <Autocomplete
      fullWidth
      variant="solid"
      value={value}
      size={"small"}
      onChange={(event, newValue) => {
        setValue(newValue);
        getdata(id, setDBDetails, DBdetails, token, newValue, common);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== "") {
          filtered.push(`Add "${params.inputValue}"`);
          setFile(params.inputValue);
        }
        return filtered;
      }}
      selectOnFocus
      id="user-options"
      options={dbcred}
      getOptionLabel={(option) => {
        return option;
      }}
      renderOption={(props, option) => (
        <ul className={styles.option}>
          <li {...props} >
            {option}
          </li>
          <li onClick={() => deleteSession(setDBcred, option, token,dbType)} className="icon">
              <RxCross2 />
          </li>
        </ul>
      )}
      renderInput={(params) => <TextField {...params} label="Load / Save" />}
    />
  );
}
