import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { vendorValidationSchema } from "../../features/validationSchemas";
import CustomInput from "../../components/CustomInput/CustomInput"; // Import Reusable Component



import { FaUpload } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { createVendor } from "../../features/masterApi.js"


const VendorMaster = () => {
    const dispatch = useDispatch();
    // const [showLoginFields, setShowLoginFields] = useState(false);
    // const handleCheckboxChange = () => setShowLoginFields((prev) => !prev);







 

    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        formState: { errors },
      
    } = useForm({
        resolver: yupResolver(vendorValidationSchema),
//          defaultValues: {
//     MtnVendor: false,
//     supplier: false
//   }

    });

    const onSubmit = async (data) => {
        
        await dispatch(createVendor(data)).unwrap();
        console.log("Form Data:", data);
        toast.success("Submit Data Success");

    };



    return (
        <>
            <ToastContainer />
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
                    <h5 className="mb-0 d-flex align-items-center">Vendor Master</h5>

                    <div className="">
                        <Link to="/Master/VendorMasterTable">
                            <Button variant="contained" color="success">View</Button>
                        </Link>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>


                    </div>
                </div>

                {/* Form Section */}
                <div className="card shadow border-0 p-4 mt-3">
                    <h2 className="mb-4">+ Add Vendor</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <CustomInput label="Vendor Name" name="Vdr_Name" register={register} errors={errors} />
                            <CustomInput label="Contact Person" name="Cntct_Per" register={register} errors={errors} />
                            <CustomInput label="Phone" name="Phone_No" register={register} errors={errors} />
                            <CustomInput label="Email" name="Email" register={register} errors={errors} />
                            <CustomInput label="Fax" name="Fax_No" register={register} errors={errors} />
                            <CustomInput label="Website" name="Web_URL" register={register} errors={errors} />


                            <CustomInput label="Country" name="Country" register={register} errors={errors} />
                            <CustomInput label="Address 1" name="Addr1" register={register} errors={errors} />
                            <CustomInput label="City" name="City" register={register} errors={errors} />
                            <CustomInput label="Address 2" name="Addr2" register={register} errors={errors} />
                            <CustomInput label="PostalCode" name="PosCode" register={register} errors={errors} />
                            <CustomInput label="Address 3" name="Addr3" register={register} errors={errors} />
                            <CustomInput label="State" name="State" register={register} errors={errors} />

                            <div className="col-md-6 mb-3">

                                <label className="form-label">Description:</label>
                                <textarea
                                    type="text"
                                    className={` form-control ${errors.Vdr_Desc ? "is-invalid" : ""}`}
                                    {...register("Vdr_Desc")}

                                    placeholder="Enter your name"
                                />
                                <div className="invalid-feedback">{`Description ${errors.Vdr_Desc?.message}`}</div>

                            </div>

                             <div className="col-md-6 mb-3">
                                <input className={` me-2 ${errors.MtnVndr ? "is-invalid" : ""}`} type="checkbox" name='MtnVndr'  id="MtnVendor"
                                    {...register("MtnVndr")}
                                />
                                <label className="mb-0 me-2" for="MtnVendor">
                                    MtnVendor
                                </label>
                                <div className="invalid-feedback">{`check ${errors.MtnVndr?.message}`}</div>





                                <input className={` me-2 ${errors.Supplier ? "is-invalid" : ""}`} type="checkbox" name='Supplier'  id="supplier"
                                    {...register("Supplier")}
                                />
                                <label className="mb-0 me-2" for="supplier">
                                  supplier
                                </label>
                                <div className="invalid-feedback">{`check ${errors.Supplier?.message}`}</div>

                                
                            </div> 

                        </div>

                        <button type="submit" className="btn btn-dark w-25 mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};


export default VendorMaster;