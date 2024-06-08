
/**
 * 
 * @param {object} val 
 * @param {CallableFunction} setVal 
 * @param {Array} ind 
 * @param {CallableFunction} setInd 
 * @param {number} field1 
 * @param {Array} source 
 * @param {Array} index 
 * @description maps the source column names with the target column names
 */
export const dropOptions = (val,setVal,ind,setInd,field1,source,index) => {
    let updatedDbFeilds = [...val];
    if (ind[String(field1)] >= 0) {
      updatedDbFeilds[ind[String(field1)]] = "Drop Here";
      setVal([...updatedDbFeilds]);
    }
    updatedDbFeilds[index] = source[field1];
    setVal([...updatedDbFeilds]);
    setInd(() => ({ ...ind, [field1]: index }));
  };

export const removeDrop=(droppedValues,setDroppedValues,index,setIndex,field1,ind)=>{
    delete index[field1];
    setIndex(index)
    droppedValues[ind]="Drop Here"
    setDroppedValues(droppedValues)
} 

export const emptyHeaders=(length,setDroppedValues,setIndex)=>{
  const emptyFeilds = new Array(length);
  emptyFeilds.fill("Drop Here");
  setDroppedValues(emptyFeilds);
  setIndex(prev=>({}))
  // setEnable(true)
}