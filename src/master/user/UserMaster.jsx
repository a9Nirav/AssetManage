import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { userValidationSchema } from "../../features/validationSchemas";
import CustomInput from "../../components/CustomInput/CustomInput"; // Import Reusable Component
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Eye Icons from MUI


import { FaUpload } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchLocations, fetchDivi, fetchDept } from "../../features/masterApi.js";


const UserMaster = () => {
  const dispatch = useDispatch();
  // const [showLoginFields, setShowLoginFields] = useState(false);
  // const handleCheckboxChange = () => setShowLoginFields((prev) => !prev);

  const locations = useSelector(state => state.master.locations);
  const Dept = useSelector((state) => state.master.Depts || []);
  const division = useSelector((state) => state.master.divis || [])
  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchDivi());
    dispatch(fetchDept());

  }, [dispatch]);

  // const [userType, setUserType] = useState(""); // 'login' or 'technician'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // Update radio button logic
  // const handleRadioChange = (e) => {
  //   setValue("login", e.target.value); // Set userType in form
  //   setUserType(e.target.value);
  // };

  // React Hook Form Setup
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue, // Needed for setting default values
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      login: false,
      services: false,
    },
  });

  const onSubmit = async (data) => {

    await dispatch(createUser(data)).unwrap();
    console.log("Form Data:", data);
    toast.success("Submit Data Success");
    console.log("hey")

  };

  const isLogin = watch('login');

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
              <CustomInput label="Name" name="UserName" register={register} errors={errors} />
              <CustomInput label="Email" name="EmailID" type="email" register={register} errors={errors} />
              <CustomInput label="Phone" name="PhoneNo" type="number" register={register} errors={errors} />
              <CustomInput label="Job Title" name="job_Title" register={register} errors={errors} />


              {/* Location Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Location:<sup className="text-red-500">*</sup></label>
                <select
                  className={`form-select form-control ${errors.loc_Code ? "is-invalid" : ""}`}
                  {...register("loc_Code")}
                >
                  <option value="">Select a location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.locCode}>
                      {loc.locName}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.selectLocation?.message}</div>
              </div>

              {/* Division Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Division:<sup className="text-red-500">*</sup></label>
                <select className={`form-select form-control ${errors.div_Code ? "is-invalid" : ""}`} {...register("div_Code")}>
                  {division.map((divi) => (
                    <option key={divi.id} value={divi.divName}>
                      {divi.divName}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.div_Code?.message}</div>
              </div>

              {/* Department Dropdown */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Department:<sup className="text-red-500">*</sup></label>
                <select className={`form-select form-control ${errors.dept_Code ? "is-invalid" : ""}`} {...register("dept_Code")}>
                  {Dept.map((Dept) => (
                    <option key={Dept.id} value={Dept.deptCode}>
                      {Dept.deptName}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.dept_Code?.message}</div>
              </div>

              {/* Radio Button for Role Selection */}
              <div className="col-md-6 mb-3 d-flex align-items-center">

                <input type="checkbox" {...register('services')} />
                <label className="ms-2 me-3">   Services  </label>
               
              

        
                  <input type="checkbox" {...register('login')} />
                         <label className="ms-2"> Login   </label>
             
              </div>



              {/* Conditional Fields - Show only if Login is selected */}
              {isLogin && (
                <>

                  <CustomInput label="User ID" name="userid" register={register} errors={errors} />
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Role:<sup className="text-red-500">*</sup></label>
                    <select className={`form-select form-control ${errors.rollid ? "is-invalid" : ""}`} {...register("rollid")}>
                      <option value="">Select a Role</option>
                      <option value="admin">Admin</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="invalid-feedback">{errors.rollid?.message}</div>
                  </div>


                  <div className="col-md-6 mb-3 position-relative">
                    <label className="form-label">Password:<sup className="text-red-500">*</sup></label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${errors.userPwd ? "is-invalid" : ""}`}
                        {...register("userPwd")}
                      />
                      <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </span>
                    </div>
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>


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
                  <CustomInput label="Compnay Code" name="comCode" register={register} errors={errors} />
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