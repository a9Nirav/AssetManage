
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useState } from 'react';

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { IoSearch } from "react-icons/io5";
import useSearch from '../../features/useSearch';
import { toast ,ToastContainer} from "react-toastify";

import TableModal from '../../components/TableModal/TableModal';

 
const vendors = [
    {
        id: 1,
        vendorName: "ABC Supplies",
        contactPerson: "John Doe",
        phone: "123-456-7890",
        email: "john@abc.com",
        city: "New York",
        department: "Procurement"
    },
    {
        id: 2,
        vendorName: "XYZ Traders",
        contactPerson: "Jane Smith",
        phone: "987-654-3210",
        email: "jane@xyz.com",
        city: "Los Angeles",
        department: "Logistics"
    },
    {
        id: 3,
        vendorName: "Global Industries",
        contactPerson: "Michael Johnson",
        phone: "456-789-0123",
        email: "michael@global.com",
        city: "Chicago",
        department: "Finance"
    },
    {
        id: 4,
        vendorName: "Tech Solutions",
        contactPerson: "Emily Brown",
        phone: "789-012-3456",
        email: "emily@tech.com",
        city: "San Francisco",
        department: "IT"
    },
    {
        id: 5,
        vendorName: "Fresh Produce Ltd",
        contactPerson: "David Wilson",
        phone: "321-654-9870",
        email: "david@fresh.com",
        city: "Miami",
        department: "Food Supply"
    }
];

const AssetMasterTable = () => {
    const { searchQuery, setSearchQuery, filteredData } = useSearch(vendors);
    // Toast notification function
    const notify = () => toast.error("Delete Data");
    // const success = () => toast.success("Submit Data Success");

     // Modal 
     const [view, setView] = useState(false)
     const [MobalData, setMobalData] = useState({})
    return (
        <>
      

        {
            view && <TableModal {...{
                setView,
                MobalData,
                title:"Company Modal"
            }}
            
            />
        }
        
        
        <div className="right-content">
            <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
                <h5 className='mb-0 d-flex align-items-center'>  Asset Master Table</h5>
                <div className="">
                    <Link to="/Master/AssetMaster">
                        <Button variant="contained" color="success">Add</Button>
                    </Link>

                   

                </div>

            </div>
            <ToastContainer />


            <div className="card shadow border-0 p-4 mt-3 table-responsive mt-3">
                {/* Search Box */}
                <div className="searchBox d-flex align-items-center w-25">
                    <IoSearch className="mr-2" />
                    <input
                        type="text"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <table className="table table-bordered table-striped v-align mt-3">
                    <thead className="thead-dark">
                        <tr>

                            <th style={{ width: "10px" }}>No.</th>
                            <th>Company Name</th>
                            <th>Contact Person</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>PostalCode</th>

                            <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((vendor, index) => (
                                <tr key={vendor.id}>
                                    <td>{index + 1}</td>
                                    <td>{vendor.vendorName}</td>
                                    <td>{vendor.contactPerson}</td>
                                    <td>{vendor.phone}</td>
                                    <td>{vendor.email}</td>
                                    <td>{vendor.city}</td>
                                    <td>{vendor.department}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                          
                                                <Button className="secondary" color="secondary"
                                                 onClick={()=>{
                                                    setView(true)
                                                    setMobalData({...vendor})
    
                                                   }}
                                                >
                                                    <FaEye />
                                                </Button>
                                           
                                           
                                            <Link to="/Master/CompanyMaster/">
                                                <Button className="success" color="success">
                                                    <FaPencilAlt />
                                                </Button>
                                            </Link>
                                            <Button className="error" onClick={notify} color="error">
                                                <MdDelete />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>


                <div className="d-flex tableFooter">
                    <p>showing <b>12</b> of <b>60</b> results</p>
                    <Pagination count={10} color="primary" className="pagination"
                        showFirstButton showLastButton />
                </div>

            </div>
        </div>
        </>
    )
}

export default AssetMasterTable