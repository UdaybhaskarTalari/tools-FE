/* eslint-disable react/prop-types */
import styles from "./InitialStatus.module.scss";
import { BiCheckDouble } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import checkOrder, { checkCount } from "../../services/checkOrder";
import { ButtonComponent } from "../../common/Button/ButtonComponent";
import { useEffect } from "react";

export const InitialStatus = ({
  setInitialCompare,
  InitialCompare,
  step,
  page,
}) => {
  useEffect(() => {
    setInitialCompare({ ...InitialCompare, status: true });
  }, []);
  const consistency = [
    {
      name: "header count",
      value: checkCount(InitialCompare),
    },
    {
      name: "header order",
      value: checkOrder(InitialCompare),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        <ButtonComponent type={"button"} status={true} variant={"contained"} size={"small"} disable={false} label={"Back"} clickFunction={() => {
            step(page - 2);
          }}
        />
        <ButtonComponent  type={"button"}  status={true}  variant={"contained"}  size={"small"}  disable={false}  label={"Next"}  clickFunction={() => {
                                                                                                                                                        step(page);
                                                                                                                                                      }}
        />
      </div>
      <ul className={styles.content}>
        {consistency.map((each, index) => (
          <li className={styles.content_items} key={index}>
            <span className={styles.content_items_text}>{each.name}</span>
            <span>
              {each.value ? (
                <BiCheckDouble className={styles.success} />
              ) : (
                <ImCross className={styles.warning} />
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
