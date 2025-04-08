import React from 'react'
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

import { DivisionValidationSchema } from "../../features/validationSchemas";

const Division = () => {
    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(DivisionValidationSchema),

    });

    const onSubmit = (data) => {

        console.log("Form Data:", data);
        toast.success("Submit Data Success");
    };
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
                            <CustomInput label="Division" name="abc" register={register} errors={errors} />
                            <CustomInput label="Description" name="Description" register={register} errors={errors} />

                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-dark w-25 mt-3">
                            Submit
                        </button>
                    </form>


                </div>


                <div className="card shadow border-0 w-100  p-4 res-col">
                    <table className="table table-bordered table-striped v-align">
                        <thead className="thead-dark">
                            <tr>

                                <th style={{ width: "10px" }}>No.</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>


                            <tr>


                                <td>1	</td>
                                <td>Mumbai</td>
                                <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, dolore?</td>


                                <td>
                                    <div className="actions d-flex align-items-center">
                                        {/* <Link to="/">
                       
                            <Button className="secondary" color="secondary"><FaEye /></Button>
                     
                    </Link> */}
                                        <Link to="">    <Button className="success" color="success"><FaPencilAlt /></Button></Link>

                                        <Button className="error" color="error"><MdDelete /></Button>
                                    </div>
                                </td>
                            </tr>






                        </tbody>

                    </table>

                </div>




            </div>
        </>
    )
}

export default Division