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
              <Route path="/" element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Master/UserMaster" element={<UserMaster />} />
              <Route path="/Master/UserMasterTable" element={<UserMasterTable/>} />
              <Route path="/Master/CompanyMaster" element={<CompanyMaster/>} />
              <Route path="/Master/CompanyMasterTable" element={<CompanyMasterTable/>} />
              <Route path="/Master/Location" element={<Location/>} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
