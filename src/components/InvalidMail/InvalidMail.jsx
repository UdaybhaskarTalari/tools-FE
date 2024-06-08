import style from "./InvalidMail.module.scss"
import { dashboard, invalid } from "../../constants/constants"
import { ButtonComponent } from "../../common/Button/ButtonComponent"
import { logIn } from "../../services/auth"
export const InvalidMail=()=>{
    return(
        <div className={style.container}>
            <div className={style.container_content}>
                <p>{invalid.text}</p>
                </div>
                <ButtonComponent type={"button"} status={true} variant={"contained"} size={"small"} disable={false} label={dashboard.auth[0]} clickFunction={()=>logIn()}/>

        </div>
    )
}