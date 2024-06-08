import { request } from "./Axios/Httpcalls";
import { notify } from "./Toast";
/**
 * 
 * @param {object} payload 
 * @param {string} token
 * @description downloads a file of type csv/text 
 */
export const DownloadMismatches = async (payload,token) => {
    try {
      const res = await request("POST", "downloadfile", payload,token);
      const blob = new Blob([res], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      a.click();
      window.URL.revokeObjectURL(url);
      if(res?.status)
        notify("Downloaded successfully",true)
    } catch (error) {
      notify(error.message,"Error")
    }
  };