import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUpload } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import CustomInput from "../../components/CustomInput/CustomInput";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "../../features/validationSchemas";

// import * as yup from "yup";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  //   TextField,
  //   Typography,
} from "@mui/material";
import { number } from "yup";

const PurchaseOrder = () => {
  const steps = ["Basic Info", "Add Items", "Shipping Details"];

  // add items
  const [itemData, setItemData] = useState({
    Items: "",
    cost: "",
    quantity: "",
  });

  const [calData, setCalData] = useState({
    shippingCost: "",
    tax: "",
    salesTax: "",
    adjPrice: ""
  });
  console.log(calData);

  const [itemList, setItemList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [subTotal, setSubTotal] = useState();
  const [shippingCost, setShippingCost] = useState("");
  const [totalCost, setTotalCost] = useState("");
  // const [tax, setTax] = useState("");
  const [salesTax, setSalesTax] = useState("");
  const [adjPrice, setAdjPrice] = useState("")

  // const handelTotal = (e) => {
  //     setShippingCost(e.target.value);
  //     setTax(e.target.value);

  //     setAdj(e.target.value);
  // }

  // const  salesTax1 = tax/subTotal*100;
  // console.log(salesTax1)
  // const ans = Number(subTotal) + Number(shippingCost)+Number(salesTax1);
  // const finalans = Number(ans)-Number(adj)
  // console.log(finalans);
  // const [total, SetTotal] = useState({
  //     shippingCost: "",
  // });



  const handleEdit = (index) => {
    setItemData(itemList[index]); // Fill inputs
    setEditIndex(index); // Enable edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
    setCalData({ ...calData, [name]: value });
  };






  console.log(totalCost)
  // const TotalAmt = (e) => {
  //     const { name, value } = e.target;
  //     SetTotal({...total,[name]:value})

  // }

  const handleAdd = () => {
    if (editIndex !== null) {
      // In edit mode
      const updatedList = [...itemList];
      updatedList[editIndex] = itemData;
      setItemList(updatedList);
      setEditIndex(null); // Exit edit mode
    } else {
      // In add mode
      setItemList([...itemList, itemData]);

      setItemData({ Items: " ", cost: " ", quantity: " " });
    }



  };

  const handleDelete = (index) => {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setItemList(updatedList);
  };




  const schemas = [step1Schema, step2Schema, step3Schema];
  const [step, setStep] = useState(0);
  const currentSchema = schemas[step];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(currentSchema),
    defaultValues: { subTotal: subTotal},
    mode: "onTouched",
  });


const watchShippingCost = watch("shippingCost") || 0;
const watchTax = watch("tax") || 0;
const watchAdjPrice = watch("adjPrice") || 0;


  useEffect(() => {
    const IteamSubTotal = itemList.reduce((sum, item) => {
      return sum + Number(item.cost) * Number(item.quantity);
    }, 0);

    setSubTotal(IteamSubTotal);
    setValue("subTotal", IteamSubTotal);

    const B = Number(watchShippingCost) || 0;
    setShippingCost(B)
    const C = IteamSubTotal * Number(watchTax) / 100
    setSalesTax(C)
    const D = Number(watchAdjPrice ?? 0)
    setAdjPrice(D)


    setTotalCost(IteamSubTotal + B + C - D)



    const SalesTax1 = IteamSubTotal;

  }, [itemList, watchShippingCost, watchTax, watchAdjPrice, setValue]);

  const onNext = async () => {
    const valid = await trigger();

    if (valid) setStep((prev) => prev + 1);
  };

  const onBack = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {



    const finaldata = {
      ...data,
      itemList,
      calData,
      totalCost,
      subTotal,

    }
    console.log("Final Submission Data:", finaldata);
    toast.success("Data Submit succes")

  };

  return (
    <>
      <ToastContainer />
      <div className="right-content">
        <div className="card shadow border-0 w-100 flex-row p-4 res-col d-flex justify-content-between">
          <h5 className="mb-0 d-flex align-items-center">Purchase Order</h5>

          <div className="">
            <Link to="/Master/AssetMasterTable">
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
          <div>
            <Stepper activeStep={step} className=" my-3 ">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 0 && (
                <>
                  <div className="d-flex justify-between my-2">
                    <div className="">
                      User Name : <b>Admin</b>
                    </div>
                    <div className="">
                      Previous PO #: <b>3456587</b>
                    </div>
                  </div>
                  <div className="row">
                    <CustomInput
                      label="PO Ref NO."
                      name="PoRefNo"
                      register={register}
                      errors={errors}
                    />

                    <CustomInput
                      label="Signing Authority"
                      name="SigningAuthority"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="PO Name"
                      name="PoNo"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="FAX"
                      name="Fax"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Create Date"
                      type="date"
                      name="CreateDate"
                      register={register}
                      errors={errors}
                    />
                    <CustomInput
                      label="Contact Person"
                      name="ContactPerson"
                      register={register}
                      errors={errors}
                    />
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Vendor Name:<sup className="text-red-500">*</sup>
                      </label>
                      <select
                        className={`form-select form-control ${errors.vendorName ? "is-invalid" : ""
                          }`}
                        {...register("vendorName")}
                      >
                        <option value="">Select a Vendor Name</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Pune">moveable</option>
                        <option value="Bangalore">Bangalore</option>
                      </select>
                      <div className="invalid-feedback">{`Vendor Name ${errors.vendorName?.message}`}</div>
                    </div>
                    <CustomInput
                      label="Person Number"
                      name="Phone"
                      register={register}
                      errors={errors}
                    />

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Address:</label>
                      <textarea
                        type="text"
                        className={` form-control ${errors.Address ? "is-invalid" : ""
                          }`}
                        {...register("Address")}
                        placeholder="Enter your name"
                      />
                      <div className="invalid-feedback">{`Address ${errors.Address?.message}`}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Remarks:</label>
                      <textarea
                        type="text"
                        className={` form-control ${errors.Remarks ? "is-invalid" : ""
                          }`}
                        {...register("Remarks")}
                        placeholder="Enter your name"
                      />
                      <div className="invalid-feedback">{`Remarks ${errors.Remarks?.message}`}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Terms:</label>
                      <textarea
                        type="text"
                        className={` form-control ${errors.Terms ? "is-invalid" : ""
                          }`}
                        {...register("Terms")}
                        placeholder="Enter your name"
                      />
                      <div className="invalid-feedback">{`Terms ${errors.Terms?.message}`}</div>
                    </div>
                  </div>

                  <div className="row border p-4 bg-light">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Location:<sup className="text-red-500">*</sup>
                      </label>
                      <select
                        className={`form-select form-control ${errors.Location ? "is-invalid" : ""
                          }`}
                        {...register("Location")}
                      >
                        <option value="">Select a Vendor Name</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Pune">moveable</option>
                        <option value="Bangalore">Bangalore</option>
                      </select>
                      <div className="invalid-feedback">{`location ${errors.Location?.message}`}</div>

                      <label className="form-label mt-3">
                        Division:<sup className="text-red-500">*</sup>
                      </label>
                      <select
                        className={`form-select form-control ${errors.Division ? "is-invalid" : ""
                          }`}
                        {...register("Division")}
                      >
                        <option value="">Select a Vendor Name</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Pune">moveable</option>
                        <option value="Bangalore">Bangalore</option>
                      </select>
                      <div className="invalid-feedback">{`Division ${errors.Division?.message}`}</div>

                      <label className="form-label mt-3">
                        Department:<sup className="text-red-500">*</sup>
                      </label>
                      <select
                        className={`form-select form-control ${errors.Department ? "is-invalid" : ""
                          }`}
                        {...register("Department")}
                      >
                        <option value="">Select a Vendor Name</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Pune">moveable</option>
                        <option value="Bangalore">Bangalore</option>
                      </select>
                      <div className="invalid-feedback">{`Department ${errors.Department?.message}`}</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label ">
                        Allocate To:<sup className="text-red-500">*</sup>
                      </label>
                      <select
                        className={`form-select form-control ${errors.Allocate ? "is-invalid" : ""
                          }`}
                        {...register("Allocate")}
                      >
                        <option value="">Select a Allocate to</option>
                        <option value="Fixed">Fixeds</option>
                        <option value="Pune">moveable</option>
                        <option value="Bangalore">Bangalore</option>
                      </select>
                      <div className="invalid-feedback">{`Allocate to ${errors.Allocate?.message}`}</div>
                    </div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="py-2">
                    Vendor Name: <b>SUN IKON</b>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label className="form-label ">
                        Items:<sup className="text-red-500">*</sup>
                      </label>
                      <select
                        className={`form-select form-control ${errors.Items ? "is-invalid" : ""
                          }`}
                        {...register("Items")}
                        onChange={handleChange}
                        value={itemData.Items}
                      >
                        <option value="">Select a Items</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Phone">Phone</option>
                        <option value="Table">Table</option>
                      </select>
                      <div className="invalid-feedback">{`Items ${errors.Items?.message}`}</div>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label ">
                        Item Cost:.RS<sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.cost ? "is-invalid" : ""
                          }`}
                        {...register("cost")}
                        onChange={handleChange}
                        value={itemData.cost}
                        placeholder="Item Cost"
                      />
                      <div className="invalid-feedback">{`cost  ${errors.cost?.message}`}</div>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label ">

                        Quantity<sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.quantity ? "is-invalid" : ""
                          }`}
                        {...register("quantity")}
                        onChange={handleChange}
                        value={itemData.quantity}
                        placeholder="Enter quantity"
                      />
                      <div className="invalid-feedback">{`cost  ${errors.quantity?.message}`}</div>
                    </div>

                    <div className="col-md-2 d-flex align-items-end">
                      <button type="button" className="btn btn-dark" onClick={handleAdd}>
                        {editIndex !== null ? "Update" : "Add"}
                      </button>
                    </div>
                  </div>

                  <table className="table table-bordered table-striped v-align mt-3">
                    <thead className="thead-dark">
                      <tr>
                        <th style={{ width: "10px" }}>No.</th>
                        <th>iteam</th>
                        <th>Cost</th>
                        <th>Quantity </th>
                        <th>action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {itemList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.Items}</td>
                          <td>{item.cost}</td>
                          <td>{item.quantity}</td>

                          <td>
                            <div className="actions d-flex align-items-center">
                              <Button
                                className="success"
                                color="success"
                                onClick={() => handleEdit(index)}
                              >
                                <FaPencilAlt />
                              </Button>

                              <Button
                                className="error"
                                color="error"
                                onClick={() => handleDelete(index)}
                              >
                                <MdDelete />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="bg-light row p-3">
                    <div className="col-md-6">
                      <label className="form-label ">Sub Total (A) Rs.</label>
                      <input
                        type="text"
                        className="form-control"
                        value={subTotal}

                        readOnly
                      />

                      <input type="hidden" {...register("subTotal")} />

                      <label className="form-label mt-3">
                        Shpping Cost (B) Rs.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="shippingCost"
                        onChange={handleChange}
                        placeholder="Enter Shpping Cost"

                      />

                      <label className="form-label mt-3">Tax:</label>
                      <select
                        className="form-select form-control"
                        onChange={handleChange}
                        name="tax"
                      >
                        <option value="">Select a Tax</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label ">Sales Tax (C) Rs.</label>
                      <input type="text" className="form-control" value={salesTax} readOnly />

                      <label className="form-label mt-3">
                        {" "}
                        - Price Adjustment (D) Rs.
                      </label>
                      <input type="text" className={` form-control ${errors.adjPrice ? "is-invalid" : ""
                        }`} name="adjPrice"  {...register("adjPrice")}  />
                      <div className="invalid-feedback">{`adjPrice ${errors.adjPrice?.message}`}</div>

                      <label className="form-label mt-3">
                        Total Cost (A+B+C-D) Rs.
                      </label>
                      <input type="text" className="form-control" value={totalCost} readOnly />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>

                  <div className="" style={{ width: "300px", height: "100px", border: "2px solid #000" }}>
                    <img src="" alt="logo" />
                  </div>
                  <div className="row">
                    <CustomInput
                      label="Company Name"
                      name="CompanyName"
                      register={register}
                      errors={errors}
                    />

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Address:</label>
                      <textarea
                        type="text"
                        className={` form-control ${errors.address ? "is-invalid" : ""
                          }`}
                        {...register("address")}
                        placeholder="Enter your Address"
                      />
                      <div className="invalid-feedback">{`Address ${errors.address?.message}`}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label"> Shipping Address:</label>
                      <textarea
                        type="text"
                        className={` form-control ${errors.ShippingAddress ? "is-invalid" : ""
                          }`}
                        {...register("ShippingAddress")}
                        placeholder="Enter your Address"
                      />
                      <div className="invalid-feedback">{`Address ${errors.ShippingAddress?.message}`}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label"> Billing Address:</label>
                      <textarea
                        type="text"
                        className={` form-control ${errors.billingAddress ? "is-invalid" : ""
                          }`}
                        {...register("billingAddress")}
                        placeholder="Enter your Address"
                      />
                      <div className="invalid-feedback">{`Address ${errors.billingAddress?.message}`}</div>
                    </div>

                    <CustomInput
                      label="Phone No."
                      name="phone"
                      register={register}
                      errors={errors}
                    />

                    <CustomInput
                      label="Fax"
                      name="fax"
                      register={register}
                      errors={errors}
                    />

                    <CustomInput
                      label="Email"
                      name="email"
                      register={register}
                      errors={errors}
                    />

                    <CustomInput
                      label="Web URL"
                      name="WebURL"
                      register={register}
                      errors={errors}
                    />


                    <CustomInput
                      label="Contact Person"
                      name="contactPerson"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </>
              )}

              <Box mt={3} display="flex" justifyContent="space-between">
                {step > 0 && <Button onClick={onBack}>Back</Button>}

                {step < steps.length - 1 ? (
                  <button className="btn btn-dark" onClick={onNext}>
                    Next
                  </button>
                ) : (
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                )}
              </Box>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrder;
