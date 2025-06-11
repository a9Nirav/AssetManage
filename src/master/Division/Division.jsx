import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUpload } from "react-icons/fa6";
import useSearch from '../../features/useSearch';
import { IoSearch } from "react-icons/io5";
import { Autocomplete, TextField } from '@mui/material';


import { DivisionValidationSchema } from "../../features/validationSchemas";
import { useDispatch, useSelector } from 'react-redux';
import { createDivi, fetchDivi, fetchLocations, updateDivi, deleteDiVi } from '../../features/masterApi';
import usePagination from "../../features/usePagination";

const Division = () => {
    const dispatch = useDispatch();
    const division = useSelector((state) => state.master.divis || [])
    const locations = useSelector(state => state.master.locations);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editId, setEditId] = useState("");
    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(DivisionValidationSchema),

    });


    // Pre-fill form when editing
    const startEdit = (a) => {
        setEditId(a.DivCode);
        setValue("DivName", a.DivName);
        setValue("DivDesc", a.DivDesc);
        setValue("LocCode", a.LocCode);
        const matchedLocation = locations.find((loc) => loc.LocCode === a.LocCode);
        setSelectedLocation(matchedLocation || null);


    };
    console.log(selectedLocation)



    const { searchQuery, setSearchQuery, filteredData } = useSearch(division);


    useEffect(() => {
        dispatch(fetchDivi())
        dispatch(fetchLocations())
    }, [dispatch])

    const onSubmit = async (data) => {
        try {

            if (editId) {
                let res1 = await dispatch(updateDivi({ DivCode: editId, data })).unwrap();
                toast.success(res1.ErrorDetails.ErrorDescription)

            } else {
                const res = await dispatch(createDivi(data)).unwrap();
                toast.success(res?.ErrorDetails?.ErrorDescription || "Division ");
            }


            dispatch(fetchDivi());
            reset();
            setSelectedLocation(null);


        } catch (err) {
            toast.error("Failed to create division");
            console.error("Submit error:", err);
        }
    };

    const handleDelete = async (a) => {
        const DiviToDelete = division.find(e => e.DivCode === a);

        console.log(a)
        console.log(DiviToDelete.LocCode)

        if (!DiviToDelete) {
            toast.error("Location not found");
            return;
        }



        if (window.confirm(`Are you sure you want to delete this Division? ${DiviToDelete.DivName}`)) {
            try {
                const response = await dispatch(deleteDiVi({
                    DivCode: DiviToDelete.DivCode,
                    LocCode: DiviToDelete.LocCode,

                })).unwrap();

                toast.success(response?.ErrorDetails.ErrorDescription || "Divition deleted successfully!");

                // Optional: Refresh from backend (good if data changes outside UI)
                dispatch(fetchDivi());
            } catch (error) {
                toast.error(error || "Delete failed");
                console.error("Delete error:", error);
            }
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
                            <CustomInput label="Division" name="DivName" register={register} errors={errors} />
                            <div className="col-md-6">
                                <Controller
                                    name="LocCode"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                            <label className="form-label">Location Name</label>
                                            <Autocomplete
                                                options={locations}
                                                getOptionLabel={(option) => option?.LocName || ""}
                                                isOptionEqualToValue={(option, value) => option?.LocCode === value?.LocCode}
                                                value={locations.find((loc) => loc.LocCode === field.value) || null}
                                                onChange={(event, newValue) => {
                                                    field.onChange(newValue?.LocCode || ""); // set LocCode
                                                    setSelectedLocation(newValue);           // optional state
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Type to search location"
                                                        className={errors?.LocCode ? "is-invalid" : ""}
                                                        error={!!errors?.LocCode}
                                                        helperText={errors?.LocCode?.message}
                                                    />
                                                )}
                                            />
                                        </>
                                    )}
                                />

                            </div>
                            <CustomInput label="Description" name="DivDesc" register={register} errors={errors} />

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
                                        <td>{a.DivName}</td>
                                        <td>{a.DivDesc}</td>
                                        <td>{a.LocName}</td>


                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to="">    <Button className="success" color="success" onClick={() => startEdit(a)}><FaPencilAlt /></Button></Link>

                                                <Button className="error" color="error" onClick={() => handleDelete(a.DivCode)}><MdDelete /></Button>
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