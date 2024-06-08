import { CSVInputs } from "../../components/CSVInputs/CSVInputs";
import FeildMapping from "../../components/FeildMapping/FeildMapping";
import Header from "../../components/Header/header";
import {StepperComponent} from "../../common/StepperComponent/StepperComponent";
import MisMatches from "../../components/MisMatches/misMatches";
import { useContext } from "react";
import { field } from "../../ContextProvider";

import { InitialStatus } from "../../components/InitialStatus/InitialStatus";
export const CSVtoCSV=()=>{

    const resetValues=()=>{
        setStep(1);
        setUploadFile({})
        setCSVFields({})
        setInitialCompareCSVtoCSV({})
      }
    const {currentStep,setInitialCompareCSVtoCSV, initialCompareCSVtoCSV,setStep,setCSVFields,setUploadFile}=useContext(field)
    let stepsLabel = [
        "Upload CSV files",
        "CSV Consistency Check",
        "Comparison",
        "Mismatches",
      ];
    const showStep = (currentStep)=>{
        switch(currentStep){
            case 1: 
                return <CSVInputs/>
            case 2:
                return <InitialStatus setInitialCompare={setInitialCompareCSVtoCSV}  InitialCompare={initialCompareCSVtoCSV} step={setStep} page={3}/>
            case 3:
                return <FeildMapping sourceColumnNames={initialCompareCSVtoCSV?.sourceHeaders} targetColumnNames={initialCompareCSVtoCSV?.targetHeaders} toolType={"csv to csv"} page={4}/>
            case 4:
                return <MisMatches columnNames={initialCompareCSVtoCSV?.targetHeaders} page={3} type={"file"} resetValues={resetValues}/>
            default:
                    return null; // Return null or handle other cases as needed
        } 
    } 
    return(
        <>
            <Header title={"CSV to CSV comparison"} route={""}/>
            <div className="stepcontainer">
            <StepperComponent steps={stepsLabel} activeStep={currentStep - 1} />
            {showStep(currentStep)}

            </div>
        </>
    );
}