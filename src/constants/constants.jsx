export const dashboard={
    auth:["Login", "Logout"],
    heading:"Quality Control Tools",
    tools:["CSV to CSV","File To DB","DB to DB"],
    routes:["/csvtocsv","/filetodb","/dbtodb"],
    start:"start now"
}; 
export const tableNames=["Column Name","Data Type"]
export const source="Source"
export const target="Target"
export const files=["Source", "Drop Here", "Target"];
export const submit="Submit";
export const next="Next";
export const back="Back";
export const compare="Compare";
export const home="Home";
export const enable="Enable Header Mapping";
export const choose="Choose Comparison Method";
export const mismatches="Missing Records in Target Compared against Source";
export const count="Count";
export const uploadCSV={upload:"Upload File",supportedType:"*only",click:"Click box to upload"}
export const swapText="swapped"
export const dataBase={
    heading:"Database Connection",
    subheading:"Please enter the below details to establish database connection!",
}
export const acceptedDBs=["mysql","postgres","oracle"]
export const acceptedfileDB=["mysql","postgres"]
export const defaultSelect ="select here"
export const tableSchemaComparison={
    heading:"Tables Schema Comparison",
    description:"Please select the table names to get differences in table schemas!",
    select:"Select Table",
    enable:"Enable case sensitivity",
}
export const tableQueryComparison={
    heading:"Tables Data Comparison",
    subheading:"Enter the below details to to get differences in table data!",
    enable:"Enable case sensitivity",
}

export const invalid={
    text:"Login with divami mail"
}
export const formLabel={
    host:"Host",
    databaseName:"Database Name",
    port:"Port",
    UserName:"User Name",
    Password:"Password",
    dbType:"DataBase Type",
    table:"Table Name"
}