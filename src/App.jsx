import './App.css';
import "./responsive.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createContext, useState, useEffect, useMemo } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Header from './components/Header/Header';
import SideBar from './components/Sidebar/SideBar';
import UserMaster from './master/user/UserMaster';
import UserMasterTable from './master/user/UserMasterTable';
import CompanyMaster from './master/Compnay/CompanyMaster';
import CompanyMasterTable from './master/Compnay/CompanyMasterTable';
import Location from './master/Location/Location';
import Division from './master/Division/Division';
import Department from './master/Department/Department';
import TaxMaster from './master/TaxMaster/TaxMaster';
import GLMaster from './master/GLMaster/GLMaster';
import AssetType from './master/AssetType/AssetType';
import AssetMaster from './master/AssetMaster/AssetMaster';
import AssetMasterTable from './master/AssetMaster/AssetMasterTable';
import Login from './pages/Login/Login';
import VendorMaster from './master/Vendor/VendorMaster';
import VendorMasterTable from './master/Vendor/VendorMasterTable';
import AssetAllocation from './Transactions/AssetAllocation/AssetAllocation'
import ViewAssetAlloction from './Transactions/AssetAllocation/ViewAssetAllocation';
import PurchaseOrder from './Transactions/PurchaseOrder/PurchaseOrder';
import ContractEntry from './Transactions/ContractEntry/ContractEntry';
import InsuranceEntry from './Transactions/InsuranceEntery/InsuranceEntery';
import AssetTransfer from './Transactions/AssetTransfer/AssetTransfer';
import AssetRepair from './Transactions/AssetRepair/AssetRepair';
import Replacements from './Transactions/Replacements/Replacements';
import ConsumableIssue from './Transactions/ConsumableIssue/ConsumableIssue';
import DisposeAsset from './Transactions/DisposeAsset/DisposeAsset';
import ScheduleGenerator from './Transactions/ScheduleGenerator/ScheduleGenerator';
import ScheduleDetails from './Transactions/ScheduleDetails/ScheduleDetails';
import Survey from './Transactions/Survey/Survey';
import DepreciationDetails from './Transactions/DepreciationDetails/DepreciationDetails';
import AssetRepairTable from './Transactions/AssetRepair/AssetRepairTable';
import AssetTransferTable from './Transactions/AssetTransfer/AssetTransferTable';
import ConsumableIssueTable from './Transactions/ConsumableIssue/ConsumableIssueTable';
import ContractEntryTable from './Transactions/ContractEntry/ContractEntryTable';
import DepreciationDetailsTable from './Transactions/DepreciationDetails/DepreciationDetailsTable';
import DisposeAssetTable from './Transactions/DisposeAsset/DisposeAssetTale';
import InsuranceEntryTable from './Transactions/InsuranceEntery/InsuranceEnteryTable';
import ReplacementsTable from './Transactions/Replacements/ReplacementsTable';
import ScheduleDetailsTable from './Transactions/ScheduleDetails/ScheduleDetailsTable';
import ScheduleGeneratorTable from './Transactions/ScheduleGenerator/ScheduleGeneratorTable';
import SurveyTable from './Transactions/Survey/SurveyTable';


const MyContext = createContext();

function App() {


  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  const openNav = () => setIsOpenNav(true);

  const values = useMemo(() => ({
    isToggleSidebar,
    setIsToggleSidebar,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    theme,
    setTheme,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
  }), [isToggleSidebar, isHideSidebarAndHeader, theme, windowWidth, isOpenNav]);


 

  return (
    <>
  
    <BrowserRouter>  {/* Only use BrowserRouter here at the root level */}
      <MyContext.Provider value={values}>
        {!isHideSidebarAndHeader && <Header />}
        <div className="main d-flex">
          {!isHideSidebarAndHeader && (
            <>
              <div className={`sidebarOverlay d-none ${isOpenNav ? 'show' : ''}`} onClick={() => setIsOpenNav(false)}></div>
              <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""} ${isOpenNav ? "open" : ""}`}>
                <SideBar />
              </div>
            </>
          )}
          <div className={`content ${isHideSidebarAndHeader ? "full" : ""} ${isToggleSidebar ? "toggle" : ""}`}>
            <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Master/UserMaster" element={<UserMaster />} />
              <Route path="/Master/UserMasterTable" element={<UserMasterTable/>} />
              <Route path="/Master/CompanyMaster" element={<CompanyMaster/>} />
              <Route path="/Master/CompanyMasterTable" element={<CompanyMasterTable/>} />
              <Route path="/Master/Location" element={<Location/>} />
              <Route path="/Master/division" element={<Division/>} />
              <Route path="/Master/Department" element={<Department/>} />
              <Route path="/Master/TaxMaster" element={<TaxMaster/>} />
              <Route path="/Master/GLMaster" element={<GLMaster/>} />
              <Route path="/Master/AssetType" element={<AssetType/>} />
              <Route path="/Master/AssetMaster" element={<AssetMaster/>} />
              <Route path="/Master/AssetMasterTable" element={<AssetMasterTable/>} />
              <Route path="/Master/VendorMaster" element={<VendorMaster/>} />
              <Route path="/Master/VendorMasterTable" element={<VendorMasterTable/>} />

               <Route path="/Transactions/AssetAlloction" element={<AssetAllocation/>} />
              <Route path="/Transactions/ViewAssetAlloction" element={<ViewAssetAlloction/>} />
              <Route path="/Transactions/PurchaseOrder" element={<PurchaseOrder/>} />
              <Route path="/Transactions/ContractEntry" element={<ContractEntry/>} />
              <Route path="/Transactions/ContractEntryTable" element={<ContractEntryTable/>} />
              <Route path="/Transactions/InsuranceEntry" element={<InsuranceEntry/>} />
              <Route path="/Transactions/InsuranceEntryTable" element={<InsuranceEntryTable/>} />
              <Route path="/Transactions/AssetTransfer" element={<AssetTransfer/>} />
              <Route path="/Transactions/AssetTransferTable" element={<AssetTransferTable/>} />
              <Route path="/Transactions/AssetRepair" element={<AssetRepair/>} />
              <Route path="/Transactions/AssetRepairTable" element={<AssetRepairTable/>} />
              <Route path="/Transactions/Replacements" element={<Replacements/>} />
              <Route path="/Transactions/ReplacementsTable" element={<ReplacementsTable/>} />
              <Route path="/Transactions/ConsumableIssue" element={<ConsumableIssue/>} />
               <Route path="/Transactions/ConsumableIssueTable" element={<ConsumableIssueTable/>} />

              <Route path="/Transactions/DisposeAsset" element={<DisposeAsset/>} />
               <Route path="/Transactions/DisposeAssetTable" element={<DisposeAssetTable/>} />
              <Route path="/Transactions/ScheduleGenerator" element={<ScheduleGenerator/>} />
               <Route path="/Transactions/ScheduleGeneratorTable" element={<ScheduleGeneratorTable/>} />
              <Route path="/Transactions/ScheduleDetails" element={<ScheduleDetails/>} />
              <Route path="/Transactions/ScheduleDetailsTable" element={<ScheduleDetailsTable/>} />
              <Route path="/Transactions/Survey" element={<Survey/>} />
              <Route path="/Transactions/SurveyTable" element={<SurveyTable/>} />
              <Route path="/Transactions/DepreciationDetails" element={<DepreciationDetails/>} />
               <Route path="/Transactions/DepreciationDetailsTable" element={<DepreciationDetailsTable/>} />




             
     
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
export { MyContext };
