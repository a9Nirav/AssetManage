import { Button } from '@mui/material'
import { React, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';
import TableModal from '../../components/TableModal/TableModal';
import { useNavigate } from 'react-router-dom';




// import * as React from 'react';

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { fetchVendor } from "../../features/masterApi.js"
import { useDispatch, useSelector } from 'react-redux';
import usePagination from "../../features/usePagination";
import { setEditVendor,setViewVendor } from '../../features/masterSlice.js';





const VendorMasterTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (vendor) =>{
        console.log(vendor)
        // navigate("/Master/VendorMaster", {state:vendor})
        dispatch(setEditVendor(vendor))
        navigate("/Master/VendorMaster") 
    }

    const handleView = (vendor)=>{
        dispatch(setViewVendor(vendor));
        navigate("/Master/VendorMaster")
    }


    
   

    const Vendors = useSelector(state => state.master.Vendors || [])


    useEffect(() => {
        dispatch(fetchVendor())
    }, [dispatch])



    const { searchQuery, setSearchQuery, filteredData } = useSearch(Vendors);
    // Toast notification function
    const notify = () => toast.error("Delete Data");


    // Modal 
    const [view, setView] = useState(false)
    const [MobalData, setMobalData] = useState({})


    const {
        currentPage,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange,
        paginatedData,
        totalPages
    } = usePagination(filteredData, 5);

    return (

        <>

            <ToastContainer />


            {
                view && <TableModal {...{
                    setView,
                    MobalData,
                    title: "Company Modal"
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


                <div className="card shadow border-0 p-4 mt-3 table-responsive">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="searchBox d-flex align-items-center w-25">
                            <IoSearch className="mr-2" />
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="ms-3 d-flex align-items-center">
                            <label className="me-2">No. Of Records</label>
                            <input
                                type="number"
                                min="1"
                                value={rowsPerPage}
                                onChange={handleRowsPerPageChange}
                                className="pagerow"

                            />
                        </div>
                    </div>

                    <table className="table table-bordered table-striped v-align mt-3">
                        <thead className="thead-dark">
                            <tr>

                                <th style={{ width: "10px" }}>No.</th>
                                <th>Name</th>
                                <th>Contact Person</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>City</th>


                                <th>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((vendor, index) => (
                                    <tr key={vendor.RowNo}>
                                        <td>{index + 1}</td>
                                        <td>{vendor.VdrName}</td>
                                        <td>{vendor.CntctPerson}</td>
                                        <td>{vendor.PhoneNo}</td>
                                        <td>{vendor.Email}</td>
                                        <td>{vendor.City}</td>

                                        <td>
                                            <div className="actions d-flex align-items-center">

                                                <Button className="secondary" color="secondary"
                                                    // onClick={() => {
                                                    //     setView(true)
                                                    //     setMobalData({ ...vendor })

                                                    // }}
                                                    onClick={()=>handleView(vendor)}
                                                >
                                                    <FaEye />
                                                </Button>


                                               
                                                    <Button className="success" color="success" onClick={()=>handleEdit(vendor)}>
                                                        <FaPencilAlt />
                                                    </Button>
                                            
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




                    <div className="d-flex justify-content-center mt-3">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                        />
                    </div>

                </div>








            </div>

        </>
    )
}

export default VendorMasterTable