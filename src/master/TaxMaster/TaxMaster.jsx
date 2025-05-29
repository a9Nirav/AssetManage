import React, { useEffect } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
import CustomInput from "../../components/CustomInput/CustomInput";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';

import { TaxValidationSchema } from "../../features/validationSchemas";
import { useDispatch, useSelector } from 'react-redux';
import { createTaxMaster, fetchTaxMaster } from '../../features/masterApi';

const TaxMaster = () => {

    const dispatch = useDispatch();
    const taxMasters = useSelector(state => state.master.Taxs || [])
    console.log(taxMasters)

     useEffect(() => {
            dispatch(fetchTaxMaster());
           
          }, [dispatch]);



  
    const { searchQuery, setSearchQuery, filteredData } = useSearch(taxMasters);



    // form validation start
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(TaxValidationSchema),
    });

    const onSubmit = async (data) => {

        await dispatch(createTaxMaster(data)).unwrap()

        toast.success("Submit Data Success");
    };


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
                                <th>Tax Name</th>
                                <th>Percentage</th>
                               
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                filteredData.length > 0 ? (filteredData.map((a, index) => (
                                    <tr key={a.rowNo}>


                                        <td>{index + 1}</td>
                                        <td>{a.taxName}</td>
                                        <td>{a.percentage}</td>
                                       


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

export default TaxMaster