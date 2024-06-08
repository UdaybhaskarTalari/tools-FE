/* eslint-disable react/prop-types */
import styles from "./Table.module.scss";
import { tableNames } from "../../constants/constants";
export const Table = ({
  type,
  schemaDetails,
  highlightedRows,
}) => {
  return (
      <>
      {schemaDetails && (
          <table className={styles.table}>
            <tbody>
              <tr style={{ color: "black", fontWeight: "bold" }}>
                <td>{tableNames[0]}</td>
                <td>{tableNames[1]}</td>
              </tr>
              {Object.entries(schemaDetails).map(([key, value]) => (
                <tr
                  key={key}
                  className={
                    type == "source"
                      ? ""
                      : highlightedRows.find((row) => {
                         
                          return (
                            row.columnName === key &&
                            row.dataType["type"] == value["type"]
                          );
                        })
                      ? ""
                      : styles.redRow
                  }
                >
                  <td>{key}</td>
                  <td>
                    {value["type"]}
                    {value["primaryKey"] && <span>, PK</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       
      )}
      </>
  );
};
