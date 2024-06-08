/* eslint-disable react/prop-types */
import { Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import styles from "./ComparisonOptions.module.scss";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { choose } from "../../constants/constants";
export const ComparisonOptions = ({ setCurrentStep }) => {
  const handleOptionChange = (event) => {
    setCurrentStep(parseInt(event.target.value));
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.comparison_button}>
          <ButtonComponent
            type={"button"}
            status={true}
            variant={"contained"}
            size={"small"}
            disable={false}
            label={"Back"}
            clickFunction={() => {
              setCurrentStep(1);
            }}
          />
        </div>
        <Typography variant="h6" gutterBottom>
          {choose}
        </Typography>
        <RadioGroup
          aria-label="comparison-method"
          name="comparison-method"
          onChange={handleOptionChange}
        >
          <FormControlLabel
            value="3"
            control={<Radio />}
            label="Table Comparison"
          />
          <FormControlLabel value="4" control={<Radio />} label="Query Tool" />
        </RadioGroup>

      </div>
    </>
  );
};
