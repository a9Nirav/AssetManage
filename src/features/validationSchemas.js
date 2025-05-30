import { Description } from "@mui/icons-material";
import * as yup from "yup";
const name1 = yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed").required("is required");
const required = yup.string().required("is required")
const email = yup.string().email("Invalid email").required("is required");
const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/;
const number = yup.string().matches(/^[0-9]+$/, "Only numbers are allowed").required("This field is required");
const Phone = yup.string().matches(/^\d{10}$/, "Phone must be exactly 10 digits").required("Phone number is required");


export const userValidationSchema = yup.object().shape({
    user_Name: name1,
    email_ID: yup.string().email("Invalid email").required("is required"),
    job_Title: yup.string().required("is required").min(3, "Job Title must be at least 3 characters"),
    phone_No: yup.string().matches(/^\d{10}$/, "Phone must be exactly 10 digits").required("Phone number is required"),
    loc_Code: yup.string().required("Location is required"),
    div_Code: yup.string().required("Division is required"),
    dept_Code: yup.string().required("Department is required"),

    // Apply validation only when `userType` is "login"
    login: yup.boolean(),
    services: yup.boolean(),


    userid: yup.string().when("login", {
      
        then: (schema) => schema.required("User ID is required"),
        otherwise: (schema) => schema.notRequired(),
    }),

    rollid: yup.string().when("login", {
   
        then: (schema) => schema.required("Role is required"),
        otherwise: (schema) => schema.notRequired(),
    }),

    userPwd: yup.string().when("login", {
    
        then: (schema) =>
            schema.matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character."
            ).required("Password is required"),
        otherwise: (schema) => schema.notRequired(),
    }),

    confirmPassword: yup.string().when("login", {
      
        then: (schema) =>
            schema.oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
        otherwise: (schema) => schema.notRequired(),
    }),
});


export const vendorValidationSchema = yup.object().shape({
    Vdr_Name: name1,
    Vdr_Desc: required,
    Cntct_Per: required,
    Phone_No: Phone,
    Email: email,
    Fax_No: yup.string().matches(/^(\+?\d{1,4}[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/, "Invalid fax number format").required(" number is required"),
    Web_URL: yup.string().matches(urlRegex, "Invalid URL format").required("Website URL is required"),
    // AccountUnit:number,
    // VisibilityPin:number,
    Country: name1,
    Addr1: required,
    Addr2: required,
    Addr3: required,
    City: name1,
    PosCode: yup.string().matches(/^[A-Za-z0-9]{5,10}$/, "Invalid postal code format").required("Please enter the postal code"),
    State: name1,
    MtnVndr: yup.boolean(),
    Supplier: yup.boolean()


});





export const CompnayValidationSchema = yup.object().shape({
    companyName: name1,
    ContactPerson: name1,
    Phone: Phone,
    Email: email,
    fax: yup.string().matches(/^(\+?\d{1,4}[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/, "Invalid fax number format").required(" number is required"),
    website: yup.string().matches(urlRegex, "Invalid URL format").required("Website URL is required"),
    AccountUnit: number,
    VisibilityPin: number,
    Country: name1,
    Address1: required,
    Address2: required,
    Address3: required,
    City: name1,
    PostalCode: yup.string().matches(/^[A-Za-z0-9]{5,10}$/, "Invalid postal code format").required("Please enter the postal code"),
    State: name1,
    BillingAddress: required,
    ShippingAddress: required,
    image: yup.mixed().test("fileType", "Only image files are allowed (JPG, PNG, GIF, BMP, WEBP)", (value) => {
        return value && value[0]?.name?.match(/^.*\.(jpg|jpeg|png|gif|bmp|webp)$/i);
    }).required("File is required"),
    SigningAuthority: number,




});


export const LocationValidationSchema = yup.object().shape({
    Loc_Name: required,
    Loc_Desc: required,

})


export const DivisionValidationSchema = yup.object().shape({
    Div_Name: required,
    Div_Desc: required,
    Loc_Code: required,

})


export const GLValidationSchema = yup.object().shape({
    GL_Type: required,
    Account_Desc: required,
    AccountCode: required,

})




export const AssetTypeValidationSchema = yup.object().shape({
    AssetType: required,
    Description: required,
    Method: required,
    DepSalvageValue: number,
    RecoveryRate: number,

})


export const AssetMasterValidationSchema = yup.object().shape({
    AssetName: required,
    AssetType: required,
    manufacturer: required,
    Price: number,
    GLType: required,
    assetType: yup
        .string()
        .oneOf(["Consumable", "FixedAsset", "GroupAsset"], "Please select an asset type")
        .required("Please select an asset type"),
    Description: required,


})





export const DepartmentValidationSchema = yup.object().shape({
    Dept_Name: required,
    Loc_Code: required,
    Dept_Desc: required,

})


export const TaxValidationSchema = yup.object().shape({
    Taxname: required,
    Percentage: number,
})



// transction validation 
export const assetAllocation = yup.object().shape({
    AssetType: required,
    Asset: required,
    AssetName: required,
    tag: required,
    SerialNo: required,
    barCode: required,
    vendorName: required,
    acquisitionDate: required,
    expiryDate: required,
    assetType1: yup.string().oneOf(["leased", ""]),

    leasedStart: yup.date().when("assetType1", {
        is: "leased",
        then: schema => schema.required("Leased Start is required"),
        otherwise: schema => schema.nullable(),
    }),
    leasedEnd: yup.date().when("assetType1", {
        is: "leased",
        then: schema => schema.required("Leased End is required"),
        otherwise: schema => schema.nullable(),
    }),


    warranty: required,

    cost: yup.number()
        .typeError('Cost value must be a number')
        .required('Cost value is required')
        .positive('Cost value must be greater than zero')
        .max(10000000, 'Cost value cannot exceed 1 crore'),
    purValue: yup.number()
        .typeError('Purchase value must be a number')
        .required('Purchase value is required')
        .positive('Purchase value must be greater than zero')
        .max(10000000, 'Purchase value cannot exceed 1 crore'),
    image: yup.mixed().required("Image is required"),



})



export const step1Schema = yup.object().shape({
    PoRefNo: number,
    // SigningAuthority:required,
    // PoNo:required,
    // Fax: yup.string().matches(/^(\+?\d{1,4}[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/, "Invalid fax number format").required(" number is required"),
    // CreateDate:required,
    // ContactPerson:required,
    // Phone:Phone,
    // Address:required,
    // Remarks:required,
    // Terms:required,
    // vendorName:required,
    // Location:required,
    // Division:required,
    // Department:required,
    // Allocate:required,


})


export const step2Schema = yup.object().shape({
    // Items:required,
    // cost:number,
    // quantity:number,

})


