import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useState,useEffect } from "react";

import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUpload } from "react-icons/fa6";

import { LocationValidationSchema } from "../../features/validationSchemas";
import { postData, getData } from "../../utils/apiClient.js";


const Location = () => {


    const [locations, setLocations] = useState([]);
    const [editId, setEditId] = useState(null);

    // Pre-fill form when editing
const startEdit = (loc) => {
    setEditId(loc.id);
    setValue("LocName", loc.LocName); // from react-hook-form
    setValue("LocDesc", loc.LocDesc);
  };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getData('location'); // Replace with your actual endpoint
                setLocations(response);
            } catch (error) {
                toast.error("Failed to fetch locations");
            }
        };

        fetchLocations();
    }, []);

    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
      } = useForm({
        resolver: yupResolver(LocationValidationSchema),
      });




    // const onSubmit = async (data) => {
    //     try {
    //         const response = await postData('location', data); // 'add-location' is your API endpoint
    //         console.log("API Location:", response);
    //         toast.success("Location added successfully!");
    //     } catch (error) {
    //         toast.error("Failed to add location.");
    //     }
    // };

    const onSubmit = async (data) => {
        try {
          if (editId) {
            await putData(`location/${editId}`, data); // endpoint with ID
            toast.success("Location updated successfully!");
          } else {
            await postData("location", data);
            toast.success("Location added successfully!");
          }
          setEditId(null);
          reset(); // clear form
          fetchLocations(); // refresh list
        } catch (error) {
          toast.error("Operation failed");
        }
      };

      

    return (
        <>
            <ToastContainer />
            <div className='right-content w-100'>

                <div className="card shadow border-0 w-100  p-4 res-col ">
                    <div className="d-flex justify-content-between algin-content-center align-items-center">


                        <h5 className='mb-0'>+ Location</h5>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>
                    </div>

                    <hr />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <CustomInput label="Location" name="LocName" register={register} errors={errors} />
                            <CustomInput label="Description" name="LocDesc" register={register} errors={errors} />

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



                            {locations.map((loc, index) => (
                                <tr key={loc.id || index}>
                                    <td>{index + 1}</td>
                                    <td>{loc.LocName}</td>
                                    <td>{loc.LocDesc}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="">
                                                <Button className="success" color="success" onClick={() => startEdit(loc)}><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}


                        </tbody>

                    </table>

                </div>




            </div>
        </>
    )
}

export default Location