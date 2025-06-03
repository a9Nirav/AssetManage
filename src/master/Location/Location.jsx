// import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

// import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUpload } from "react-icons/fa6";
import useSearch from '../../features/useSearch';


import { LocationValidationSchema } from "../../features/validationSchemas";

// import { postData, getData } from "../../utils/apiClient.js";



import { fetchLocations, createLocation, updateLocation, deleteLocation } from "../../features/masterApi.js";

import { useDispatch, useSelector } from 'react-redux';
import usePagination from "../../features/usePagination"; // adjust path as needed




const Location = () => {






    const dispatch = useDispatch();
    // const { locations, loading } = useSelector(state => state.location);
    const locations = useSelector(state => state.master.locations || []);





    const { searchQuery, setSearchQuery, filteredData } = useSearch(locations);
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
        setEditId(loc.LocCode);
        setValue("LocName", loc.LocName);
        setValue("LocDesc", loc.LocDesc);
        console.log("hello")
    };
    console.log(editId)






    const {
        currentPage,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange,
        paginatedData,
        totalPages
    } = usePagination(filteredData, 5);





    const onSubmit = async (data) => {
        try {
            let response;
            if (editId) {
                let response1 = await dispatch(updateLocation({ locCode: editId, data })).unwrap();
                toast.success(response1?.ErrorDescription || "Location Update");

            } else {
                response = await dispatch(createLocation(data)).unwrap();
                toast.success(response?.ErrorDescription || "Location added successfully!");
                console.log(response)

            }

            reset();         // Clear the form
            setEditId(null); // Exit edit mode
            dispatch(fetchLocations()); // Refresh list
        } catch (error) {
            console.error("Submission error:", error);  // Debugging aid
            toast.error(error);

        }
    };




    // const handleDelete = async (locCode) => {
    //     const locationToDelete = locations.find(loc => loc.LocCode === locCode);
    //     console.log(locationToDelete)
    //     console.log(locCode)

    //     if (!locationToDelete) {
    //         toast.error("Location not found.");
    //         return;
    //     }

    //     if (window.confirm(`Are you sure you want to delete this location? ${locationToDelete.LocName}` )) {
    //         try {
    //             const response = await dispatch(deleteLocation({
    //                 locCode,
    //                 data: {
    //                     LocName: locationToDelete.LocName ,
    //                     LocDesc: locationToDelete.LocDesc 
    //                 }
    //             })).unwrap();
            

    //             toast.success(response?.ErrorDescription || "Location Deleted");
    //             dispatch(fetchLocations());
                

    //         } catch (error) {
    //             toast.error(error);
    //             console.error("Delete error:", error);
    //         }
    //     }
    // };



const handleDelete = async (locCode) => {
  const locationToDelete = locations.find(loc => loc.LocCode === locCode);

  if (!locationToDelete) {
    toast.error("Location not found");
    return;
  }

  if (window.confirm("Are you sure you want to delete this location?")) {
    try {
      const response = await dispatch(deleteLocation({
        locCode,
        data: {
          LocName: locationToDelete.LocName || "TEST",
          LocDesc: locationToDelete.LocDesc || "TEST"
        }
      })).unwrap();

      toast.success(response?.ErrorDescription || "Location deleted successfully!");
      
      // Optional: Refresh from backend (good if data changes outside UI)
      dispatch(fetchLocations());
    } catch (error) {
      toast.error(error || "Delete failed");
      console.error("Delete error:", error);
    }
  }
};






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
                            <CustomInput label="Location" name="LocName" register={register} errors={errors} />
                            <CustomInput label="Description" name="LocDesc" register={register} errors={errors} />



                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-dark  mt-3">
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
                                <th>action</th>

                            </tr>
                        </thead>

                        <tbody>



                            {paginatedData.map((loc, index) => (
                                <tr key={loc.id || index}>
                                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                    <td>{loc.LocName}</td>
                                    <td>{loc.LocDesc}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="">
                                                <Button className="success" color="success" onClick={() => startEdit(loc)}><FaPencilAlt /></Button>
                                            </Link>
                                            <Button className="error" color="error" onClick={() => handleDelete(loc.LocCode)}><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}


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

export default Location