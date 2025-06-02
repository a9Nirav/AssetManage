import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { MdDelete } from "react-icons/md";
import { InsuranceEntrySchemas } from "../../features/validationSchemas";

const InsuranceEntry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InsuranceEntrySchemas),
  });

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(selectedFile.type)) {
        setFile(null);
        setFileError("Only PDF, PNG, and JPG files are allowed.");
        return;
      }

      if (selectedFile.size > maxSize) {
        setFile(null);
        setFileError("File size should be less than 5MB.");
        return;
      }

      setFile(selectedFile);
      setFileError("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleViewFile = () => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  //   add asset
  const [assetList, setAssetList] = useState([]);
  const [assetData, setAssetData] = useState({
    assets: "",
    InsuranceCost: "",
  });
  const [finalCost, setFinalCost] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  const handleAdd = () => {
    if (!assetData.assets.trim() || !assetData.InsuranceCost.trim()) {
      toast.error("Please fill in both asset and maintenance cost");
      return;
    }

    setAssetList([...assetList, assetData]);

    // Clear input fields
    setAssetData({
      assets: "",
      InsuranceCost: "",
    });
  };

  const handelDelete = (index) => {
    const updateList = [...assetList];
    updateList.splice(index, 1);
    setAssetList(updateList);
    console.log("del");
  };
  useEffect(() => {
    const ans1 = assetList.reduce((sum, item) => {
      return sum + Number(item.InsuranceCost);
    }, 0);
    setFinalCost(ans1);
  }, [assetList]);

  // console.log(finalCost)

  const handleFormValidation = (data) => {
    console.log("nirav");
    if (!file) {
      setFileError("File is required.");
      toast.error("File is required.");
      return;
    }

    if (assetList.length === 0) {
      toast.error("Please add at least one asset item.");
      return;
    }

    const finalData = {
      ...data,
      assetList,
      finalCost,
      file, // or handle this via FormData if uploading
    };

    setFileError("");
    console.log("Form Data:", finalData);
    toast.success("Submit Data Success");
  };
  return (
    <>
      <ToastContainer />
      <div className="right-content">
        <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
          <h5 className="mb-0 d-flex align-items-center">Insurance Entry</h5>

          <div className="">
            <Link to="/Transactions/InsuranceEntryTable">
              <Button variant="contained" color="success" className="phone-btn">
              <FaEye className="me-1"/>  View
              </Button>
            </Link>

          
          </div>
        </div>

        <div className="card shadow border-0 p-4 mt-3">
        

          <form onSubmit={handleSubmit(handleFormValidation)}>
            <div className="row">
              <CustomInput
                label="Policy Name"
                name="policyNumber"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Plan Name"
                name="planName"
                register={register}
                errors={errors}
              />

              <CustomInput
                label="Company Name"
                name="companyName"
                register={register}
                errors={errors}
              />


              <div className="col-md-6 mb-3">
                
                <label className="form-label">Attach File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control"
                  accept="*/*"
                />
                {fileError && (
                  <div className="text-danger mt-1">{fileError}</div>
                )}

                {file && (
                  <div className="mt-2 d-flex align-items-center justify-content-between border p-2 rounded">
                    <span>{file.name}</span>
                    <div>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        className="me-2"
                        onClick={handleViewFile}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleRemoveFile}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              
              <div className="col-md-6 mb-3">
                <label className="form-label">Company Details</label>
                <textarea
                  type="text"
                  className={` form-control ${
                    errors.CompanyDetails ? "is-invalid" : ""
                  }`}
                  {...register("CompanyDetails")}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{`CompanyDetails ${errors.CompanyDetails?.message}`}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  type="text"
                  className={` form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  {...register("description")}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{`description ${errors.description?.message}`}</div>
              </div>
            </div>

            <div className="row  p-3 bg-light">
              <div className="col-md-4">
                <label className="form-label ">
                  Select Assets<sup className="text-red-500">*</sup>
                </label>
                <select
                  className={`form-select form-control ${
                    errors.assets ? "is-invalid" : ""
                  }`}
                  {...register("assets")}
                  onChange={handleChange}
                  value={assetData.assets}
                >
                  <option value="">Select a Asset</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Phone">Phone</option>
                  <option value="Table">Table</option>
                </select>
                <div className="invalid-feedback">{`assets ${errors.assets?.message}`}</div>
              </div>

              <div className="col-md-3">
                <label className="form-label ">
                  Insurance Cost<sup className="text-red-500">*</sup>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.InsuranceCost ? "is-invalid" : ""
                  }`}
                  {...register("InsuranceCost")}
                  placeholder="Item Cost"
                  onChange={handleChange}
                  value={assetData.InsuranceCost}
                />
                <div className="invalid-feedback">{`InsuranceCost  ${errors.InsuranceCost?.message}`}</div>
              </div>

              <div className="col-md-2 d-flex align-items-end   ">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>

            <table className="table table-bordered table-striped v-align mt-3">
              <thead className="thead-dark">
                <tr>
                  <th style={{ width: "10px" }}>No.</th>
                  <th>iteam</th>
                  <th>Cost</th>

                  <th>action</th>
                </tr>
              </thead>

              <tbody>
                {assetList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.assets}</td>
                    <td>{item.InsuranceCost}</td>

                    <td>
                      <div className="actions d-flex align-items-center">
                        <Button
                          className="error"
                          color="error"
                          onClick={() => handelDelete(index)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <CustomInput
                label="From"
                type="date"
                name="fromDate"
                register={register}
                errors={errors}
              />
              <CustomInput
                label="To"
                type="date"
                name="toDate"
                register={register}
                errors={errors}
              />

              <div className="col-md-6">
                Sum Assured Rs :- <b>{`${finalCost}`}</b>

              </div>
              <CustomInput
                label="Premium Payable"
              
                name="premiumPayable"
                register={register}
                errors={errors}
              />
              <div className="col-md-6">
                <input
                  className=""
                  type="checkbox"
                  id="notification"
                  {...register("notification")}
                />
                <label className="mb-0 ms-2" htmlFor="notification">
                  Notification Rules
                </label>

                <div className="invalid-feedback">{`notification  ${errors.notification?.message}`}</div>
              </div>

              <div className="col-md-6">
                        <label className="form-label ">
                  Premium <sup className="text-red-500">*</sup>
                </label>
                <select
                  className={`form-select form-control ${
                    errors.premium ? "is-invalid" : ""
                  }`}
                  {...register("premium")}
                
                >
                  <option value="">Select a premium</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <div className="invalid-feedback">{`premium ${errors.premium?.message}`}</div>
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-25 mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InsuranceEntry;
