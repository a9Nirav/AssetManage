// import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { FaEye } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";

import { ScheduleDetailsSchemas } from "../../features/validationSchemas";

const ScheduleDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(ScheduleDetailsSchemas),
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
            <h5 className="mb-0">+ Schedule Details</h5>
            <Link to="/Transactions/ScheduleDetailsTable">
              <Button className="ms-2" variant="contained" color="success">
                <FaEye className="me-1" />
                View
              </Button>
            </Link>
          </div>
        </div>

        <div className="card shadow p-4 border-0 mt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button className="p-1 btn btn-dark"> Get Schedule</button>
            <div className="row mt-3">
              <CustomInput
                label="Date"
                name="Date"
                type="Date"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="task Name"
                name="TaskName"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="schedule Date/Time"
                name="scheduleDate"
                type="Date"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Service Date/Time"
                name="ServiceDate"
                type="Date"
                register={register}
                errors={errors}
              />

              <div className="col-md-6 mb-3">
                <label className="form-label">Status:</label>
                <select
                  className={`form-select form-control ${
                    errors.Status ? "is-invalid" : ""
                  }`}
                  {...register("Status")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Status 1">Status 1</option>
                  <option value="Status 2">Status 2</option>
                  <option value="Status 3">Status 3</option>
                </select>

                <div className="invalid-feedback">{`Status  ${errors.Status?.message}`}</div>
              </div>

              <CustomInput
                label="Remarks"
                name="Remarks"
                register={register}
                errors={errors}
              />

              <div className="col-md-6 mb-3">
                <label className="form-label">technician:</label>
                <select
                  className={`form-select form-control ${
                    errors.technician ? "is-invalid" : ""
                  }`}
                  {...register("technician")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="technician 1">technician 1</option>
                  <option value="technician 2">technician 2</option>
                  <option value="technician 3">technician 3</option>
                </select>

                <div className="invalid-feedback">{`technician  ${errors.technician?.message}`}</div>
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

export default ScheduleDetails;
