import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CustomInput from "../../components/CustomInput/CustomInput";
import Pagination from '@mui/material/Pagination';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
// import CustomInput from "../../components/CustomInput/CustomInput";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';

import { useDispatch, useSelector } from 'react-redux';
import { createGLType, fetchGLType, updateGLType,deleteGLType } from "../../features/masterApi.js";
import { useState, useEffect } from "react";
import { GLValidationSchema } from "../../features/validationSchemas";
import usePagination from "../../features/usePagination";


const GLMaster = () => {
    const dispatch = useDispatch()
    const GLtypes = useSelector(state => state.master.GLTypes || []);
    console.log(GLtypes);


    const [editId, setEditId] = useState("");

    useEffect(() => {
        dispatch(fetchGLType());

    }, [dispatch]);



    const { searchQuery, setSearchQuery, filteredData } = useSearch(GLtypes);



    // form validation start
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(GLValidationSchema),
    });


    const startEdit = (a) => {
        setEditId(a.AccountCode);
        setValue("GL_Type", a.GLType);
        setValue("Account_Desc", a.AccountDescription);




    };

    console.log(editId)

    const onSubmit = async (data) => {
        try {
            if (editId) {
                let res1 = await dispatch(updateGLType({ AccountCode: editId, data })).unwrap();
                toast.success(res1.ErrorDetails.ErrorDescription)
            } else {
                let res = await dispatch(createGLType(data)).unwrap();
                console.log("Form Data:", data);
                toast.success(res?.ErrorDetails.ErrorDescription || "done");
            }
            dispatch(fetchGLType());
            reset();

        } catch (err) {

            toast.error("Failed to create division");
            console.error("Submit error:", err);
        }

    };


    const handleDelete = async (AccountCode) => {
      const GLTypeDelete = GLtypes.find(a => a.AccountCode === AccountCode);
    
      if (!GLTypeDelete) {
        toast.error("GLType not found");
        return;
      }
    
      if (window.confirm("Are you sure you want to delete this GL Type?")) {
        try {
          const response = await dispatch(deleteGLType({
            AccountCode,
            data: {
              GL_Type: GLTypeDelete.GL_Type || "TEST",
              Account_Desc: GLTypeDelete.Account_Desc || "TEST"
            }
          })).unwrap();
    
          toast.success(response?.ErrorDetails.ErrorDescription || "GLType deleted successfully!");
          
          // Optional: Refresh from backend (good if data changes outside UI)
          dispatch(fetchGLType());
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
                            {/* <CustomInput label="Account Code" name="AccountCode" register={register} errors={errors} /> */}

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
                                <th>GL Type</th>
                                <th>Account Code</th>
                                <th>Account Des </th>
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                paginatedData.length > 0 ? (paginatedData.map((a, index) => (
                                    <tr key={a.rowNo}>


                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                        <td>{a.GLType}</td>
                                        <td>{a.AccountCode}</td>
                                        <td>{a.AccountDescription}</td>


                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to="">    <Button className="success" color="success" onClick={() => startEdit(a)}><FaPencilAlt /></Button></Link>

                                                <Button className="error" color="error" onClick={() => handleDelete(a.AccountCode)}><MdDelete /></Button>
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

export default GLMaster;