// src/features/location/locationAPI.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData, getAuthInfo } from '../utils/apiClient';

const GetLogin = "/SAM_LoginDetails";

const AddUser = "/SAM_GetInsertUpdateUserDetails";
const GetUser = "/SAM_GetUserDataDetails";

const AddLocation = "/SAM_AddUpdateDelLocationDetails";
const GetLocation = "/SAM_GetLocationDetails"

const AddDivi = "/SAM_GetInsertUpdateDivisionDetails";
const GetDivi = "/SAM_GetDivisionDetails";

const AddDept = "/SAM_GetInsertUpdateDepartmentDetails";
const GetDept = "/SAM_GetDepartmentDetails";


const AddTax = "/SAM_InsertUpdateTaxDetails";
const GetTax = "/SAM_GetTaxDetails";

const AddGLType = "/SAM_GetInsertUpdateLedgerDetails";
const GetGLType = "/SAM_GetLedgerDetails";


const AddVendor = "/SAM_GetInsertUpdateVendorDetails";
const GetVendor = "/SAM_GetVendorDetails";

// Fetch all locations
export const fetchLocations = createAsyncThunk('location/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetLocation}`, body);
 
  return response.data;
});



// export const updateLocation = createAsyncThunk(
//   'location/update',
//   async (formData) => {
//     const auth = getAuthInfo();
//     const body = {
//       ...formData,
//       UserId: auth?.UserId || '',
//       ComCode: auth?.ComCode || '',
//     };
//     const response = await postData(`${AddLocation}`, body);
//     return body; // or response.data if your API returns updated object
//   }
// );



export const getlogin = createAsyncThunk('getlogin', async () => {
  const response = await postData(`${GetLogin}`);
  return response;
})




// Create new location
// export const createLocation = createAsyncThunk('location/create', async (formData) => {
//     const auth = getAuthInfo();
//     const body = {
//         UserId: auth?.UserId || '',
//         ComCode: auth?.ComCode || '',
//     };
//     const response = await postData('/SAM_AddUpdateDelLocationDetails', formData);
//     return response;
// });


export const createLocation = createAsyncThunk('location/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserId:"nirav",
    ComCode: auth?.ComCode || '',
   
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddLocation}`, body);
  console.log("Create Location Response:", response);
  return response; // make sure this is the actual data
});





// dept 

export const createDept = createAsyncThunk('Dept/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserCode: auth?.UserId || '',
    UserCode:"001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddDept}`, body);
  console.log("Create Dept Response:", response);
  return response.data; // make sure this is the actual data
});




export const fetchDept = createAsyncThunk('Dept/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetDept}`, body);
  console.log(response.data)
  return response.data;
});


// Divistion 
export const createDivi = createAsyncThunk('Divi/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserId:"001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddDivi}`, body);
  console.log("Create Division Response:", response);
  return response.data;
});

export const fetchDivi = createAsyncThunk('Divi/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: "001",
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetDivi}`, body);
  return response.data;
});


// Tax Master 
export const createTaxMaster = createAsyncThunk('Tax/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserCode:"001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddTax}`, body);
  console.log("Create TaxMaster Response:", response);
  return response.data;
});


export const fetchTaxMaster = createAsyncThunk('Tax/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetTax}`, body);
  return response.data;
});

// GL type 
export const createGLType = createAsyncThunk('GLType/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserCode:"001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddGLType}`, body);
  console.log("Create GL Type Response:", response);
  return response.data;
});







export const fetchGLType = createAsyncThunk('GLType/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetGLType}`, body);
  return response.data;
});


// Vendor Master 
export const createVendor = createAsyncThunk('Vendor/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserCode:"001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddVendor}`, body);
  console.log("Create Vendor Response:", response);
  return response.data;
});


export const fetchVendor = createAsyncThunk('Vendor/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetVendor}`, body);
  return response.data;
});




















// user 
export const createUser = createAsyncThunk('User/create', async (data) => {

  const response = await postData(`${AddUser}`, data);
  console.log("Create User Response:", response);
  return response.data; // make sure this is the actual data
});


export const fetchUser = createAsyncThunk('User/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetUser}`, body);
  return response.data;
});








export const updateLocation = createAsyncThunk(
  'master/updateLocation',
  async ({ locCode, data }) => {
    // Add LocCode to data explicitly
      const auth = getAuthInfo();
    const payload = { ...data, LocCode: locCode , UserCode: "001"|| '',
    ComCode: auth?.ComCode || '',};

    await postData('/SAM_AddUpdateDelLocationDetails', payload); // returns 204
    return payload; // return the sent payload manually
   
  }
 
);


// export const updateLocation = createAsyncThunk(
//   'master/updateLocation',
//   async ({ locCode, data }) => {
//     const auth = getAuthInfo();
//     const payload = {
//       ...data,
//       LocCode: locCode,
//       UserCode: "001",
//       ComCode: auth?.ComCode || '',
//     };

//     await postData('/SAM_AddUpdateDelLocationDetails', payload); // 204 response
//     // No need to return anything, because we'll fetch fresh list after this
//   }
// );


export const deleteLocation = createAsyncThunk(
  'master/deleteLocation',
  async (locCode,{ rejectWithValue }) => {
    const auth = getAuthInfo();

    const payload = {
      LocCode: locCode,
      Loc_Name: "",      // Empty values if not needed
      Loc_Desc: "",
      UserCode: "001",
      ComCode: auth?.ComCode || '',
      IsDelete: "1",     // Mark for deletion
    };

    try {
      const response = await postData('/SAM_AddUpdateDelLocationDetails', payload);
      if(response.errorCode!==200){
        console.log("no")
      }
      console.log(response.errorCode)
      return locCode; 
      
    } catch (err) {
      // Assuming API sends: { errorCode: 'E408', errorDescription: '...' }
      return rejectWithValue(err?.errorDescription || "Failed to delete");
    }
  }
);








