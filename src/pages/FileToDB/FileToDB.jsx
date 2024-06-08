import Header from "../../components/Header/header";
import { Form } from "../../components/Form/Form.jsx";
import { StepperComponent } from "../../common/StepperComponent/StepperComponent";
import FeildMapping from "../../components/FeildMapping/FeildMapping.jsx";
import MisMatches from "../../components/MisMatches/misMatches.jsx";
import { useContext } from "react";
import { field } from "../../ContextProvider.jsx";
import { UploadFile } from "../../components/UploadFile/UploadFile.jsx";
import { InitialStatus } from "../../components/InitialStatus/InitialStatus.jsx";

export const FileToDB = () => {
  const {
    currentStep,
    setInitialCompareFiletoDB,
    initialCompareFiletoDB,
    setStep,
    setfileDB,
    setUploadFile
  } = useContext(field);
  let stepsLabel = [
    "Source",
    "Target",
    "Check List",
    "Field Mapping",
    "Mismatches",
  ];
  const resetValues=()=>{
    setStep(1);
    setUploadFile({})
    setfileDB({})
    setInitialCompareFiletoDB({})
  }
  const showStep = (currentStep) => {
    switch (currentStep) {
      case 1:
        return <UploadFile />;
      case 2:
        return <Form />;
      case 3:
        return (
          <InitialStatus
            setInitialCompare={setInitialCompareFiletoDB}
            InitialCompare={initialCompareFiletoDB}
            step={setStep}
            page={4}
          />
        );
      case 4:
        return (
          <FeildMapping
            sourceColumnNames={initialCompareFiletoDB?.sourceHeaders}
            targetColumnNames={initialCompareFiletoDB?.targetHeaders}
            toolType={"file to db"}
            page={5}
          />
        );
      case 5:
        return (
          <MisMatches
            columnNames={initialCompareFiletoDB?.sourceHeaders}
            page={4}
            type={"file"}
            resetValues={resetValues}
          />
        );
      default:
        return null; // Return null or handle other cases as needed
    }
  };
  return (
    <>
      <Header title={"File to DB Testing"} route={""} />
      <div className="stepcontainer">
        <StepperComponent steps={stepsLabel} activeStep={currentStep - 1} />
        {showStep(currentStep)}
      </div>
    </>
  );
};
