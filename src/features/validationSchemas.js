import * as yup from "yup";
const name1 = yup
  .string()
  .matches(/^[A-Za-z ]+$/, "Only letters and spaces are allowed")
  .required("Name is required");
const required = yup.string().required("is required");
const email = yup.string().email("Invalid email").required("is required");
const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/;
const number = yup
  .string()
  .matches(/^[0-9]+$/, "Only numbers are allowed")
  .required("This field is required");
const Phone = yup
  .string()
  .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
  .required("Phone number is required");

export const userValidationSchema = yup.object().shape({
  User_Name: name1,
  Email_ID: yup.string().email("Invalid email").required("is required"),
  Job_Title: yup
    .string()
    .required("is required")
    .min(3, "Job Title must be at least 3 characters"),
  Phone_No: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required("Phone number is required"),
  Loc_Code: yup.string().required("Location is required"),
  Div_Code: yup.string().required("Division is required"),
  Dept_Code: yup.string().required("Department is required"),

  Login: yup.boolean(),

  Userid: yup.string().when("Login", {
    is: true,
    then: (schema) => schema.required("User ID is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  Rollid: yup.string().when("Login", {
    is: true,
    then: (schema) => schema.required("Role is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  UserPwd: yup.string().when("Login", {
    is: true,
    then: (schema) =>
      schema
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters long, include one uppercase, one lowercase, one number, and one special character."
        )
        .required("Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  confirmPassword: yup.string().when("Login", {
    is: true,
    then: (schema) =>
      schema
        .oneOf([yup.ref("UserPwd"), null], "Passwords must match")
        .required("Confirm Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  ComCode: yup.string().when("Login", {
    is: true,
    then: (schema) => schema.required("Company Code is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});


export const vendorValidationSchema = yup.object().shape({
  Vdr_Name: name1,
  Vdr_Desc: required,
  Cntct_Per: name1,
  Phone_No: Phone,
  Email: email,
  Fax_No: yup
    .string()
    .matches(
      /^(\+?\d{1,4}[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/,
      "Invalid fax number format"
    )
    .required(" number is required"),
  Web_URL: yup
    .string()
    .matches(urlRegex, "Invalid URL format")
    .required("Website URL is required"),
  // AccountUnit: number,
  // VisibilityPin: number,
  Country: name1,
  Addr1: required,
  Addr2: required,
  Addr3: required,
  City: name1,
  PosCode: yup
    .string()
    .matches(/^[A-Za-z0-9]{5,10}$/, "Invalid postal code format")
    .required("Please enter the postal code"),
  State: name1,
  MtnVndr: yup
    .boolean()
  ,
  Supplier: yup
    .boolean()
  ,
});

export const CompnayValidationSchema = yup.object().shape({
  companyName: name1,
  ContactPerson: name1,
  Phone: Phone,
  Email: email,
  fax: yup
    .string()
    .matches(
      /^(\+?\d{1,4}[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/,
      "Invalid fax number format"
    )
    .required(" number is required"),
  website: yup
    .string()
    .matches(urlRegex, "Invalid URL format")
    .required("Website URL is required"),
  AccountUnit: number,
  VisibilityPin: number,
  Country: name1,
  Address1: required,
  Address2: required,
  Address3: required,
  City: name1,
  PostalCode: yup
    .string()
    .matches(/^[A-Za-z0-9]{5,10}$/, "Invalid postal code format")
    .required("Please enter the postal code"),
  State: name1,
  BillingAddress: required,
  ShippingAddress: required,
  image: yup
    .mixed()
    .test(
      "fileType",
      "Only image files are allowed (JPG, PNG, GIF, BMP, WEBP)",
      (value) => {
        return (
          value && value[0]?.name?.match(/^.*\.(jpg|jpeg|png|gif|bmp|webp)$/i)
        );
      }
    )
    .required("File is required"),
  SigningAuthority: number,
});

export const LocationValidationSchema = yup.object().shape({
  LocName: required,
  LocDesc: required,
});

export const DivisionValidationSchema = yup.object().shape({
  DivName: required,
  DivDesc: required,
  LocCode: required,
});

export const GLValidationSchema = yup.object().shape({
  GL_Type: required,
  Account_Desc: required,
  // AccountCode: required,
});

export const AssetTypeValidationSchema = yup.object().shape({
  AssetType: required,
  Description: required,
  Method: required,
  DepSalvageValue: number,
  RecoveryRate: number,
});

export const AssetMasterValidationSchema = yup.object().shape({
  AssetName: required,
  AssetType: required,
  manufacturer: required,
  Price: number,
  GLType: required,
  assetType: yup
    .string()
    .oneOf(
      ["Consumable", "FixedAsset", "GroupAsset"],
      "Please select an asset type"
    )
    .required("Please select an asset type"),
  Description: required,
  warrentyYear: required,
  warrentyMonth: required,
  periodYear: required,
  periodMonth: required,



});




export const DepartmentValidationSchema = yup.object().shape({
  DeptName: required,
  LocCode: required,
  DeptDesc: required,
});

export const TaxValidationSchema = yup.object().shape({
  Taxname: required,
  Percentage: number,
});

// transction validation
export const assetAllocation = yup.object().shape({
  AssetType: yup.string().required("Asset Type is required"),
  Asset: yup.string().required("Asset is required"),
  AssetName: yup.string().required("Asset Name is required"),
  tag: yup.string().required("Tag is required"),
  SerialNo: yup.string().required("Serial No is required"),
  barCode: yup.string().required("BarCode is required"),
  vendorName: yup.string().required("Vendor Name is required"),
  acquisitionDate: yup.date().transform((value, originalValue) =>
    originalValue === "" ? null : value
  ).required("Acquisition Date is required"),
  expiryDate: yup.date().transform((value, originalValue) =>
    originalValue === "" ? null : value
  ).required("Expiry Date is required"),

  assetType1: yup.string().oneOf(["leased", ""]),

  leasedStart: yup.date().transform((value, originalValue) =>
    originalValue === "" ? null : value
  ).when("assetType1", {
    is: "leased",
    then: (schema) => schema.required("Leased Start is required"),
    otherwise: (schema) => schema.nullable(),
  }),

  leasedEnd: yup.date().transform((value, originalValue) =>
    originalValue === "" ? null : value
  ).when("assetType1", {
    is: "leased",
    then: (schema) =>
      schema
        .required("Leased End is required")
        .min(yup.ref("leasedStart"), "Leased End must be after Leased Start"),
    otherwise: (schema) => schema.nullable(),
  }),

  warranty: yup.date().transform((value, originalValue) =>
    originalValue === "" ? null : value
  ).required("Warranty is required"),

  cost: yup
    .number()
    .typeError("Cost must be a number")
    .required("Cost is required"),

  purValue: yup
    .number()
    .typeError("Purchase Value must be a number")
    .required("Purchase value is required")
    .test("greater-than-cost", "Purchase value must be greater than cost", function (value) {
      const { cost } = this.parent;
      return value > cost;
    }),

  image: yup
    .mixed()
    .test(
      "fileType",
      "Only image files are allowed (JPG, PNG, GIF, BMP, WEBP)",
      (value) => {
        return (
          value && value[0]?.name?.match(/^.*\.(jpg|jpeg|png|gif|bmp|webp)$/i)
        );
      }
    )
    .required("File is required")
});

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
});

export const step2Schema = yup.object().shape({
  Items: required,
  // cost:number,
  // quantity:number,
  adjPrice: yup.number()

    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .max(yup.ref("subTotal"), "Adjustment Price cannot be greater than Subtotal"),
  subTotal: yup.number(),
  shippingCost: yup
    .number()
    .typeError("Shipping Cost must be a number")
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .min(0, "Shipping Cost cannot be negative"),
    tax:required
});

export const step3Schema = yup.object().shape({
  CompanyName: required,
  address: required,
  ShippingAddress: required,
  billingAddress: required,
  phone: Phone,
  fax: yup
    .string()
    .matches(
      /^(\+?\d{1,4}[-\s]?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/,
      "Invalid fax number format"
    )
    .required(" number is required"),
  email: email,
  WebURL: yup
    .string()
    .matches(urlRegex, "Invalid URL format")
    .required("Website URL is required"),
  contactPerson: required,
});

export const ContractEntrySchemas = yup.object().shape({
  contractName: required,
  vendorName: required,
  description: required,
  support: required,
  //   assets: required,
  //   maintenanceCost: number,
  fromDate: yup.date().transform((value, originalValue) =>
    originalValue === "" ? null : value
  ).required("From date is required"),
  toDate: yup
    .date().transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .required("To date is required")
    .min(yup.ref("fromDate"), "To date must be after From date"),
  notification: yup.boolean(),
});

export const InsuranceEntrySchemas = yup.object().shape({
  policyNumber: number,
  planName: required,
  companyName: required,
  CompanyDetails: required,
  description: required,
  //   assets: required,
  //   maintenanceCost: number,
  fromDate: yup.date().transform((value, originalValue) =>
    originalValue === "" ? null : value
  ).required("From date is required"),
  toDate: yup
    .date().transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .required("To date is required")
    .min(yup.ref("fromDate"), "To date must be after From date"),
  notification: yup.boolean(),
  premiumPayable: number,
  premium: required,
});

export const AssetTransferSchemas = yup.object().shape({
  TrfrRef: required,
  barCode: required,
  AssetName: required,
  Location: required,
  Dept: required,
  Allocate: required,
  date: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  Division: required,
  Remark: required,
});

export const AssetRepairSchemas = yup.object().shape({
  RepairRef: required,
  AssetSerial: required,
  AssetName: required,
  AssetCost: number,

  date: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  date1: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  PartDes: required,
  Remark: required,
});

export const ReplacementsSchemas = yup.object().shape({
  AssetName: required,
  barCode: required,
});

export const ConsumableSchemas = yup.object().shape({
  AssetType: required,
  AssetName: required,
  Qty: number,
  AssetCost: number,
  Location: required,
  Dept: required,
  Division: required,
  User: required,
});

export const DisposeAssetSchemas = yup.object().shape({
  AssetName: required,
  BarCode: required,
  DisAsstRef: required,
  AstAllSerial: required,
  AssetCost: number,
  DepreMethod: required,
  DepreRate: number,
  SalvageValue: number,
  RecoveryPeriod: number,
  BookValue: number,
  ValueSold: number,
  DisPoseDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  Remarks: required,
});

export const ScheduleGeneratorSchemas = yup.object().shape({
  Type: required,
  Date: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
});

export const ScheduleDetailsSchemas = yup.object().shape({
  TaskName: required,
  Date: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  scheduleDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  ServiceDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  Status: required,
  Remarks: required,
  technician: required,
});

export const SurveySchemas = yup.object().shape({
  SurveyLocation: required,
  Date: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  fromDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("From date is required"),
  toDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("To date is required")
    .min(yup.ref("fromDate"), "To date must be after From date"),
});

export const DepreciationDetailsSchemas = yup.object().shape({
  AssetName: required,
  Asset: required,
  AssetType: required,
  AssetCost: number,
  DepreMethod: number,
  DepreRate: number,
  RecoveryPeriod: number,
  acquisitionDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  BookType: required,
});
