import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useState, useEffect } from "react";

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
import { fetchLocations, createLocation, updateLocation,deleteLocation } from "../../features/masterApi.js";
import { useDispatch, useSelector } from 'react-redux';



const Location = () => {
    const dispatch = useDispatch();
    // const { locations, loading } = useSelector(state => state.location);
    const locations = useSelector(state => state.master.locations);

    // const [locations, setLocations] = useState([]);
    const [editId, setEditId] = useState("");

    useEffect(() => {
        dispatch(fetchLocations());

    }, [dispatch]);







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

    // Pre-fill form when editing
    const startEdit = (loc) => {
        setEditId(loc.locCode);
        setValue("Loc_Name", loc.locName);
        setValue("Loc_Desc", loc.locDesc);
        console.log("hello")


    };
    console.log(editId)









  const onSubmit = async (data) => {
  try {
    if (editId) {
      await dispatch(updateLocation({ locCode: editId, data })).unwrap();
      toast.success("Location updated successfully!");
    } else {
      await dispatch(createLocation(data)).unwrap();
      toast.success("Location added successfully!");
    }

    reset();         // Clear the form
    setEditId(null); // Exit edit mode
    dispatch(fetchLocations()); // Refresh list
  } catch (error) {
    console.error("Submission error:", error);  // Debugging aid
    toast.error("Operation failed");
  }
};


const handleDelete = async (locCode) => {
  if (window.confirm("Are you sure you want to delete this location?")) {
    try {
      await dispatch(deleteLocation(locCode)).unwrap();
      toast.success("Location deleted successfully!");
      dispatch(fetchLocations());
    } catch (errorMessage) {
      toast.error(errorMessage); // Show custom error from API
      console.error("Delete error:", errorMessage);
    }
  }
};


// const handleDelete = async (locCode) => {
//   if (window.confirm("Are you sure you want to delete this location?")) {
//     try {
//       await dispatch(deleteLocation(locCode)).unwrap();
//       toast.success("Location deleted successfully!");
//       dispatch(fetchLocations());
//     } catch (errorMessage) {
//       // ✅ This will show the API errorDescription in a toast
//       toast.error(errorMessage);
//     }
//   }
// };






 





    return (
        <>
            <ToastContainer />
            <div className='right-content w-100'>
                <div>

                </div>

                <div className="card shadow border-0 w-100  p-4 res-col ">
                    <div className="d-flex justify-content-between algin-content-center align-items-center">


                        <h5 className='mb-0'>+ Location</h5>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>
                    </div>

                    <hr />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <CustomInput label="Location" name="Loc_Name" register={register} errors={errors} />
                            <CustomInput label="Description" name="Loc_Desc" register={register} errors={errors} />



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
                                    <td>{loc.locName}</td>
                                    <td>{loc.locDesc}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="">
                                                <Button className="success" color="success" onClick={() => startEdit(loc)}><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error" onClick={() => handleDelete(loc.locCode)}><MdDelete /></Button>
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