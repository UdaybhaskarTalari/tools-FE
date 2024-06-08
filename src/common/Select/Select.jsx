/* eslint-disable react/prop-types */
import styles from './Select.module.scss';
import { defaultSelect } from '../../constants/constants';
export const Select=({options,defaultValue,handleChange,type,name})=>{
    return(
   
      <select
        className={styles.inputselect}
        onChange={(e)=>handleChange(e,type)}
        value={defaultValue}
        name={name}
      >
        <option className={styles.inputtext} value="">
          {defaultSelect}
        </option>
        {options &&
          options.map((item, index) => (
            <option className={styles.inputText} key={index} value={item}>
              {item}
            </option>
          ))}
      </select>
    )
}