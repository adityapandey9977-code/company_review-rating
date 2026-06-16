import { Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar.jsx";
import CompanyDetail from "./pages/CompanyDetail.jsx";
import CompanyList from "./pages/CompanyList.jsx";

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </>
  );
}

export default App;
