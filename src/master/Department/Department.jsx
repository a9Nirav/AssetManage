import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
import CustomInput from "../../components/CustomInput/CustomInput";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';

import { DepartmentValidationSchema } from "../../features/validationSchemas";
import { useDispatch, useSelector } from 'react-redux';
import { createDept, fetchDept, fetchLocations } from '../../features/masterApi';


const Department = () => {

    const dispatch = useDispatch()
    const Dept = useSelector((state) => state.master.Depts || []);
    
    const locations = useSelector(state => state.master.locations);

   










    const { searchQuery, setSearchQuery, filteredData } = useSearch(Dept);

    // form validation start
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(DepartmentValidationSchema),
    });

    // const onSubmit = (data) => {
    //     console.log("Form Data:", data);
    //     toast.success("Submit Data Success");
    // };

    useEffect(() => {
        dispatch(fetchDept());

    }, [dispatch]);

    const onSubmit = async (data) => {
        console.log("hi")

        await dispatch(createDept(data)).unwrap();
        toast.success("Dept added successfully!");


           
        dispatch(fetchDept());
        reset();  


    };


    return (
        <>
            <ToastContainer />
            <div className="right-content">

                <div className="card shadow border-0 w-100  p-4 res-col ">
                    <div className="d-flex justify-content-between algin-content-center align-items-center">


                        <h5 className='mb-0'>+ ADD Department</h5>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>
                    </div>


                    <hr />

                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">


                            <CustomInput label="Department Name" name="Dept_Name" register={register} errors={errors} />

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

                            <div className="col-md-6 mb-3">

                                <label className="form-label">Description:</label>
                                <textarea
                                    type="text"
                                    className={` form-control ${errors.Dept_Desc ? "is-invalid" : ""}`}
                                    {...register("Dept_Desc")}

                                    placeholder="Enter your name"
                                />
                                <div className="invalid-feedback">{`Description ${errors.Dept_Desc?.message}`}</div>

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
                                <th>Description</th>
                                <th>Location </th>
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                filteredData.length > 0 ? (filteredData.map((a, index) => (
                                    <tr key={a.rowNo}>


                                        <td>{index + 1}</td>
                                        <td>{a.deptName}</td>
                                        <td>{a.deptDesc}</td>
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

                </div>




            </div>
        </>

    )
}

export default Department