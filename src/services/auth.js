import { request } from "./Axios/Httpcalls";
import { notify } from "./Toast";
export const logOut=(removeCookie, Navigate)=>{
    removeCookie("token", { path: "/" }); //removes the token form the cookies
    Navigate("/")

}
export const logIn = async () => {
    try{
    const res = await request("GET", "generatesignin");
    window.location.replace(res.url); // redirects to the dashboard page after login
    }
     catch(e){
        notify(e.message,"error")
     }
  };