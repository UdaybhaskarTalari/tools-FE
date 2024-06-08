import { useContext } from "react";
import { StepperComponent } from "../../common/StepperComponent/StepperComponent";
import TableDataComparision from "../../components/TableDataComparision/TableDataComparision";
import TableSchemaComparision from "../../components/TableSchemaComparision/TableSchemaComparision";
import Header from "../../components/Header/header";
import DbConnection from "../../components/DbConnection/DbConnection";
import { ComparisonOptions } from "../../components/ComparisonOptions/ComparisonOptions";
import { field } from "../../ContextProvider";
import MisMatches from "../../components/MisMatches/misMatches";
function DataBase() {
  const { currentStep, setStep, misMatches,setTableSchema,setDbQuery,setDBDetails } = useContext(field);

  let steps = ["Connect Databases", "Select Comparison Method", "Comparison"];

  if (currentStep === 4 || currentStep == 5) {
    steps.push("Mismatches");
  }
const resetValues=()=>{
  setStep(1);
  setTableSchema({})
  setDbQuery({
  source: "select * from ;",
  target: "select * from ;",
  })
  setDBDetails({})
}
  const showStep = (step) => {
    switch (step) {
      case 1:
        return <DbConnection setCurrentStep={setStep} />;
      case 2:
        return <ComparisonOptions setCurrentStep={setStep} />;
      case 3:
        return <TableDataComparision setCurrentStep={setStep} />;
      case 4:
        return <TableSchemaComparision setCurrentStep={setStep} />;
      case 5:
        return (
          <MisMatches
            columnNames={Object.keys(misMatches.records)}
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
      <Header title={"Database to Database comparison"} route={""} />

      {currentStep == 4 ? (
        <StepperComponent steps={steps} activeStep={currentStep - 2} />
      ) : (
        <StepperComponent steps={steps} activeStep={currentStep - 1} />
      )}

      {showStep(currentStep)}
    </>
  );
}
export default DataBase;
