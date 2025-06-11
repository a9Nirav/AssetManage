import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import { vendorValidationSchema } from "../../features/validationSchemas";
import CustomInput from "../../components/CustomInput/CustomInput"; // Import Reusable Component



import { FaUpload } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { createVendor } from "../../features/masterApi.js"
import { setEditVendor, setViewVendor } from "../../features/masterSlice.js";


const VendorMaster = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    // const [isResetting, setIsResetting] = useState(false);
    // const editVendor = location.state;



    const editVendor = useSelector(state => state.master.editVendor)
    // console.log(JSON.stringify(editVendor))

    const ViewVendor = useSelector(state => state.master.viewVendor)
    // console.log(JSON.stringify(ViewVendor))



    const [isDisabled, setIsDisabled] = useState(false);

    // const [editVendor, setEditVendor] = useState(location.state || null);
    // console.log(editVendor)
    // const [isEditMode, setIsEditMode] = useState(!!location.state)

    const [view, setView] = useState(0)

    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(vendorValidationSchema),


    });


    useEffect(() => {
        if (ViewVendor) {
            console.log("its work")
            setValue("Vdr_Name", ViewVendor.VdrName);
            setValue("Vdr_Desc", ViewVendor.VdrDesc);
            setValue("Cntct_Per", ViewVendor.CntctPerson);
            setValue("Phone_No", ViewVendor.PhoneNo);
            setValue("Email", ViewVendor.Email);
            setValue("Fax_No", ViewVendor.FaxNo);
            setValue("Web_URL", ViewVendor.WebURL);
            setValue("Country", ViewVendor.Country);
            setValue("Addr1", ViewVendor.Addr1);
            setValue("Addr2", ViewVendor.Addr2);
            setValue("Addr3", ViewVendor.Addr3);
            setValue("City", ViewVendor.City);
            setValue("PosCode", ViewVendor.PosCode);
            setValue("State", ViewVendor.State);
            setValue("MtnVndr", ViewVendor.MtnVndr);
            setValue("Supplier", ViewVendor.Supplier);



        }
        else {
            console.log("not getting vendor data");
            reset();

        }

    }, [ViewVendor])




    useEffect(() => {

        if (editVendor) {
            console.log("edit vendors", editVendor)
            console.log(editVendor.VdrName)
            setValue("Vdr_Name", editVendor.VdrName);
            setValue("Vdr_Desc", editVendor.VdrDesc);
            setValue("Cntct_Per", editVendor.CntctPerson);
            setValue("Phone_No", editVendor.PhoneNo);
            setValue("Email", editVendor.Email);
            setValue("Fax_No", editVendor.FaxNo);
            setValue("Web_URL", editVendor.WebURL);
            setValue("Country", editVendor.Country);
            setValue("Addr1", editVendor.Addr1);
            setValue("Addr2", editVendor.Addr2);
            setValue("Addr3", editVendor.Addr3);
            setValue("City", editVendor.City);
            setValue("PosCode", editVendor.PosCode);
            setValue("State", editVendor.State);
            setValue("MtnVndr", editVendor.MtnVndr);
            setValue("Supplier", editVendor.Supplier);

        }

    }, [editVendor])




    const onSubmit = async (data) => {
        try {
            if (ViewVendor) {
                toast.success("only view");
                dispatch(setViewVendor(null));
                return

            }

            const response = await dispatch(createVendor(data)).unwrap();
            if (response?.ErrorDetails?.ErrorCode === "200") {
                toast.success(response?.ErrorDetails?.ErrorDescription || "Vendor added successfully!");
                console.log("end")
                dispatch(setEditVendor(null));
                setEditVendor(null)
                reset()
            } else {
                toast.error(response?.ErrorDetails?.ErrorDescription || "Failed to add vendor");
            }


        } catch (error) {
            toast.error("Something went wrong. Try again!");
            console.error("Submit error:", error);
        }
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
                            <CustomInput label="Vendor Name" name="Vdr_Name" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Contact Person" name="Cntct_Per" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Phone" name="Phone_No" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Email" name="Email" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Fax" name="Fax_No" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Website" name="Web_URL" register={register} errors={errors} disabled={isDisabled} />


                            <CustomInput label="Country" name="Country" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Address 1" name="Addr1" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="City" name="City" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Address 2" name="Addr2" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="PostalCode" name="PosCode" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="Address 3" name="Addr3" register={register} errors={errors} disabled={isDisabled} />
                            <CustomInput label="State" name="State" register={register} errors={errors} disabled={isDisabled} />

                            <div className="col-md-6 mb-3">

                                <label className="form-label">Description:</label>
                                <textarea
                                    type="text"
                                    className={` form-control ${errors.Vdr_Desc ? "is-invalid" : ""}`}
                                    {...register("Vdr_Desc")}

                                    placeholder="Enter your name"
                                    disabled={isDisabled}
                                />
                                <div className="invalid-feedback">{`Description ${errors.Vdr_Desc?.message}`}</div>

                            </div>

                            <div className="col-md-6 mb-3">
                                <input className={` me-2 ${errors.MtnVndr ? "is-invalid" : ""}`} type="checkbox" name='MtnVndr' id="MtnVendor"
                                    {...register("MtnVndr")} disabled={isDisabled}
                                />
                                <label className="mb-0 me-2" for="MtnVendor">
                                    MtnVendor
                                </label>
                                <div className="invalid-feedback">{`check ${errors.MtnVndr?.message}`}</div>





                                <input className={` me-2 ${errors.Supplier ? "is-invalid" : ""}`} type="checkbox" name='Supplier' id="supplier"
                                    {...register("Supplier")} disabled={isDisabled}
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