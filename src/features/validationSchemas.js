import { Description } from "@mui/icons-material";
import * as yup from "yup";
const name1 = yup.string().matches(/^[A-Za-z]+$/, "Only alphabets are allowed").required("is required");
const required = yup.string().required("is required")
const email = yup.string().email("Invalid email").required("is required");
const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/;
const number = yup.string().matches(/^[0-9]+$/, "Only numbers are allowed").required("This field is required");
const Phone = yup.string().matches(/^\d{10}$/, "Phone must be exactly 10 digits").required("Phone number is required");

export const userValidationSchema = yup.object().shape({
    name: name1,
    email: yup.string().email("Invalid email").required("is required"),
    jobTitle: yup.string().required("is required").min(3, "Job Title must be at least 3 characters"),
    phone: yup.string().matches(/^\d{10}$/, "Phone must be exactly 10 digits").required("Phone number is required"),
    selectLocation: yup.string().required("Location is required"),
    selectDivision: yup.string().required("Division is required"),
    selectDepartMent: yup.string().required("Department is required"),

    // Apply validation only when `userType` is "login"
    userType: yup.string().required("User type is required"), 

    UserId: yup.string().when("userType", {
        is: "login",
        then: (schema) => schema.required("User ID is required"),
        otherwise: (schema) => schema.notRequired(),
    }),

    selectRole: yup.string().when("userType", {
        is: "login",
        then: (schema) => schema.required("Role is required"),
        otherwise: (schema) => schema.notRequired(),
    }),

    password: yup.string().when("userType", {
        is: "login",
        then: (schema) =>
            schema.matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character."
            ).required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
    }),

    confirmPassword: yup.string().when("userType", {
        is: "login",
        then: (schema) =>
            schema.oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
        otherwise: (schema) => schema.notRequired(),
    }),
});


export const CompnayValidationSchema = yup.object().shape({
    companyName: name1,
    ContactPerson:name1,
    Phone:Phone,
    Email:email,
    fax: yup.string().matches(/^(\+?\d{1,4}[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/, "Invalid fax number format").required(" number is required"),
    website: yup.string().matches(urlRegex, "Invalid URL format").required("Website URL is required"),
    AccountUnit:number,
    VisibilityPin:number,
    Country:name1,
    Address1:required,
    Address2:required,
    Address3:required,
    City:name1,
    PostalCode: yup.string().matches(/^[A-Za-z0-9]{5,10}$/, "Invalid postal code format").required("Please enter the postal code"),
    State:name1,
    BillingAddress:required,
    ShippingAddress:required,
    image:yup.mixed().test("fileType", "Only image files are allowed (JPG, PNG, GIF, BMP, WEBP)", (value) => {
      return value && value[0]?.name?.match(/^.*\.(jpg|jpeg|png|gif|bmp|webp)$/i);
    }).required("File is required"),
    SigningAuthority:number,




});


export const LocationValidationSchema = yup.object().shape({
    Location:required,
    Description:required,

})


export const DivisionValidationSchema = yup.object().shape({
    abc:required,
    Description:required,

})

export const GLValidationSchema = yup.object().shape({
    GLType:required,
    Description:required,

})


export const AssetTypeValidationSchema = yup.object().shape({
    AssetType:required,
    Description:required,
    Method:required,
    DepSalvageValue:number,
    RecoveryRate:number,

})


export const AssetMasterValidationSchema = yup.object().shape({
    AssetName:required,
    AssetType:required,
    manufacturer:required,
    Price:number,
    GLType:required,
    assetType: yup
    .string()
    .oneOf(["Consumable", "FixedAsset", "GroupAsset"], "Please select an asset type")
    .required("Please select an asset type"),
    Description:required,
    

})





export const DepartmentValidationSchema = yup.object().shape({
    DepartmentName:required,
    Location:required,
    Description:required,

})


export const TaxValidationSchema = yup.object().shape({
    TaxName:required,
    Percentage:number,
   

})


