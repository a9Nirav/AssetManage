import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";  
import { HiPuzzle } from "react-icons/hi";  
import { FaUserAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { HiBriefcase } from "react-icons/hi";
import { IoLogoAmplify } from "react-icons/io5";
import { FaCodepen } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiFillAppstore } from "react-icons/ai";
import { HiMiniPaperAirplane } from "react-icons/hi2";
// import { AiFillOpenAI } from "react-icons/ai";
import { FaBookOpen } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";


import { IoMdArrowRoundForward } from "react-icons/io";

const SideBar = () => {


    // State for active tabs
    const [activeTab, setActiveTab] = useState(null); 

    // State for submenus toggles
    const [isMasterSubmenuOpen, setIsMasterSubmenuOpen] = useState(false);
    const [isTransactionsSubmenuOpen, setIsTransactionsSubmenuOpen] = useState(false);

    // Handle toggle for "Master" submenu
    const toggleMasterSubmenu = () => {
        setIsMasterSubmenuOpen(!isMasterSubmenuOpen);
        setActiveTab(isMasterSubmenuOpen ? null : 1);
    }

    // Handle toggle for "Transactions" submenu
    const toggleTransactionsSubmenu = () => {
        setIsTransactionsSubmenuOpen(!isTransactionsSubmenuOpen);
        setActiveTab(isTransactionsSubmenuOpen ? null : 2);
    }

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/">
                        <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
                            <span className='icon'><MdDashboard /></span>
                            Dashboard
                        </Button>
                    </Link>
                </li>
                
                {/* Master Section */}
                <li>
                    <Button className={`w-100 ${activeTab === 1 ? 'active' : ''}`} onClick={toggleMasterSubmenu}>
                        <span className='icon'><MdWorkspacePremium /></span>
                        Master
                        <span className='arrow'><FaAngleRight /></span>
                    </Button>
                    <div className={`submenuWrapper ${isMasterSubmenuOpen ? 'colapse' : 'colapsed'}`}>
                        <ul className='submenu'>
                            <li><Link to="/Master/UserMaster"><span className='icon mr-3 me-2'><FaUserAlt /></span>User</Link></li>
                            <li><Link to="/Master/CompanyMaster"><span className='icon mr-3 me-2'><FaUserAlt /></span>Company</Link></li>
                            <li><Link to="/Master/Location"><span className='icon mr-3 me-2'><FaUserAlt /></span>Location</Link></li>
                            <li><Link to="/Master/Division"><span className='icon mr-3 me-2'><FaUserAlt /></span>Division</Link></li>
                            <li><Link to="/Master/Department"><span className='icon mr-3 me-2'><FaUserAlt /></span>Department</Link></li>
                            <li><Link to="/Master/TaxMaster"><span className='icon mr-3 me-2'><FaUserAlt /></span>Tax Master</Link></li>
                            <li><Link to="/Master/GLMaster"><span className='icon mr-3 me-2'><FaUserAlt /></span>GL Type</Link></li>
                            <li><Link to="/Master/AssetType"><span className='icon mr-3 me-2'><FaUserAlt /></span>Asset Type</Link></li>
                            <li><Link to="/Master/AssetMaster"><span className='icon mr-3 me-2'><FaUserAlt /></span>Asset Master</Link></li>
                           

                        </ul>
                    </div>

                </li>



                {/* Transactions Section */}
                <li>
                    <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`} onClick={toggleTransactionsSubmenu}>
                        <span className='icon'><HiPuzzle /></span>
                        Transactions
                        <span className='arrow'><FaAngleRight /></span>
                    </Button>
                    <div className={`submenuWrapper ${isTransactionsSubmenuOpen ? 'colapse' : 'colapsed'}`}>
                        <ul className='submenu'>
                            <li><Link to="/">Asset Allocation</Link></li>
                            <li><Link to="/">Product View</Link></li>
                            <li><Link to="/">Product Upload</Link></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <Link to="/">
                        <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`} onClick={() => setActiveTab(4)}>
                            <span className='icon'><FaBell /></span>
                            Notifications
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/">
                        <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`} onClick={() => setActiveTab(5)}>
                            <span className='icon'><IoIosSettings /></span>
                            Settings
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/login">
                        <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`} onClick={() => setActiveTab(6)}>
                            <span className='icon'><FaUser /></span>
                            Login
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/signUp">
                        <Button className={`w-100 ${activeTab === 7 ? 'active' : ''}`} onClick={() => setActiveTab(7)}>
                            <span className='icon'><FaUser /></span>
                            Sign Up
                        </Button>
                    </Link>
                </li>
            </ul>

            <br />

            <div className='logoutWrapper'>
                <div className='logoutBox'>
                    <Button variant="contained my-btn"><IoMdLogOut /> Logout</Button>
                </div>
            </div>
        </div>
    );
}


export default SideBar