import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
// import CustomInput from "../../components/CustomInput/CustomInput";
import { toast, ToastContainer } from "react-toastify";
import useSearch from '../../features/useSearch';

import { GLValidationSchema } from "../../features/validationSchemas";


const GLMaster = () => {


    const divisions = [
        {
            id: 1,
            divisionName: "IT Department",
            location: "New York",
            description: "Responsible for managing the company's technology infrastructure and support."
        },
        {
            id: 2,
            divisionName: "Human Resources",
            location: "Los Angeles",
            description: "Handles recruitment, employee relations, and organizational development."
        },
        {
            id: 3,
            divisionName: "Finance",
            location: "Chicago",
            description: "Manages budgeting, financial planning, and accounting."
        },
        {
            id: 4,
            divisionName: "Marketing",
            location: "San Francisco",
            description: "Oversees branding, advertising, and market research strategies."
        },
        {
            id: 5,
            divisionName: "Operations",
            location: "Houston",
            description: "Ensures smooth execution of daily business processes."
        }
    ];

    const { searchQuery, setSearchQuery, filteredData } = useSearch(divisions);



    // form validation start
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(GLValidationSchema),
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        toast.success("Submit Data Success");
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


                            <div className="col-md-6 mb-3">
                                <label className="form-label">Location Name:</label>
                                <select
                                    className={`form-select form-control ${errors.GLType ? "is-invalid" : ""}`}
                                    {...register("GLType")}
                                    aria-label="Default select example"
                                >
                                    <option value="">Select a location</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Bangalore">Bangalore</option>
                                </select>
                                <div className="invalid-feedback">{`GL Type  ${errors.GLType?.message}`}</div>

                            </div>
                            <div className="col-md-6 mb-3">

                                <label className="form-label">Description:</label>
                                <textarea
                                    type="text"
                                    className={`form-select form-control ${errors.Description ? "is-invalid" : ""}`}
                                    {...register("Description")}

                                    placeholder="Enter your name"
                                />
                                <div className="invalid-feedback">{`Description ${errors.Description?.message}`}</div>

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
                                <th>Name</th>
                                <th>Description</th>
                                <th>Location </th>
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>

                            {
                                filteredData.length > 0 ? (filteredData.map((a, index) => (
                                    <tr key={a.id}>


                                        <td>{index + 1}</td>
                                        <td>{a.divisionName}</td>
                                        <td>{a.description}</td>
                                        <td>{a.location}</td>


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