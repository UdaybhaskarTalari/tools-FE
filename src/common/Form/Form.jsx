/* eslint-disable react/prop-types */
import styles from "./Form.module.scss";
import { formLabel } from "../../constants/constants"; 
export const DBForm=({handleChange,connection})=>{
    return(
        <>
        <div className={styles.input_div}>
              <label>{formLabel.host}</label>
              <input
                label="host"
                className={styles.select}
                value={connection?.host}
                name="host"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.input_div}>
              <label>{formLabel.databaseName}</label>
              <input
                label="databaseName"
                value={connection?.databaseName}
                className={styles.select}
                required
                name="databaseName"
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_div}>
              <label>{formLabel.port}</label>
              <input
                label="port"
                value={connection?.port}
                className={styles.select}
                name="port"
                required
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_div}>
              <label>{formLabel.UserName}</label>
              <input
                label="UserName"
                value={connection?.userName}
                className={styles.select}
                name="userName"
                required
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_div}>
              <label>{formLabel.Password}</label>
              <input
                label="Password"
                type="password"
                value={connection?.password}
                className={styles.select}
                name="password"
                required
                onChange={handleChange}
              />
            </div>
            
            </>
    )
}