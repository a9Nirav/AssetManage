import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, TextField } from '@mui/material';

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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);


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
    control,
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
              <CustomInput label="Name" name="user_Name" register={register} errors={errors} />
              <CustomInput label="Email" name="email_ID" type="email" register={register} errors={errors} />
              <CustomInput label="Phone" name="phone_No" type="number" register={register} errors={errors} />
              <CustomInput label="Job Title" name="job_Title" register={register} errors={errors} />


              {/* Division Dropdown */}
              <div className="col-md-6 mb-3">
                {/* <label className="form-label">Location:<sup className="text-red-500">*</sup></label>
                <select
                  className={`form-select form-control ${errors.loc_Code ? "is-invalid" : ""}`}
                  {...register("loc_Code")}
                >
                  <option value="">Select a location</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.LocCode}>
                      {loc.LocName}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{errors.selectLocation?.message}</div> */}
                <Autocomplete
                  options={division}
                  getOptionLabel={(option) => option.DivName}
                  value={selectedDivision}
                  onChange={(e, value) => {
                    setSelectedDivision(value)
                    setValue("DivCode", value?.DivCode || "");
                  }}
                  renderInput={(params) => (
                    <>
                      <label className="form-label">Division Name</label>
                      <TextField
                        {...params}
                        placeholder="Type to search Division"

                        className={`form-control ${errors?.div_Code ? "is-invalid" : ""}`}

                      />
                      {errors?.div_Code && (
                        <div className="invalid-feedback">
                          {` ${errors?.div_Code.message} `}
                        </div>
                      )}

                    </>
                  )}
                />

              </div>

              {/* Location Dropdown */}
              <div className="col-md-6 mb-3">
                <Controller
                  name="LocCode"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <label className="form-label">Location Name</label>
                      <Autocomplete
                        options={locations}
                        getOptionLabel={(option) => option?.LocName || ""}
                        isOptionEqualToValue={(option, value) => option?.LocCode === value?.LocCode}
                        value={locations.find((loc) => loc.LocCode === field.value) || null}
                        onChange={(event, newValue) => {
                          field.onChange(newValue?.LocCode || ""); // set LocCode
                          setSelectedLocation(newValue);           // optional state
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Type to search location"
                            className={errors?.loc_Code ? "is-invalid" : ""}
                            error={!!errors?.loc_Code}
                            helperText={errors?.loc_Code?.message}
                          />
                        )}
                      />
                    </>
                  )}
                />
              </div>

              {/* Department Dropdown */}
              <div className="col-md-6 mb-3">
                <Controller
                  name="dept_Code"
                  control={control}
                  rules={{ required: "is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      options={Dept}
                      getOptionLabel={(option) => option.DeptName || ""}
                      onChange={(e, value) => {
                        field.onChange(value?.DeptCode || "");
                        setSelectedDept(value);
                      }}
                      value={Dept.find((d) => d.DeptCode === field.value) || null}
                      renderInput={(params) => (
                        <>
                          <label className="form-label">Department Name</label>
                          <TextField
                            {...params}
                            placeholder="Type to search Department"
                            className={`form-control ${errors?.dept_Code ? "is-invalid" : ""}`}
                          />
                          {errors?.dept_Code && (
                            <div className="invalid-feedback">
                              {`Department Name ${errors?.dept_Code.message}`}
                            </div>
                          )}
                        </>
                      )}
                    />
                  )}
                />

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