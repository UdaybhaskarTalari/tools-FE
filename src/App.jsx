import "./App.scss";
import "./styles/Common.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FileToDB } from "./pages/FileToDB/FileToDB.jsx";
import { DashBoard } from "./pages/DashBoard/DashBoard.jsx";
import { CSVtoCSV } from "./pages/CSVtoCSV/CSVtoCSV.jsx";
import ErrorConnection from "./common/ErrorConnection/ErrorConnection.jsx";
import TableDataComparision from "./components/TableDataComparision/TableDataComparision.jsx";
import TableSchemaComparision from "./components/TableSchemaComparision/TableSchemaComparision.jsx";
import DataBase from "./pages/DataBase/DataBase.jsx";
import { ComparisonOptions } from "./components/ComparisonOptions/ComparisonOptions.jsx";
import { ContextProvider } from "./ContextProvider.jsx";
import { InvalidMail } from "./components/InvalidMail/InvalidMail.jsx";

function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/filetodb" element={<FileToDB />} />
            <Route path="/csvtocsv" element={<CSVtoCSV />} />
            <Route path="/dbtodb" element={<DataBase />} />
            <Route
              path="/schemaComparision"
              element={<TableDataComparision />}
            />
            <Route path="/comparisonOptions" element={<ComparisonOptions />} />
            <Route
              path="/dataComparision"
              element={<TableSchemaComparision />}
            />
            <Route path="/error" element={<ErrorConnection />} />
            <Route path="/invalidmail" element={<InvalidMail />} />
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
}
export default App;
