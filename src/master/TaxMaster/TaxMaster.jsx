import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'
import { useState, useEffect } from 'react';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
import CustomInput from "../../components/CustomInput/CustomInput";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';
import Pagination from '@mui/material/Pagination';

import { TaxValidationSchema } from "../../features/validationSchemas";
import { useDispatch, useSelector } from 'react-redux';
import { createTaxMaster, fetchTaxMaster, updateTaxMaster, deleteTaxMaster } from '../../features/masterApi';
import usePagination from "../../features/usePagination";

const TaxMaster = () => {

    const dispatch = useDispatch();
    const taxMasters = useSelector(state => state.master.Taxs || [])
    console.log(taxMasters)
    const [editId, setEditId] = useState("");


    useEffect(() => {
        dispatch(fetchTaxMaster());


    }, [dispatch]);




    const { searchQuery, setSearchQuery, filteredData } = useSearch(taxMasters);

    const startEdit = (a) => {
        setEditId(a.Taxid);
        setValue("Taxname", a.TaxName);
        setValue("Percentage",a.Percentage);

    };

    console.log(editId)

    // form validation start
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(TaxValidationSchema),
    });

    const onSubmit = async (data) => {

        try {
            if (editId) {
                let res = await dispatch(updateTaxMaster({ Taxid: editId, data })).unwrap();
                toast.success(res.ErrorDetails.ErrorDescription)


            } else {
                let res1 = await dispatch(createTaxMaster(data)).unwrap()
                toast.success(res1?.ErrorDetails?.ErrorDescription || "Tax added successfully!");
                console.log("no")
            }

        } catch (err) {
            toast.error("Failed to create Tax Master");
            console.error("Submit error:", err);

        }




        dispatch(fetchTaxMaster());
        reset();
    };



    const handleDelete = async (id) => {
        const TaxMasterDelete = taxMasters.find(e => e.Taxid === id);
        console.log(TaxMasterDelete.TaxName)



        if (!TaxMasterDelete) {
            toast.error("Location not found");
            return;
        }



        if (window.confirm(`Are you sure you want to delete this Division? ${TaxMasterDelete.Taxid}`)) {
            try {
                const response = await dispatch(deleteTaxMaster({
                    Taxid:id,
                    data: {
                        Taxname: TaxMasterDelete.TaxName,
                        Percentage: String(TaxMasterDelete.Percentage),
                    }


                })).unwrap();
                console.log(response);

                toast.success(response?.ErrorDetails.ErrorDescription || "Tax deleted successfully!");

                // Optional: Refresh from backend (good if data changes outside UI)
                dispatch(fetchTaxMaster());
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


                        <h5 className='mb-0'>+ ADD TaxMaster</h5>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>
                    </div>


                    <hr />

                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">


                            <CustomInput label="Tax Name" name="Taxname" register={register} errors={errors} />
                            <CustomInput label="Percentage (%)" name="Percentage" register={register} errors={errors} />




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
                                <th>Tax Name</th>
                                <th>Percentage</th>

                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                paginatedData.length > 0 ? (paginatedData.map((a, index) => (
                                    <tr key={a.rowNo}>


                                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                        <td>{a.TaxName}</td>
                                        <td>{a.Percentage}</td>



                                        <td>
                                            <div className="actions d-flex align-items-center">
                                                <Link to="">    <Button className="success" color="success" onClick={() => startEdit(a)}><FaPencilAlt /></Button></Link>

                                                <Button className="error" color="error" onClick={() => handleDelete(a.Taxid)}><MdDelete /></Button>
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

export default TaxMaster