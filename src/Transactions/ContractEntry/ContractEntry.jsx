import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "../../components/CustomInput/CustomInput";
import { MdDelete } from "react-icons/md";
import { ContractEntrySchemas } from "../../features/validationSchemas";

const ContractEntry = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ContractEntrySchemas),
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
    maintenanceCost: "",
  });
  const [finalCost, setFinalCost] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  const handleAdd = () => {
    if (!assetData.assets.trim() || !assetData.maintenanceCost.trim()) {
      toast.error("Please fill in both asset and maintenance cost");
      return;
    }

    setAssetList([...assetList, assetData]);

    // Clear input fields
    setAssetData({
      assets: "",
      maintenanceCost: "",
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
      return sum + Number(item.maintenanceCost);
    }, 0);
    setFinalCost(ans1);
  }, [assetList]);

  // console.log(finalCost)

  const handleFormValidation  = (data) => {
    console.log("nirav")
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
          <h5 className="mb-0 d-flex align-items-center">Contract Entry</h5>

          <div className="">
            <Link to="/Transactions/ContractEntryTable">
              <Button variant="contained" color="success" className="phone-btn">
                View
              </Button>
            </Link>

            <Button
              className="ms-2 phone-btn"
              variant="contained"
              color="success"
            >
              <FaUpload className="me-1" />
              import
            </Button>
          </div>
        </div>

        <div className="card shadow border-0 p-4 mt-3"> 
          <form onSubmit={handleSubmit(handleFormValidation )}>
            <div className="row">
              <CustomInput
                label="Contract Name"
                name="contractName"
                register={register}
                errors={errors}
              />

              <div className="col-md-6 mb-3">
                <label className="form-label">Location Name:</label>
                <select
                  className={`form-select form-control ${
                    errors.vendorName ? "is-invalid" : ""
                  }`}
                  {...register("vendorName")}
                  aria-label="Default select example"
                >
                  <option value="">Select a location</option>
                  <option value="Vendor 1">Vendor 1</option>
                  <option value="Vendor 2">Vendor 2</option>
                  <option value="Vendor 3">Vendor 3</option>
                </select>
                <div className="invalid-feedback">{`Vendor Name  ${errors.vendorName?.message}`}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Description:</label>
                <textarea
                  type="text"
                  className={` form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  {...register("description")}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{`Description ${errors.description?.message}`}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Support:</label>
                <textarea
                  type="text"
                  className={` form-control ${
                    errors.support ? "is-invalid" : ""
                  }`}
                  {...register("support")}
                  placeholder="Enter your name"
                />
                <div className="invalid-feedback">{`Support ${errors.support?.message}`}</div>
              </div>

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
            </div>

            <div className="row  p-3 bg-light">
              <div className="col-md-4">
                <label className="form-label ">
                  Items:<sup className="text-red-500">*</sup>
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
                  Maintenance Cost<sup className="text-red-500">*</sup>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.maintenanceCost ? "is-invalid" : ""
                  }`}
                  {...register("maintenanceCost")}
                  placeholder="Item Cost"
                  onChange={handleChange}
                  value={assetData.maintenanceCost}
                />
                <div className="invalid-feedback">{`maintenanceCost  ${errors.maintenanceCost?.message}`}</div>
              </div>

              <div className="col-md-2 d-flex align-items-end   ">
                <button type="button" className="btn btn-dark" onClick={handleAdd}>
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
                    <td>{item.maintenanceCost}</td>

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
                Maintenance Cost Rs :- <b>{`${finalCost}`}</b>
              </div>
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

export default ContractEntry;
