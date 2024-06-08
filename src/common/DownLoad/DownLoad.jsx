/* eslint-disable react/prop-types */
import styles from './Download.module.scss'
import GetAppIcon from "@mui/icons-material/GetApp";
import { DownloadMismatches } from "../../services/downloadMismatches";
import { useContext } from "react";
import { field } from "../../ContextProvider";
export const DownLoad = ({status,mismatches,type}) => {
    const {token}=useContext(field)
  return (
    <>
    {status &&(
    <div className={styles.mismatch_download}>
        <div className="download">
          <GetAppIcon onClick={() => DownloadMismatches({data:mismatches,type:type}, token)} />
        </div>
    </div>
      )}

    </>
  );
};
