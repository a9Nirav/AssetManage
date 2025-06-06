// import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { FaEye } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";

import { SurveySchemas } from "../../features/validationSchemas";

const Survey = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(SurveySchemas),
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
        <div className="card shadow border-0 w-100  p-4 res-col ">
          <div className="d-flex justify-content-between algin-content-center align-items-center">
            <h5 className="mb-0">+ Survey</h5>

            <Link to="/Transactions/SurveyTable">
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
                <label className="form-label">Survey Location:</label>
                <select
                  className={`form-select form-control ${
                    errors.SurveyLocation ? "is-invalid" : ""
                  }`}
                  {...register("SurveyLocation")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Survey Location">SurveyLocation 1</option>
                  <option value="Survey Location">SurveyLocation 2</option>
                  <option value="Survey Location">SurveyLocation 3</option>
                </select>
                <div className="invalid-feedback">{`Survey Location  ${errors.SurveyLocation?.message}`}</div>
              </div>

              <CustomInput
                label="Date From"
                name="fromDate"
                type="Date"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Date To"
                name="toDate"
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

export default Survey;
