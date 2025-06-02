import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";

import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';
import TableModal from '../../components/TableModal/TableModal';

import usePagination from "../../features/usePagination";



// import * as React from 'react';

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { fetchUser } from "../../features/masterApi.js"
import { useDispatch, useSelector } from 'react-redux';





const ReplacementsTable = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.master.user || [])
    console.log(user)


    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    console.log(user)

    const { searchQuery, setSearchQuery, filteredData } = useSearch(user);
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
                    title: "Asset Repair Table"
                }}

                />
            }

            <div className='right-content w-100'>

                <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
                    <h5 className='mb-0 d-flex align-items-center'>Replacements Table</h5>
                    <Link to="/Transactions/Replacements">
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
                                <th>Reference No. </th>


                                <th>Asset Name</th>
                                <th>Part Added / Replaced</th>
                                <th>Repair Date</th>
                                <th>Remark</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((vendor, index) => (
                                    <tr key={vendor.id}>
                                        <td>{index + 1}</td>
                                        <td>{vendor.userName}</td>


                                        <td>{vendor.mobileNo}</td>
                                        <td>{vendor.emailID}</td>
                                        <td>{vendor.locName}</td>
                                        <td>{vendor.divName}</td>
                                 
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

export default ReplacementsTable