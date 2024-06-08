/* eslint-disable react/prop-types */
import styles from "./header.module.scss";
import { logOut } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { field } from "../../ContextProvider";

import { useContext  } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { dashboard, home } from "../../constants/constants";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
export default function Header({ title, route }) {
  const Navigate = useNavigate();
  const { removeCookie } = useContext(field);
  
  return (
    <>
      <div className={styles.header}>
        <div
          className={`${styles.header_text} ${styles.header_home}`}
          onClick={() => Navigate(`/${route}`)}
        >
            <HomeOutlinedIcon className={styles.home_icon} />
            <div>{home}</div>
          
        </div>
        <span className={styles.header_text}>{title}</span>
        <ButtonComponent type={"button"} status={true} variant={"contained"} size={"small"} disable={false} label={dashboard.auth[1]} clickFunction={()=>logOut(removeCookie,Navigate)}/>

      </div>
      
    </>
  );
}
