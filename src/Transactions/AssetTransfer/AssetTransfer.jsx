import React from "react";
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

import { AssetTransferSchemas } from "../../features/validationSchemas";

const AssetTransfer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(AssetTransferSchemas),
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
            <h5 className="mb-0">+ Asset Transfer</h5>

            <Button className="ms-2" variant="contained" color="success">
              <FaEye className="me-1" />
              View
            </Button>
          </div>

     

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-3">
              <div className="text-end">Previous Transfer Code : <b>12675164</b></div>
              <CustomInput
                label="Transfer Ref No"
                name="TrfrRef"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Bar Code"
                name="barCode"
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

              <div className="col-md-6 mb-3">
                <label className="form-label">Location Name:</label>
                <select
                  className={`form-select form-control ${
                    errors.Location ? "is-invalid" : ""
                  }`}
                  {...register("Location")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Location Name">Location 1</option>
                  <option value="Location Name">Location 2</option>
                  <option value="Location Name">Location 3</option>
                </select>
                <div className="invalid-feedback">{`Location  ${errors.Location?.message}`}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Department Name:</label>
                <select
                  className={`form-select form-control ${
                    errors.Dept ? "is-invalid" : ""
                  }`}
                  {...register("Dept")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Dept 1">Dept 1</option>
                  <option value="Dept 2">Dept 2</option>
                  <option value="Dept 3">Dept 3</option>
                </select>
                <div className="invalid-feedback">{`Dept  ${errors.Dept?.message}`}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Allocate To</label>
                <select
                  className={`form-select form-control ${
                    errors.Allocate ? "is-invalid" : ""
                  }`}
                  {...register("Allocate")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Allocate 1">Allocate 1</option>
                  <option value="Allocate 2">Allocate 2</option>
                  <option value="Allocate 3">Allocate 3</option>
                </select>
                <div className="invalid-feedback">{`Allocate  ${errors.Allocate?.message}`}</div>
              </div>

               <CustomInput
                label="Commencement Date"
                name="date"
                type="date"
                register={register}
                errors={errors}
              />


              <div className="col-md-6 mb-3">
                <label className="form-label">Division </label>
                <select
                  className={`form-select form-control ${
                    errors.Division ? "is-invalid" : ""
                  }`}
                  {...register("Division")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Division 1">Division 1</option>
                  <option value="Division 2">Division 2</option>
                  <option value="Division 3">Division 3</option>
                </select>
                <div className="invalid-feedback">{`Division  ${errors.Division?.message}`}</div>
              </div>


               <CustomInput
                label="Remark"
                name="Remark"
                
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

export default AssetTransfer;
