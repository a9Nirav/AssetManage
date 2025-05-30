import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUpload } from "react-icons/fa6";
import useSearch from '../../features/useSearch';
import { IoSearch } from "react-icons/io5";


import { DivisionValidationSchema } from "../../features/validationSchemas";
import { useDispatch, useSelector } from 'react-redux';
import { createDivi, fetchDivi } from '../../features/masterApi';
import usePagination from "../../features/usePagination";

const Division = () => {
    const dispatch = useDispatch();
    const division = useSelector((state) => state.master.divis || [])
    const locations = useSelector(state => state.master.locations);
    console.log('division' + division)
    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(DivisionValidationSchema),

    });


    const { searchQuery, setSearchQuery, filteredData } = useSearch(division);


    useEffect(() => {
        dispatch(fetchDivi())
    }, [dispatch])

    const onSubmit = async (data) => {
        await dispatch(createDivi(data)).unwrap();
        console.log("Form Data:", data);
        toast.success("Submit Data Success");
        dispatch(fetchDivi())
        reset()

    };


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
            <div className='right-content w-100'>

                <div className="card shadow border-0 w-100  p-4 res-col ">
                    <div className="d-flex justify-content-between algin-content-center align-items-center">


                        <h5 className='mb-0'>+ ADD Division</h5>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>
                    </div>


                    <hr />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <CustomInput label="Division" name="Div_Name" register={register} errors={errors} />
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Location Name:</label>
                                <select
                                    className={`form-select form-control ${errors.Loc_Code ? "is-invalid" : ""}`}
                                    {...register("Loc_Code")}
                                    aria-label="Default select example"
                                >
                                    <option value="">Select a location</option>
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={loc.locCode}>
                                            {loc.locName}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">{`Location  ${errors.Loc_Code?.message}`}</div>

                            </div>
                            <CustomInput label="Description" name="Div_Desc" register={register} errors={errors} />

                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-dark w-25 mt-3">
                            Submit
                        </button>
                    </form>


                </div>


                <div className="card shadow border-0 w-100  p-4 res-col">
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
                                <th>Description</th>
                                <th>Location</th>
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                paginatedData.length > 0 ? (paginatedData.map((a, index) => (
                                    <tr key={a.rowNo}>


                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                        <td>{a.divName}</td>
                                        <td>{a.divDesc}</td>
                                        <td>{a.locName}</td>


                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to="">    <Button className="success" color="success"><FaPencilAlt /></Button></Link>

                                                <Button className="error" color="error"><MdDelete /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No results found
                                        </td>
                                    </tr>

                                )
                            }









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

export default Division