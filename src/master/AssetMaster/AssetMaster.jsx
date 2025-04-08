import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AssetMasterValidationSchema } from "../../features/validationSchemas";
import CustomInput from "../../components/CustomInput/CustomInput"; // Import Reusable Component
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Eye Icons from MUI


import { FaUpload } from "react-icons/fa6";

const AssetMaster = () => {







    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(AssetMasterValidationSchema),

    });

    const onSubmit = (data) => {

        console.log("Form Data:", data);
        toast.success("Submit Data Success");
    };

    return (
        <>
            <ToastContainer />
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
                    <h5 className="mb-0 d-flex align-items-center">Asset  Master</h5>

                    <div className="">
                        <Link to="/Master/AssetMasterTable">
                            <Button variant="contained" color="success" className="phone-btn">View</Button>
                        </Link>

                        <Button className="ms-2 phone-btn" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>


                    </div>
                </div>

                {/* Form Section */}
                <div className="card shadow border-0 p-4 mt-3">
                    <h2 className="mb-4">+ Add Asset</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <CustomInput label="Asset" name="AssetName" register={register} errors={errors} />
                            {/* <CustomInput label="Email" name="email" type="email" register={register} errors={errors} />
              <CustomInput label="Phone" name="phone" type="number" register={register} errors={errors} />
              <CustomInput label="manufacturer" name="jobTitle" register={register} errors={errors} /> */}

                            {/* Location Dropdown */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Asset Type:<sup className="text-red-500">*</sup></label>
                                <select
                                    className={`form-select form-control ${errors.AssetType ? "is-invalid" : ""}`}
                                    {...register("AssetType")}
                                >
                                    <option value="">Select a location</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Bangalore">Bangalore</option>
                                </select>
                                <div className="invalid-feedback">{`Asset Type ${errors.AssetType?.message}`}</div>
                            </div>



                            <CustomInput label="manufacturer" name="manufacturer" register={register} errors={errors} />
                            <CustomInput label="Price Rs." name="Price" register={register} errors={errors} />

                            {/* warrenty */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">warrenty Period(Years/months):<sup className="text-red-500">*</sup></label>

                                <div className="row">



                                    <div className="col-md-6 col-6">
                                        <select
                                            className={`form-select form-control`}

                                            aria-label="Default select example"
                                        >
                                            <option value="">Select Years</option>
                                            <option value="0">0 </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>


                                        </select>

                                    </div>

                                    <div className="col-md-6 col-6">
                                        <select
                                            className={`form-select form-control`}

                                            aria-label="Default select example"
                                        >
                                            <option value="">Select Month</option>
                                            <option value="0">0 </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>

                                        </select>

                                    </div>

                                </div>


                            </div>


                            {/* life preiod  */}

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Life Period:<sup className="text-red-500">*</sup></label>

                                <div className="row">



                                    <div className="col-md-6 col-6">
                                        <select
                                            className={`form-select form-control`}

                                            aria-label="Default select example"
                                        >
                                            <option value="">Select Years</option>
                                            <option value="0">0 </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>


                                        </select>

                                    </div>

                                    <div className="col-md-6 col-6">
                                        <select
                                            className={`form-select form-control`}

                                            aria-label="Default select example"
                                        >
                                            <option value="">Select Month</option>
                                            <option value="0">0 </option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>

                                        </select>

                                    </div>

                                </div>


                            </div>



                            {/* check button  */}

                            <div className="col-md-12 mb-3  d-flex justify-content-around ">

                                <div className="">
                                    <input className="form-label me-2" {...register("assetType")} type="radio" name='assetType' value="Consumable" id="Consumable"

                                    />
                                    <label className="mb-0 me-2" for="Consumable">
                                        Consumable
                                    </label>
                                </div>


                                <div className="">



                                    <input className="form-label me-2" {...register("assetType")} type="radio" name='assetType' value="FixedAsset" id="FixedAsset" />
                                    <label className="mb-0 me-2" for="FixedAsset">
                                        FixedAsset
                                    </label>
                                </div>


                                <div className="">



                                    <input className="form-label me-2 " {...register("assetType")} type="radio" name='assetType' value="GroupAsset" id="GroupAsset" />
                                    <label className="mb-0 me-2" for="GroupAsset">
                                        GroupAsset
                                    </label>
                                </div>

                                {/* Error message */}
                                {errors.assetType && (
                                    <div className="invalid-feedback d-block">
                                        {errors.assetType.message}
                                    </div>
                                )}






                            </div>


                            {/* vendors  */}

                            <div className="col-md-12 mb-3 align-items-end ">
                                <label className="form-label d-block">Vendor:<sup className="text-red-500">*</sup></label>


                                <div className="d-block">


                                    <input className=" me-2" type="checkbox" name='assetType1' value="Consumable" id="Consumable"

                                    />
                                    <label className="mb-0 me-2" for="Consumable">
                                        XYZ
                                    </label>

                                    <input className=" me-2" type="checkbox" name='assetType2' value="FixedAsset" id="FixedAsset" />
                                    <label className="mb-0 me-2" for="FixedAsset">
                                        ABC
                                    </label>

                                    <input className=" me-2 " type="checkbox" name='assetType3' value="GroupAsset" id="GroupAsset" />
                                    <label className="mb-0 " for="GroupAsset">
                                        PQR
                                    </label>



                                </div>

                            </div>


                            {/* maintaiance vendor  */}

                            <div className="col-md-12 mb-3 align-items-end ">
                                <label className="form-label d-block">Maintenance Vendor:<sup className="text-red-500">*</sup></label>


                                <div className="d-block">


                                    <input className=" me-2" type="checkbox" name='assetType1' value="Consumable" id="Consumable"

                                    />
                                    <label className="mb-0 me-2" for="Consumable">
                                        ABC
                                    </label>

                                    <input className=" me-2" type="checkbox" name='assetType2' value="FixedAsset" id="FixedAsset" />
                                    <label className="mb-0 me-2" for="FixedAsset">
                                        PQR
                                    </label>

                                    <input className=" me-2 " type="checkbox" name='assetType3' value="GroupAsset" id="GroupAsset" />
                                    <label className="mb-0 " for="GroupAsset">
                                        XYZ
                                    </label>



                                </div>





                            </div>




                            {/* Division Dropdown */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">GL Type:<sup className="text-red-500">*</sup></label>
                                <select className={`form-select form-control ${errors.GLType ? "is-invalid" : ""}`} {...register("GLType")}>
                                    <option value="">Select a division</option>
                                    <option value="1">Software Division</option>
                                    <option value="2">Hardware Division</option>
                                </select>
                                <div className="invalid-feedback">{`GL Type${errors.GLType?.message}`}</div>
                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label">Description:<sup className="text-red-500">*</sup></label>
                                <textarea
                                    type="text"
                                    className={`form-select form-control ${errors.Description ? "is-invalid" : ""}`}
                                    {...register("Description")}

                                    placeholder="Enter your name"
                                />
                                <div className="invalid-feedback">{`Description ${errors.Description?.message}`}</div>

                            </div>






                        </div>

                        <button type="submit" className="btn btn-dark w-25 mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};


export default AssetMaster;