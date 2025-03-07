import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { userValidationSchema } from "../../features/validationSchemas";
import CustomInput from "../../components/CustomInput/CustomInput"; // Import Reusable Component
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Eye Icons from MUI


import { FaUpload } from "react-icons/fa6";

const UserMaster = () => {
  // const [showLoginFields, setShowLoginFields] = useState(false);
  // const handleCheckboxChange = () => setShowLoginFields((prev) => !prev);


  const [userType, setUserType] = useState(""); // 'login' or 'technician'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // Update radio button logic
  const handleRadioChange = (e) => {
    setValue("userType", e.target.value); // Set userType in form
    setUserType(e.target.value);
  };

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Needed for setting default values
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: { userType: "technician" }, // Set default user type
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
          <h5 className="mb-0 d-flex align-items-center">User Master</h5>

          <div className="">
            <Link to="/Master/UserMasterTable">
              <Button variant="contained" color="success">View</Button>
            </Link>

            <Button className="ms-2" variant="contained" color="success"><FaUpload className="me-1" />
              import</Button>


          </div>
        </div>

        {/* Form Section */}
        <div className="card shadow border-0 p-4 mt-3">
          <h2 className="mb-4">+ Add User</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <CustomInput label="Name" name="name" register={register} errors={errors} />
              <CustomInput label="Email" name="email" type="email" register={register} errors={errors} />
              <CustomInput label="Phone" name="phone" type="number" register={register} errors={errors} />
              <CustomInput label="Job Title" name="jobTitle" register={register} errors={errors} />

              {/* Location Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Location:<sup className="text-red-500">*</sup></label>
                <select
                  className={`form-select form-control ${errors.selectLocation ? "is-invalid" : ""}`}
                  {...register("selectLocation")}
                >
                  <option value="">Select a location</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
                <div className="invalid-feedback">{errors.selectLocation?.message}</div>
              </div>

              {/* Division Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Division:<sup className="text-red-500">*</sup></label>
                <select className={`form-select form-control ${errors.selectDivision ? "is-invalid" : ""}`} {...register("selectDivision")}>
                  <option value="">Select a division</option>
                  <option value="1">Software Division</option>
                  <option value="2">Hardware Division</option>
                </select>
                <div className="invalid-feedback">{errors.selectDivision?.message}</div>
              </div>

              {/* Department Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Department:<sup className="text-red-500">*</sup></label>
                <select className={`form-select form-control ${errors.selectDepartMent ? "is-invalid" : ""}`} {...register("selectDepartMent")}>
                  <option value="">Select a department</option>
                  <option value="1">IT</option>
                  <option value="2">Sales</option>
                </select>
                <div className="invalid-feedback">{errors.selectDepartMent?.message}</div>
              </div>

              {/* Radio Button for Role Selection */}
              <div className="col-md-6 mb-3 d-flex align-items-center">
                <div>
                  <input
                    className="form-label mr-2 me-2"
                    type="radio"
                    name="userType"
                    value="login"
                    onChange={handleRadioChange}
                    checked={userType === "login"}
                  />
                  <label className="mb-0 mr-2 me-2">Login</label>

                  <input
                    className="form-label mr-2 me-2"
                    type="radio"
                    name="userType"
                    value="technician"
                    onChange={handleRadioChange}
                    checked={userType === "technician"}
                  />
                  <label className="mb-0">Technician</label>
                </div>
              </div>

              {/* Conditional Fields - Show only if Login is selected */}
              {userType === "login" && (
                <>
                  <CustomInput label="User ID" name="UserId" register={register} errors={errors} />
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Role:<sup className="text-red-500">*</sup></label>
                    <select className={`form-select form-control ${errors.selectRole ? "is-invalid" : ""}`} {...register("selectRole")}>
                      <option value="">Select a Role</option>
                      <option value="admin">Admin</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="invalid-feedback">{errors.selectRole?.message}</div>
                  </div>
                  {/* Password Field with Eye Icon */}
                  <div className="col-md-6 mb-3 position-relative">
                    <label className="form-label">Password:<sup className="text-red-500">*</sup></label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        {...register("password")}
                      />
                      <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </span>
                    </div>
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>

                  {/* Confirm Password Field with Eye Icon */}
                  <div className="col-md-6 mb-3 position-relative">
                    <label className="form-label">Confirm Password:</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                        {...register("confirmPassword")}
                      />
                      <span className="input-group-text" onClick={toggleConfirmPasswordVisibility} style={{ cursor: "pointer" }}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </span>
                    </div>
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </div>
                </>
              )}
            </div>

            <button type="submit" className="btn btn-dark w-25 mt-3">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};


export default UserMaster;