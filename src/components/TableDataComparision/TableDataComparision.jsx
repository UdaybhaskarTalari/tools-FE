/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import { useContext, useState, useEffect } from "react";
import styles from "./TableDataComparision.module.scss";
import { field } from "../../ContextProvider";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { IoMdSwap } from "react-icons/io";
import { swap } from "../../services/Swap";
import { tableSchemaComparison, swapText,target,source } from "../../constants/constants";
import { DownLoad } from "../../common/DownLoad/DownLoad";
import { Table } from "../../common/Table/Table";
import { Select } from "../../common/Select/Select";
export default function TableDataComparision({ setCurrentStep }) {
  const { tableSchema, setTableSchema, DBdetails } = useContext(field);
  const [show, isshow] = useState(false);
  const [selectedTable, setSelectedTable] = useState({
    source: "",
    target: "",
    targetDbType: DBdetails.targetDbType,
    sourceDbType: DBdetails.sourceDbType,
  }); //to set the selectedTable of source and target DB
  const [schemaDetails, setSchemaDetails] = useState({
    source: null,
    target: null,
  }); //to set the schema details of selectedTable of source and target
  const [highlightedRows1, setHighlightedRows1] = useState([]); //to set the table1 schema differences with table2
  const [highlightedRows2, setHighlightedRows2] = useState([]); //to set the table2 schema differences with table1

 

  /**
   *
   * @param {Array} highlighted  defines which highlighted array to be used
   * @param {*} columnName stores the columnname
   * @param {*} dataType stores the corresponding datatype of the columnname
   * @description stores the highlighted rows
   */
  const storeHighlightedRows = (highlighted, columnName, dataType) => {
    highlighted.push({ columnName, dataType });
  };
  const handleChange=(e,type)=>{
    setSelectedTable({ ...selectedTable, [type]: e.target.value })
  }
  useEffect(() => {
    if (selectedTable.target && tableSchema.targetSchema != null) {
      setSchemaDetails({
        ...schemaDetails,
        target: tableSchema.targetSchema[selectedTable.target],
        source: tableSchema.sourceSchema[selectedTable.source],
      });
    }
    if (selectedTable.source && tableSchema.sourceSchema != null) {
      setSchemaDetails({
        ...schemaDetails,
        target: tableSchema.targetSchema[selectedTable.target],
        source: tableSchema.sourceSchema[selectedTable.source],
      });
    }
  }, [selectedTable]);
  //to set the highlighted rows, whenever a change occurs in selected tablename in source and target
  useEffect(() => {
    if (schemaDetails.source && schemaDetails.target) {
      const highlighted1 = [];
      const highlighted2 = [];
      // Compare source and target schemaDetails
      Object.entries(schemaDetails.source).forEach(([columnName, dataType]) => {
        if (schemaDetails.target[columnName] !== dataType) {
          storeHighlightedRows(highlighted1, columnName, dataType);
         
        }
      });
      // Filter out rows that are only in the target database
      Object.entries(schemaDetails.target).forEach(([columnName, dataType]) => {
        if (!schemaDetails.source.hasOwnProperty(columnName)) {
          storeHighlightedRows(highlighted2, columnName, dataType);
        }
      });
      setHighlightedRows1(highlighted1);
      setHighlightedRows2(highlighted2);
    }
  }, [schemaDetails]);
  return (
    <div className={styles.container}>
      <ButtonComponent type={"button"} status={true} variant={"contained"} size={"small"} disable={false} label={"Back"} clickFunction={() => setCurrentStep(2)}/>
      <div className={styles.container_header}>
        <h1 className={styles.container_header_text}>
          {tableSchemaComparison.heading}
        </h1>
        <DownLoad  status={highlightedRows2?.length > 0} mismatches={highlightedRows2} type={"json"}/>
      </div>
      <p className={styles.container_subheading}>
        {tableSchemaComparison.description}
      </p>
      <div className={styles.container_details}>


        <div className={styles.subcontainer}>
          <div className={styles.subcontainer_subheading}>
            <span>{source}</span>
            <span className={styles.subcontainer_caption}>({selectedTable.sourceDbType})</span>
          </div>
            <Select options={Object.keys(tableSchema.sourceSchema)} defaultValue={selectedTable["source"]} handleChange={handleChange}type={"source"}/>
            <Table type={"source"} schemaDetails={schemaDetails.source} highlightedRows={highlightedRows1}/>
        </div>


          <div className={styles.swap}>
            <IoMdSwap
              onClick={() =>
                swap(
                  tableSchema,
                  setTableSchema,
                  setSelectedTable,
                  selectedTable,
                  show,
                  isshow
                )
              }
              className="icon"
            />
            {show && <small>{swapText}</small>}
          </div>


          <div className={styles.subcontainer}>
          <div className={styles.subcontainer_subheading}>
            <span>{target}</span>
            <span className={styles.subcontainer_caption}>({selectedTable.sourceDbType})</span>
          </div>
            <Select options={Object.keys(tableSchema.targetSchema)} defaultValue={selectedTable["target"]} handleChange={handleChange} type={"target"}/>
          <Table  type={"target"} schemaDetails={schemaDetails.target}  highlightedRows={highlightedRows1}/>
          </div>

      </div>
    </div>
  );
}
