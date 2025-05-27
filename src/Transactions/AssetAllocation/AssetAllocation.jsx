import React from 'react'

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUpload } from "react-icons/fa6";
import { assetAllocation } from "../../features/validationSchemas";
import { useRef, useState } from "react";

const AssetAllocation = () => {

  const fileInputRef = useRef(null);
  const [isLeased, setIsLeased] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);



  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },

  } = useForm({
    resolver: yupResolver(assetAllocation),

  });


  const onSubmit = (data) => {
    console.log("hello")

    console.log("Form Data:", data);
    toast.success("Submit Data Success");
  };


  const onError = (errors) => {
    console.log("Validation Errors:", errors); // Add this
  };



  const clearFile = () => {
    resetField("image"); // Clears from react-hook-form
     setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clears the actual input
    }
  };


  return (
    <>

      <ToastContainer />
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
          <h5 className="mb-0 d-flex align-items-center">Asset  Allocation</h5>

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
          <h2 className="mb-4">+ Asset Allocation</h2>

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="row">


              {/* Location Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Asset Type:<sup className="text-red-500">*</sup></label>
                <select
                  className={`form-select form-control ${errors.AssetType ? "is-invalid" : ""}`}
                  {...register("AssetType")}
                >
                  <option value="">Select a Asset Type</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Pune">moveable</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
                <div className="invalid-feedback">{`Asset Type ${errors.AssetType?.message}`}</div>
              </div>


              <div className="col-md-6 mb-3">
                <label className="form-label">Asset:<sup className="text-red-500">*</sup></label>
                <select
                  className={`form-select form-control ${errors.Asset ? "is-invalid" : ""}`}
                  {...register("Asset")}
                >
                  <option value="">Select a Asset</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Pune">moveable</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
                <div className="invalid-feedback">{`Asset ${errors.Asset?.message}`}</div>
              </div>

              <CustomInput label="Asset Name" name="AssetName" register={register} errors={errors} />
              <CustomInput label="tag" name="tag" register={register} errors={errors} />
              <CustomInput label="SerialNo" name="SerialNo" register={register} errors={errors} />
              <CustomInput label="BarCode" name="barCode" register={register} errors={errors} />

              <div className="col-md-6 mb-3">
                <label className="form-label">Vendor Name:<sup className="text-red-500">*</sup></label>
                <select
                  className={`form-select form-control ${errors.vendorName ? "is-invalid" : ""}`}
                  {...register("vendorName")}
                >
                  <option value="">Select a Asset Type</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Pune">moveable</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
                <div className="invalid-feedback">{`Asset Type ${errors.vendorName?.message}`}</div>
              </div>
              <CustomInput label="Cost" name="cost" register={register} errors={errors} />

              <CustomInput label="Acquisition Date" type='date' name="acquisitionDate" register={register} errors={errors} />
              <CustomInput label="Expiry Date" type='date' name="expiryDate" register={register} errors={errors} />

              <div className="col-md-12 mb-3">


                <input
                  className=''
                  type="checkbox"
                  id="leased"
                  checked={isLeased}
                  onChange={(e) => {
                    setIsLeased(e.target.checked);
                    setValue("assetType1", e.target.checked ? "leased" : "");
                  }}
                />
                <label className="mb-0 me-2" htmlFor="leased"> Is Leased</label>
              </div>
              {isLeased && (
                <>
                  <CustomInput label="Leased Start" type='date' name="leasedStart" register={register} errors={errors} />
                  <CustomInput label="Leased End" type='date' name="leasedEnd" register={register} errors={errors} />
                </>
              )}


              <CustomInput label="Warranty Expiry Date" type='date' name="warranty" register={register} errors={errors} />
              <CustomInput label="Purchase Value" name="purValue" register={register} errors={errors} />


              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Logo: <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="file" id="myInput"
                  ref={fileInputRef}
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  {...register("image")}
                  accept="image/*" // Only allows images
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageURL = URL.createObjectURL(file);
                      setImagePreview(imageURL);
                    } else {
                      setImagePreview(null);
                    }
                  }}
                />
                <div className="invalid-feedback">{errors.image?.message}</div>

              </div>


              <div className="col-md-6">
                {imagePreview && (
                  <>

                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: "200px", height: "auto", borderRadius: "8px", border: "1px solid #ccc" }}
                      />
                    </div>
                    <button onClick={clearFile} className='btn  py-0 px-2 btn-danger' >Clear</button>
                  </>
                )}
              </div>










            </div>

            <button type="submit" className="btn btn-dark w-25 mt-3">Submit</button>
          </form>
        </div>
      </div>

    </>

  )
}

export default AssetAllocation