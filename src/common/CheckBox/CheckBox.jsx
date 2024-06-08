/* eslint-disable react/prop-types */
import styles from './CheckBox.module.scss'
export const Checkbox=({isEnable,setEnable,label})=>{
    return(
        <div className={styles.div}>
            <input
              type="checkbox"
              id="dataMap"
              defaultChecked={isEnable}
              onChange={() => setEnable((prev) => !prev)}
            />
            <label className={styles.form_content}>{label}</label>
          </div>
    )
}