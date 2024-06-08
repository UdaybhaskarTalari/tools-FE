/* eslint-disable react-hooks/rules-of-hooks */
import { request } from "./Axios/Httpcalls";
import { notify } from "./Toast";
/**
 *
 * @param {object} formData
 * @param {CallableFunction} setStatusMessage
 * @param {CallableFunction} setCSVFields
 * @param {string} token
 * @description calls an api to upload 2 csv files and stores the response
 */
export const csvUploadFile = async (formData, setCSVFields, token) => {
  try {
    const res = await request("POST", "csvfile", formData, token);
    setCSVFields((prev) => ({
      ...prev,
      sourceFile: res?.sourceFile,
      targetFile: res?.targetFile,
      uploadMessage: res?.message,
      uploadStatus: res?.status,
    }));
    if (!res?.status) notify(res?.message, res?.status);
  } catch (e) {
    notify(e.message, "Error");
  }
};

/**
 *
 * @param {object} csvFields
 * @param {CallableFunction} setCSVFields
 * @param {string} token
 * @description calls an api initialcsvcompare(checks the headers order and headers count) and stores the response
 */
export const csvInitialCompare = async (
  csvFields,
  setInitialCompareCSVtoCSV,
  token,
  setDroppedValues,
  setIndex
) => {
  try {
    const res = await request(
      "POST",
      "initialcsvcompare",
      {
        source: csvFields?.sourceFile,
        target: csvFields?.targetFile,
      },
      token
    );
    setInitialCompareCSVtoCSV((prev) => ({
      ...prev,
      status: res?.status,
      sourceHeaders: res?.header1,
      targetHeaders: res?.header2,
      message: res.message,
    }));
    if (!res?.status || res?.status=="error") notify(res?.message, res?.status);
  } catch (e) {
    notify(e?.message, "Error");
  }
  setDroppedValues([]);
  setIndex({});
};
