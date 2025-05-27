import { Button } from '@mui/material'
import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";

import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';
import TableModal from '../../components/TableModal/TableModal';




// import * as React from 'react';

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import {fetchUser} from "../../features/masterApi.js"
import { useDispatch, useSelector } from 'react-redux';

const vendors = [
    {
        id: 1,
        vendorName: "ABC Supplies",
        contactPerson: "John Doe",
        phone: "123-456-7890",
        email: "john@abc.com",
        city: "New York",
        department: "Procurement",
        jobTitle:"admin"
    },
    {
        id: 2,
        vendorName: "XYZ Traders",
        contactPerson: "Jane Smith",
        phone: "987-654-3210",
        email: "jane@xyz.com",
        city: "Los Angeles",
        department: "Logistics",
        jobTitle:"admin"
    },
    {
        id: 3,
        vendorName: "Global Industries",
        contactPerson: "Michael Johnson",
        phone: "456-789-0123",
        email: "michael@global.com",
        city: "Chicago",
        department: "Finance",
        jobTitle:"admin"
    },
    {
        id: 4,
        vendorName: "Tech Solutions",
        contactPerson: "Emily Brown",
        phone: "789-012-3456",
        email: "emily@tech.com",
        city: "San Francisco",
        department: "IT",
        jobTitle:"admin"
    },
    {
        id: 5,
        vendorName: "Fresh Produce Ltd",
        contactPerson: "David Wilson",
        phone: "321-654-9870",
        email: "david@fresh.com",
        city: "Miami",
        department: "Food Supply",
        jobTitle:"admin"
    }
];


const VendorMasterTable = () => {
 const dispatch = useDispatch();

 const user = useSelector(state => state.master.user)


 useEffect(()=>{
    dispatch(fetchUser())
 },[dispatch])

 console.log(user)

    const { searchQuery, setSearchQuery, filteredData } = useSearch(vendors);
    // Toast notification function
    const notify = () => toast.error("Delete Data");
    

    // Modal 
    const [view, setView] = useState(false)
    const [MobalData, setMobalData] = useState({})

    return (

        <>

        <ToastContainer/>


        {
            view && <TableModal {...{
                setView,
                MobalData,
                title:"Company Modal"
            }}
            
            />
        }
 


            {
                view && <TableModal {...{
                    setView,
                    MobalData,
                    title: "User Details"
                }}

                />
            }

            <div className='right-content w-100'>

                <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
                    <h5 className='mb-0 d-flex align-items-center'>Vendor Master</h5>
                    <Link to="/Master/VendorMaster">
                        <Button variant="contained" color="success">+ add</Button>
                    </Link>

                </div>


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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Division</th>
                                <th>Department</th>
                                <th>Job Title</th>

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
                                        <td>{vendor.jobTitle}</td>
                                        <td>
                                            <div className="actions d-flex align-items-center">

                                                <Button className="secondary" color="secondary"
                                                    onClick={() => {
                                                        setView(true)
                                                        setMobalData({ ...vendor })

                                                    }}
                                                >
                                                    <FaEye />
                                                </Button>


                                                <Link to="/Master/UserMaster">
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

export default VendorMasterTable