import React from "react";

const CustomInput = ({ label, name, type = "text", register, errors ,disabled}) => {
  return (
    <div className="col-md-6 mb-3">
      <label className="form-label">{label}: <sup className="text-red-500">*</sup></label>
      <input
        type={type}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        {...register(name)}
        placeholder={`Enter your ${label.toLowerCase()}`}
        disabled={disabled}
      />
      <div className="invalid-feedback">{`${label} ${errors[name]?.message} `}</div>
    </div>
  );
};

export default CustomInput;
