import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CompnayValidationSchema } from "../../features/validationSchemas";
import CustomInput from "../../components/CustomInput/CustomInput"; // Import Reusable Component
import { FaUpload } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";






const CompanyMaster = () => {
    const [selectDate, setSelectDate] = useState("");
    const [tableData, settableData] = useState([])


    const handleAddDate = () => {

        if (!selectDate) return; // Prevent adding empty dates

        const CurrentDate = new Date(selectDate);
        const year1 = CurrentDate.toLocaleDateString("en-GB");
        // Set the second year by adding one year and subtracting one day
        const nextYearDate = new Date(CurrentDate);
        nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
        nextYearDate.setDate(nextYearDate.getDate() - 1);

        const year2 = nextYearDate.toLocaleDateString("en-GB");

        settableData((prevData) => [...prevData, { year1, year2 }]);
        setSelectDate(""); // Reset input field






    }


    // React Hook Form Setup
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(CompnayValidationSchema),

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
                    <h5 className="mb-0 d-flex align-items-center">Company Master</h5>

                    <div className="">
                        <Link to="/Master/CompanyMasterTable">
                            <Button variant="contained" color="success">View</Button>
                        </Link>

                        <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
                            import</Button>


                    </div>
                </div>

                {/* Form Section */}
                <div className="card shadow border-0 p-4 mt-3">
                    <h2 className="mb-4">+ Add Company</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <CustomInput label="Company Name" name="companyName" register={register} errors={errors} />
                            <CustomInput label="Contact Person" name="ContactPerson" register={register} errors={errors} />
                            <CustomInput label="Phone" name="Phone" register={register} errors={errors} />
                            <CustomInput label="Email" name="Email" register={register} errors={errors} />
                            <CustomInput label="Fax" name="fax" register={register} errors={errors} />
                            <CustomInput label="Website" name="website" register={register} errors={errors} />
                            <CustomInput label="Account Unit" name="AccountUnit" register={register} errors={errors} />
                            <CustomInput label="Visibility Pin" name="VisibilityPin" register={register} errors={errors} />
                            <CustomInput label="Country" name="Country" register={register} errors={errors} />
                            <CustomInput label="Address 1" name="Address1" register={register} errors={errors} />
                            <CustomInput label="City" name="City" register={register} errors={errors} />
                            <CustomInput label="Address2" name="Address2" register={register} errors={errors} />
                            <CustomInput label="PostalCode" name="PostalCode" register={register} errors={errors} />
                            <CustomInput label="Address3" name="Address3" register={register} errors={errors} />
                            <CustomInput label="State" name="State" register={register} errors={errors} />
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Logo: <sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                    {...register("image")}
                                    accept="image/*" // Only allows images
                                />
                                <div className="invalid-feedback">{errors.image?.message}</div>
                            </div>

                            <CustomInput label="Signing Authority" name="SigningAuthority" register={register} errors={errors} />

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Shipping Address:</label>
                                <textarea
                                    type="text"
                                    className={`form-control ${errors.ShippingAddress ? "is-invalid" : ""}`}
                                    {...register("ShippingAddress")}
                                    placeholder="Enter Dsecription"
                                />
                                <div className="invalid-feedback">{errors.ShippingAddress?.message}</div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">BillingAddress Address:</label>
                                <textarea
                                    type="text"
                                    className={`form-control ${errors.BillingAddress ? "is-invalid" : ""}`}
                                    {...register("BillingAddress")}
                                    placeholder="Enter Dsecription"
                                />
                                <div className="invalid-feedback">{errors.BillingAddress?.message}</div>
                            </div>


                            <div className="col-md-6 mb-3">

                                <label className="form-label"> For Income Tax:</label>
                                <br />
                                <input
                                    type="date"
                                    className="form-control d-inline"
                                    onChange={(e) => setSelectDate(e.target.value)}
                                    value={selectDate}
                                    required

                                    style={{ width: "200px" }}
                                />


                                <div className="btn  ml-4 btn" onClick={handleAddDate}>
                                    ADD
                                </div>

                                <table className="table table-bordered mt-3">
                                    <thead className="thead-dark p-0">
                                        <tr>
                                            <th>Year</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.year1}</td>
                                                <td>{row.year2}</td>
                                                <td>delete</td>
                                            </tr>
                                        ))}

                                    </tbody>



                                </table>
                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label"> For Income Tax:</label>
                                <br />
                                <input
                                    type="date"
                                    className="form-control d-inline"
                                    onChange={(e) => setSelectDate(e.target.value)}
                                    value={selectDate}
                                    required

                                    style={{ width: "200px" }}
                                />


                                <div className="btn  ml-4 btn" onClick={handleAddDate}>
                                    ADD
                                </div>

                                <table className="table table-bordered mt-3">
                                    <thead className="thead-dark p-0">
                                        <tr>
                                            <th>Year</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {tableData.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.year1}</td>
                                                <td>{row.year2}</td>
                                                <td>delete</td>
                                            </tr>
                                        ))}

                                    </tbody>



                                </table>
                            </div>




                        </div>

                        <button type="submit" className="btn btn-dark w-25 mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default CompanyMaster