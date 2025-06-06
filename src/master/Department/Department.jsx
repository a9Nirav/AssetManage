import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from '@mui/material';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
import CustomInput from "../../components/CustomInput/CustomInput";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';

import { DepartmentValidationSchema } from "../../features/validationSchemas";
import { useDispatch, useSelector } from 'react-redux';
import { createDept, fetchDept, fetchLocations, updateDept } from '../../features/masterApi';
import usePagination from "../../features/usePagination";
import Pagination from '@mui/material/Pagination';

const Department = () => {

    const dispatch = useDispatch()
    const Dept = useSelector((state) => state.master.Depts || []);

    const locations = useSelector(state => state.master.locations);

 const [selectedLocation, setSelectedLocation] = useState(null);









    const [editId, setEditId] = useState("");
    const { searchQuery, setSearchQuery, filteredData } = useSearch(Dept);

    // form validation start
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        getValues,

        formState: { errors },
    } = useForm({
        resolver: yupResolver(DepartmentValidationSchema),
    });



    const startEdit = (a) => {
        setEditId(a.DeptCode);
        setValue("DeptName", a.DeptName);
        setValue("DeptDesc", a.DeptDesc);
        setValue("LocCode", a.LocCode);
        const matchedLocation = locations.find((loc) => loc.LocName === a.LocName);
        setSelectedLocation(matchedLocation || null);
      
        console.log(a.LocCode)
    };
    console.log(editId)

    useEffect(() => {
        dispatch(fetchDept());
        dispatch(fetchLocations());

    }, [dispatch]);

    const onSubmit = async (data) => {
        console.log("hi")


        try {
            let response

            if (editId) {
                let res = await dispatch(updateDept({ DeptCode: editId, data })).unwrap();
                toast.success(res?.ErrorDetails?.ErrorDescription);
            }
            else {
                response = await dispatch(createDept(data)).unwrap();
                console.log(response)

                toast.success(response?.ErrorDetails?.ErrorDescription || "Dept added successfully!");

            }


            dispatch(fetchDept());
            reset();
            

        } catch (error) {
            toast.error(error || "Failed to add");
            console.error(error);

        }


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


                            <CustomInput label="Department Name" name="DeptName" register={register} errors={errors} />

                            {/* <div className="col-md-6 mb-3">
                                <label className="form-label">Location Name:</label>
                                <select
                                    className={`form-select form-control ${errors.LocCode ? "is-invalid" : ""}`}
                                    {...register("LocCode")}
                                    aria-label="Default select example"
                                >
                                    <option value="">Select a location</option>
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={String(loc.LocCode)}>
                                            {loc.LocName}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">{`Location  ${errors.LocCode?.message}`}</div>

                            </div> */}


                            <div className="col-md-6 mb-3">

                                <label className="form-label">Description:</label>
                                <textarea
                                    type="text"
                                    className={` form-control ${errors.DeptDesc ? "is-invalid" : ""}`}
                                    {...register("DeptDesc")}

                                    placeholder="Enter your name"
                                />
                                <div className="invalid-feedback">{`Description ${errors.DeptDesc?.message}`}</div>

                            </div>

                            <div className="col-md-6">
                                <Autocomplete
                                    options={locations}
                                    getOptionLabel={(option) => option.LocName}
                                    value={selectedLocation}
                                    onChange={(e, value) => {
                                        setSelectedLocation(value)
                                        setValue("LocCode", value?.LocCode || "");
                                    }}
                                    renderInput={(params) => (
                                        <>
                                            <label className="form-label">Location Name</label>
                                            <TextField
                                                {...params}
                                                placeholder="Type to search location"
                                              
                                               className={`form-control ${errors?.LocCode ? "is-invalid" : ""}`}

                                            />
                                            {errors?.LocCode && (
                                                <div className="invalid-feedback">
                                                 {`Location Name ${errors?.LocCode.message} `}  
                                                </div>
                                            )}

                                        </>
                                    )}
                                />

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
                                <th>Location </th>
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                paginatedData.length > 0 ? (paginatedData.map((a, index) => (
                                    <tr key={a.RowNo}>


                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                        <td>{a.DeptName}</td>
                                        <td>{a.DeptDesc}</td>
                                        <td>{a.LocName}</td>


                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to="">    <Button className="success" color="success" onClick={() => startEdit(a)}><FaPencilAlt /></Button></Link>

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

export default Department