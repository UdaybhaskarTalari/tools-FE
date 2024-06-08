/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useContext, useEffect } from "react";
import styles from "./FeildMapping.module.scss";
import { field } from "../../ContextProvider";
import { finalCompare } from "../../services/finalCompare";
import { dropOptions ,emptyHeaders} from "../../services/FieldMapping";
import { compare, files, enable } from "../../constants/constants";
import { Checkbox } from "../../common/CheckBox/CheckBox";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import Loader from "../../common/Loader/Loader";
export default function FeildMapping({
  sourceColumnNames,
  targetColumnNames,
  toolType,
  page,
}) {
  const {
    setMisMatches,
    misMatches,
    csvFields,
    fileToDB,
    setStep,
    token,
    index,
    setIndex,
    droppedValues,
    setDroppedValues,
    isEnable,
    setEnable,
  } = useContext(field);

  const [field1, setfield1] = useState();
  const minLength = Math.min(
    sourceColumnNames.length,
    targetColumnNames.length
  );
  useEffect(() => {
    if (droppedValues == null || droppedValues.length == 0) {
      emptyHeaders(targetColumnNames.length,setDroppedValues,setIndex)
    }

  }, [droppedValues,index,isEnable]);
  const [loader,setLoader]=useState(false)
  return (
    <>
    <Loader loader={loader}/>
      <div className={styles.controls}>
        <ButtonComponent
          type={"button"}
          status={true}
          variant={"contained"}
          size={"small"}
          disable={false}
          label={"Back"}
          clickFunction={() => {
                                setStep(page-2);
                                emptyHeaders(targetColumnNames.length,setDroppedValues,setIndex);
                                setEnable(false)

                              }}
        />
        
        <ButtonComponent
          type={"button"}
          status={true}
          variant={"contained"}
          size={"small"}
          disable={false}
          label={compare}
          clickFunction={() =>
            finalCompare(
              index,
              sourceColumnNames,
              targetColumnNames,
              toolType,
              fileToDB,
              setMisMatches,
              misMatches,
              csvFields,
              minLength,
              setStep,
              isEnable,
              token,
              page,setLoader

            )
          }
        />
      </div>
      <div className={styles.main}>
        <div>
          <Checkbox isEnable={isEnable} setEnable={setEnable} label={enable} />
        </div>
        {isEnable &&
          <div className={styles.container}>
            <div className={styles.headers}>
              {files.map((each) => (
                <div className={styles.headers_label}>
                  <p>{each}</p>
                </div>
              ))}
            </div>
            <div className={styles.options}>
              <div className={styles.options_source}>
                {sourceColumnNames.map((each, index) => (
                  <div
                    className={styles.options_text}
                    draggable
                    onDrag={() => setfield1(index)}
                  >
                    <p>{each}</p>
                  </div>
                ))}
              </div>
              <div className={styles.options_drop}>
                {droppedValues.map((each, ind) => (
                  <div
                    className={styles.options_text}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() =>
                      dropOptions(
                        droppedValues,
                        setDroppedValues,
                        index,
                        setIndex,
                        field1,
                        sourceColumnNames,
                        ind
                      )
                    }
                  >

                    <p>{each}</p>
                  </div>
                ))}
              </div>
              <div className={styles.options_target}>
                {targetColumnNames.map((each) => (
                  <div className={styles.options_text}>
                    <p>{each}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}
