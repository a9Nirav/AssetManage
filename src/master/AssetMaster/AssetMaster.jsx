import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, TextField, Button, Chip, Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendor, fetchGLType } from "../../features/masterApi.js"
import { AssetMasterValidationSchema } from "../../features/validationSchemas";
import CustomInput from "../../components/CustomInput/CustomInput"; // Import Reusable Component
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Eye Icons from MUI


import { FaUpload } from "react-icons/fa6";

const AssetMaster = () => {
    const dispatch = useDispatch();
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [maintaianceVendor, setmaintaianceVendor] = useState(null)
    const [addedVendors, setAddedVendors] = useState([]);
    const [maintaianceVendorList, setmaintaianceVendorList] = useState([])
    const [SelectedGLType, setSelectedGLType] = useState(null);
    console.log(maintaianceVendorList)


    const Vendor = useSelector(state => state.master.Vendors || [])
    const GLtypes = useSelector(state => state.master.GLTypes || []);


    const handleAddVendor = () => {
        if (selectedVendor && !addedVendors.some(v => v.VdrCode === selectedVendor.VdrCode)) {
            setAddedVendors((prev) => [...prev, selectedVendor])
        } else {
            toast.warn("Already Selected")
        }

    }

    const addMaintanceVendor = () => {
        if (maintaianceVendor && !maintaianceVendorList.some(v => v.a === maintaianceVendor.VdrCode)) {
            setmaintaianceVendorList((prev) => [...prev, { a: maintaianceVendor.VdrCode, b: maintaianceVendor.VdrName }])
        } else {
            toast.warn("Already Selected")
        }
    }

    const handleRemoveVendor = (code) => {
        setAddedVendors((prev) => prev.filter((v) => v.VdrCode !== code));
    };


    useEffect(() => {
        dispatch(fetchVendor())
        dispatch(fetchGLType());
    }, [dispatch])






    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(AssetMasterValidationSchema),

    });

    const onSubmit = (data) => {

        const finalData = {
            ...data,
            maintaianceVendorList,
            addedVendors: addedVendors.map(v => v.VdrCode)
        }

        console.log("Form Data:", finalData);
        toast.success("Submit Data Success");
    };

    return (
        <>
            <ToastContainer />
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
                    <h5 className="mb-0 d-flex align-items-center">Asset  Allocation</h5>

                    <div className="">
                        <Link to="">
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
                                            className={`form-select form-control ${errors.warrentyYear ? "is-invalid" : ""} `}
                                            {...register("warrentyYear")}

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
                                        <div className="invalid-feedback">{`Yaer ${errors.warrentyYear?.message}`}</div>

                                    </div>

                                    <div className="col-md-6 col-6">
                                        <select
                                            className={`form-select form-control ${errors.warrentyMonth ? "is-invalid" : ""}`}
                                            {...register("warrentyMonth")}
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

                                        <div className="invalid-feedback">{`month ${errors.warrentyMonth?.message}`}</div>

                                    </div>

                                </div>


                            </div>


                            {/* life preiod  */}

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Life Period:<sup className="text-red-500">*</sup></label>

                                <div className="row">



                                    <div className="col-md-6 col-6">
                                        <select
                                            className={`form-select form-control ${errors.periodYear ? "is-invalid" : ""}`}
                                            {...register("periodYear")}
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
                                        <div className="invalid-feedback">{`Period ${errors.periodYear?.message}`}</div>

                                    </div>

                                    <div className="col-md-6 col-6">
                                        <select
                                            className={`form-select form-control ${errors.periodMonth ? "is-invalid" : ""}`}
                                            {...register("periodMonth")}
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
                                        <div className="invalid-feedback">{`month ${errors.periodMonth?.message}`}</div>

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

                            {/* <div className="col-md-12 mb-3 align-items-end ">
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

                            </div> */}


                            <div className="col-md-6 mb-3">
                                <Controller
                                    name=""
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                            <label className="form-label">Vendor Name:<sup className="text-red-500">*</sup></label>
                                            <div className="d-flex">
                                                <Autocomplete
                                                    className="w-100"
                                                    options={Vendor}
                                                    getOptionLabel={(option) => option?.VdrName || ""}
                                                    isOptionEqualToValue={(option, value) => option?.VdrCode === value?.VdrCode}
                                                    value={Vendor.find((loc) => loc.VdrCode === field.value) || null}
                                                    onChange={(e, newValue) => setSelectedVendor(newValue)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Type to search Vendors"


                                                        />
                                                    )}
                                                />
                                                <button type="button" onClick={handleAddVendor} className="btn btn-dark">
                                                    Add
                                                </button>



                                            </div>
                                            {/* List of Added Vendors */}
                                            <Box className="mt-3" sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                {addedVendors.map((vendor) => (
                                                    <Chip
                                                        key={vendor.VdrCode || index}
                                                        label={vendor.VdrName}
                                                        onDelete={() => handleRemoveVendor(vendor.VdrCode)}
                                                        className=""
                                                    />
                                                ))}
                                            </Box>

                                        </>
                                    )}
                                />


                            </div>









                            {/* maintaiance vendor  */}

                            <div className="col-md-6 mb-3">
                                <Controller
                                    name=""
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                            <label className="form-label">Vendor Name:<sup className="text-red-500">*</sup></label>
                                            <div className="d-flex">
                                                <Autocomplete
                                                    className="w-100"
                                                    options={Vendor}
                                                    getOptionLabel={(option) => option?.VdrName || ""}
                                                    isOptionEqualToValue={(option, value) => option?.VdrCode === value?.VdrCode}
                                                    value={Vendor.find((loc) => loc.VdrCode === field.value) || null}
                                                    onChange={(e, newValue) => setmaintaianceVendor(newValue)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Type to search Vendors"


                                                        />
                                                    )}
                                                />
                                                <button type="button" onClick={addMaintanceVendor} className="btn btn-dark">
                                                    Add
                                                </button>



                                            </div>
                                            {/* List of Added Vendors */}
                                            <Box className="mt-3" sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                {maintaianceVendorList.map((vendor) => (
                                                    <Chip
                                                        key={vendor.a}
                                                        label={vendor.b}
                                                        onDelete={() => handleRemoveVendor(vendor.a)}
                                                        className=""
                                                    />
                                                ))}
                                            </Box>

                                        </>
                                    )}
                                />


                            </div>









                            {/* gl type  */}
                            <div className="col-md-6 mb-3">
                                <Controller
                                    name="GLType"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                            <label className="form-label">Location Name</label>
                                            <Autocomplete
                                                options={GLtypes}
                                                getOptionLabel={(option) => option?.AccountDescription || ""}
                                                isOptionEqualToValue={(option, value) => option?.AccountDescription === value?.AccountDescription}
                                                value={GLtypes.find((e) => e.AccountDescription === field.value) || null}
                                                onChange={(event, newValue) => {
                                                    field.onChange(newValue?.AccountDescription || "");
                                                    setSelectedGLType(newValue);
                                                }}
                                                renderInput={(params) => (
                                                    <>
                                                        <TextField
                                                            {...params}
                                                            placeholder="Type to search GL Type"
                                                            className={`form-control ${errors?.GLType ? "is-invalid" : ""}`}
                                                        />
                                                        {errors?.GLType && (
                                                            <div className="invalid-feedback d-block">
                                                                {`GL Type ${errors?.GLType.message}`}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            />
                                        </>
                                    )}
                                />

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