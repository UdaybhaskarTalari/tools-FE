/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
export const Grid=({rows,column, id, size})=>{
    return(
        <DataGrid
              rows={rows}
              columns={column}
              getRowId={(row) => row[id]}
              initialState={{
                ...rows,
                pagination: { paginationModel: { pageSize:size[0] } },
              }}
              pageSizeOptions={size}
            />
    )
}