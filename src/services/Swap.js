/**
 *
 * @param {object} tableSchema
 * @param {CallableFunction} setTableSchema
 * @param {Boolean} show
 * @param {CallableFunction} isshow
 * @description swaps the source and target databsebase tables
 */
export const swap = (
  tableSchema,
  setTableSchema,
  setSelectedTable,
  selectedTable,
  show,
  isshow
) => {
  setSelectedTable((prev) => ({
    source: prev.target,
    target: prev.source,
    sourceDbType: prev.targetDbType,
    targetDbType: prev.sourceDbType,
  }));
  let schema1 = { ...tableSchema.sourceSchema };
  let schema2 = { ...tableSchema.targetSchema };
  setTableSchema({
    ...tableSchema,
    sourceSchema: schema2,
    targetSchema: schema1,
  });
  isshow(!show);
};
