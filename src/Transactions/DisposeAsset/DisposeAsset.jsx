// import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { FaEye } from "react-icons/fa";

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUpload } from "react-icons/fa6";

import { DisposeAssetSchemas } from "../../features/validationSchemas";

const DisposeAsset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(DisposeAssetSchemas),
  });

  const onSubmit = async (data) => {
    console.log(data);
    toast.success("Data Add successfully!");

    reset(); // Clear the form
  };

  return (
    <>
      <ToastContainer />
      <div className="right-content w-100">
        <div></div>

        <div className="card shadow border-0 w-100  p-4 res-col ">
          <div className="d-flex justify-content-between algin-content-center align-items-center">
            <h5 className="mb-0">+ Dispose Asset</h5>

            <Button className="ms-2" variant="contained" color="success">
              <FaEye className="me-1" />
              View
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-3">
              <div className="">
                Previous Dispose Asset Code: <b>1658618656</b>
              </div>

              <CustomInput
                label="Dispose Asset Ref No"
                name="DisAsstRef"
                register={register}
                errors={errors}
              />

               <CustomInput
                label="Bar Code"
                name="BarCode"
                register={register}
                errors={errors}
              />

             

              <div className="col-md-6 mb-3">
                <label className="form-label">Asset Name:</label>
                <select
                  className={`form-select form-control ${
                    errors.AssetName ? "is-invalid" : ""
                  }`}
                  {...register("AssetName")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Asset Name">Asset 1</option>
                  <option value="Asset Name">Asset 2</option>
                  <option value="Asset Name">Asset 3</option>
                </select>
                <div className="invalid-feedback">{`AssetName  ${errors.AssetName?.message}`}</div>
              </div>

              <CustomInput
                label="Asset Allocation Serial No"
                name="AstAllSerial"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Asset Cost Rs"
                name="AssetCost"
                register={register}
                errors={errors}
              />

               <CustomInput
                label="Depreciation Method"
                name="DepreMethod"
                register={register}
                errors={errors}
              />

              
              <CustomInput
                label="Depreciation Rate"
                name="DepreRate"
                register={register}
                errors={errors}
              />

               <CustomInput
                label="Salvage Value Rs"
                name="SalvageValue"
                register={register}
                errors={errors}
              />

               <CustomInput
                label="Recovery Period"
                name="RecoveryPeriod"
                register={register}
                errors={errors}
              /> 

               <CustomInput
                label="Book Value"
                name="BookValue"
                register={register}
                errors={errors}
              />    

               <CustomInput
                label="Value Sold"
                name="ValueSold"
                register={register}
                errors={errors}
              />  

              <CustomInput
                label="DisPose Date"
                name="DisPoseDate"
                type="Date"
                register={register}
                errors={errors}
              />  

              <CustomInput
                label="Remarks"
                name="Remarks"
                type="Date"
                register={register}
                errors={errors}
              />  



             

             

             

         
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-dark w-25 mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DisposeAsset;
