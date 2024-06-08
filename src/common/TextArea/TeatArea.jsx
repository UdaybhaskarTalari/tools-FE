/* eslint-disable react/prop-types */
import styles from "./TextArea.module.scss"

export const TextArea=({type,dbQuery,setDbQuery,row,col,placehoder,required})=>{
    return(
        
            <textarea
              required={required}
              className={styles.textarea}
              placeholder={placehoder}
              rows={row}
              cols={col}
              value={dbQuery[type]}
              onChange={(e) =>
                setDbQuery({ ...dbQuery, [type]: e.target.value })
              }
            ></textarea>
    )
}