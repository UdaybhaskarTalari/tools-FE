/* eslint-disable react/prop-types */
import { Stepper, Step, StepLabel } from "@mui/material";

export const StepperComponent = ({ steps, activeStep }) => {
  return (
    <div className="stepcontainer">
      <Stepper
        activeStep={activeStep}
        orientation="horizontal"
        className="stepper"
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
