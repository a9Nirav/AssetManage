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

import { AssetRepairSchemas } from "../../features/validationSchemas";

const AssetRepair = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(AssetRepairSchemas),
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
            <h5 className="mb-0">+ Asset Repair</h5>

            <Button className="ms-2" variant="contained" color="success">
              <FaEye className="me-1" />
              View
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-3">
              <CustomInput
                label="Asset Repair Ref No"
                name="RepairRef"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Asset Repair Date"
                name="date"
                type="date"
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
                label="Asset Serial No"
                name="AssetSerial"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Asset Cost Rs."
                name="AssetCost"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Acquisition Date"
                name="date1"
                type="date"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Expiry Date"
                name="date1"
                type="date"
                register={register}
                errors={errors}
              />

              <div className="col-md-6 mb-3">
                <label className="form-label">Parts Added/Replaced</label>
                <textarea
                  type="text"
                  className={` form-control ${
                    errors.PartDes ? "is-invalid" : ""
                  }`}
                  {...register("PartDes")}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{`Part Info ${errors.PartDes?.message}`}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Remarks</label>
                <textarea
                  type="text"
                  className={` form-control ${
                    errors.Remark ? "is-invalid" : ""
                  }`}
                  {...register("Remark")}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{`Remark ${errors.Remark?.message}`}</div>
              </div>
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

export default AssetRepair;
