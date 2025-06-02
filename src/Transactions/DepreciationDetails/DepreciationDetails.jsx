// import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { FaEye } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";

import { DepreciationDetailsSchemas } from "../../features/validationSchemas";

const DepreciationDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(DepreciationDetailsSchemas),
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
            <h5 className="mb-0">+ Depreciation Details</h5>

            <Link to="/Transactions/DepreciationDetailsTable">
              <Button className="ms-2" variant="contained" color="success">
                <FaEye className="me-1" />
                View
              </Button>
            </Link>
          </div>
        </div>

        <div className="card shadow border-0 p-4 mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Asset :</label>
                <select
                  className={`form-select form-control ${
                    errors.Asset ? "is-invalid" : ""
                  }`}
                  {...register("Asset")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Asset Name">Asset 1</option>
                  <option value="Asset Name">Asset 2</option>
                  <option value="Asset Name">Asset 3</option>
                </select>
                <div className="invalid-feedback">{`Asset  ${errors.Asset?.message}`}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Asset Type :</label>
                <select
                  className={`form-select form-control ${
                    errors.AssetType ? "is-invalid" : ""
                  }`}
                  {...register("AssetType")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Asset Name">AssetType 1</option>
                  <option value="Asset Name">AssetType 2</option>
                  <option value="Asset Name">AssetType 3</option>
                </select>
                <div className="invalid-feedback">{`AssetType  ${errors.AssetType?.message}`}</div>
              </div>

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
                label="Recovery Period"
                name="RecoveryPeriod"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Acquisition Date"
                name="acquisitionDate"
                type="Date"
                register={register}
                errors={errors}
              />

              <label>
                <input
                  type="radio"
                  value="IncomeTax"
                  {...register("BookType")}
                />
                Income Tax
              </label>

              <label>
                <input type="radio" value="Book" {...register("BookType")} />
                Book
              </label>

              {errors.BookType && (
                <p style={{ color: "red" }}>{errors.BookType.message}</p>
              )}
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

export default DepreciationDetails;
