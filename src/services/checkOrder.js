/**
 * 
 * @param {object} values 
 * @returns {Boolean} 
 *  true - all the headers matched
 *  false -any one of the header mismatched or headers are undefined
 */
const checkOrder=(InitialCompare)=>{
    if(InitialCompare.sourceHeaders==undefined ||InitialCompare.targetHeaders==undefined)
        return false;
    if(InitialCompare.sourceHeaders.length!=InitialCompare.targetHeaders.length)
        return false;
    for(let i=0;i<InitialCompare.sourceHeaders.length;i++)
    {
        if(InitialCompare.sourceHeaders[i]!=InitialCompare.targetHeaders[i])
            return false;
    }
    return true;
}
export default checkOrder;

export const checkCount=(InitialCompare)=>{
    return InitialCompare?.sourceHeaders.length==InitialCompare?.targetHeaders.length
}