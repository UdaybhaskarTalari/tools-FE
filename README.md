 # QA-Automation tools

 
QA Automation tools aims to reduce the time while checking the data whether all the data is migrated or not.

    CSV to CSV - compares the 2 csv files and allows user to rearrange the headers order in  order to compare the specific columns 

    File to DB - compares the data in the files (CSV & XLSX) to data in the database
    
    DB to DB - Compares the data of 2 databases 

    Gives toast messages in failure case
## Run 
Run `npm run dev` to run the project

## Build 
Run `npm run build` to build the project.
 
## Branching stragety

 main
 
    |-dev
    
       |-child branches

 branch naming - feature/branch-name-date


 ## Coding guidelines
Coding guidelines we are going to follow going forward

1. Define a single component per file, which should be smaller (< 200 lines)
2. Component file + style file in a single folder.
3. Components and folders should follow the Pascal case and variables in the Camel case, - all the names should be meaningful.
4. Define all constants in the constants file in UPPERCASE separated by an underscore.
5. SRP - Single responsibility principle - component should serve one single well-defined purpose.
6. DRY - do not repeat yourself - should implement common components/functionalities.
7. Icons are named in lowercase separated by "-" in the assets folder.
8. Remove commented code and unwanted code/imports.
9. Helper functions and services should be available outside the component.
10. Avoid inline styles.
11. Provide inline comments for necessary components, functions, and variables (in most of the cases name itself defines its meaning).
12. Should be well formatted with no lint errors.
13. The styling class should be in the BEM convention.

