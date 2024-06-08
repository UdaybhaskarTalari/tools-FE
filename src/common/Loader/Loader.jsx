/* eslint-disable react/prop-types */
import styles from "./Loader.module.scss";
import { FadeLoader } from "react-spinners";
const Loader = ({ loader, color,size}) => {
  
  return (
    <>
      <div className={loader ? styles.overlay : { display: "block" }}>
        <FadeLoader
          color={color}
          loading={loader}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
          className={styles.center}
        />
      </div>
    </>
  );
};

export default Loader;
