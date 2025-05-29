import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CustomInput from "../../components/CustomInput/CustomInput";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
// import CustomInput from "../../components/CustomInput/CustomInput";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';

import { useDispatch, useSelector } from 'react-redux';
import { createGLType, fetchGLType } from "../../features/masterApi.js";
import { useState, useEffect } from "react";
import { GLValidationSchema } from "../../features/validationSchemas";


const GLMaster = () => {
    const dispatch = useDispatch()
    const GLtypes = useSelector(state => state.master.GLTypes || []);
    console.log(GLtypes);

    useEffect(() => {
        dispatch(fetchGLType());

    }, [dispatch]);



    const { searchQuery, setSearchQuery, filteredData } = useSearch(GLtypes);



    // form validation start
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(GLValidationSchema),
    });

    const onSubmit = async (data) => {
        await dispatch(createGLType(data)).unwrap();
        console.log("Form Data:", data);
        toast.success("Submit Data Success");
         dispatch(fetchGLType());
         reset();

    };


    return (
        <>
            <ToastContainer />
            <div className="right-content">

                <div className="card shadow border-0 w-100  p-4 res-col ">
                    <div className="d-flex justify-content-between algin-content-center align-items-center">


                        <h5 className='mb-0'>+ ADD GLMaster</h5>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>
                    </div>


                    <hr />

                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">

                            {/* <CustomInput label="GL Type" name="gL_Type" register={register} errors={errors} /> */}

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Asset Type:<sup className="text-red-500">*</sup></label>
                                <select
                                    className={`form-select form-control ${errors.GL_Type ? "is-invalid" : ""}`}
                                    {...register("GL_Type")}
                                >
                                    <option value="">Select a location</option>
                                    <option value="Cost">Cost</option>
                                    <option value="Expense">Expense</option>
                                    <option value="accumulation">accumulation</option>
                                </select>
                                <div className="invalid-feedback">{`GL_Type ${errors.GL_Type?.message}`}</div>
                            </div>
                            <CustomInput label="Account Code" name="AccountCode" register={register} errors={errors} />

                            <div className="col-md-6 mb-3">

                                <label className="form-label">Description:</label>
                                <textarea
                                    type="text"
                                    className={` form-control ${errors.Account_Desc ? "is-invalid" : ""}`}
                                    {...register("Account_Desc")}

                                    placeholder="Enter your name"
                                />
                                <div className="invalid-feedback">{`Description ${errors.Account_Desc?.message}`}</div>

                            </div>




                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-dark w-25 mt-3">
                            Submit
                        </button>
                    </form>


                </div>



                {/* view department */}



                <div className="card shadow border-0 w-100  p-4 res-col table-responsive ">

                    {/* Search Box */}
                    <div className="searchBox d-flex align-items-center w-25 w-sm-100">
                        <IoSearch className="mr-2" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={searchQuery}
                            className='w-100'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <table className="table table-bordered table-striped v-align mt-3">
                        <thead className="thead-dark">
                            <tr>

                                <th style={{ width: "10px" }}>No.</th>
                                <th>GL Type</th>
                                <th>Account Code</th>
                                <th>Account Des </th>
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                filteredData.length > 0 ? (filteredData.map((a, index) => (
                                    <tr key={a.rowNo}>


                                        <td>{index + 1}</td>
                                        <td>{a.glType}</td>
                                        <td>{a.accountCode}</td>
                                        <td>{a.accountDescription}</td>


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

                </div>




            </div>
        </>

    )
}

export default GLMaster;