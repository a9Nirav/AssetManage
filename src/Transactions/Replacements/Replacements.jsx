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

import { ReplacementsSchemas } from "../../features/validationSchemas";

const Replacements = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(ReplacementsSchemas),
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
            <h5 className="mb-0">+ Replacements</h5>

            <Button className="ms-2" variant="contained" color="success">
              <FaEye className="me-1" />
              View
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-3">
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

export default Replacements;
