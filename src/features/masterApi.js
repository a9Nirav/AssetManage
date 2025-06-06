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



export const getlogin = createAsyncThunk('getlogin', async (formData) => {
  const response = await postData(`${GetLogin}`,formData);
  return response;
})

// Fetch all locations
export const fetchLocations = createAsyncThunk('location/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetLocation}`, body);
  console.log(response)
  console.log(body)
  return response.Data;

});





export const deleteLocation = createAsyncThunk(
  'master/deleteLocation',
  async ({ locCode, data }, { rejectWithValue }) => {
    const auth = getAuthInfo();

    const payload = {
      ...data,
      LocCode: locCode,
      UserCode: "001",
      ComCode: auth?.ComCode || '',
      IsDelete: "1",
    };

    try {
      const response = await postData('/SAM_AddUpdateDelLocationDetails', payload);

      if (response?.ErrorCode !== "200") {
        return rejectWithValue(response?.ErrorDescription || "Failed to delete");
      }

      return { ...response, LocCode: locCode };
    } catch (err) {
      return rejectWithValue("Delete failed");
    }
  }
);








export const createLocation = createAsyncThunk('location/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserCode: "001",
    ComCode: auth?.ComCode || '',

    ...formData, // merge formData into body
  };


  const response = await postData(`${AddLocation}`, body);
  console.log("Create Location Response:", response);
  return response; // make sure this is the actual data
});


export const updateLocation = createAsyncThunk(
  'master/updateLocation',
  async ({ locCode, data }) => {
    // Add LocCode to data explicitly
    const auth = getAuthInfo();
    const payload = {
      ...data, LocCode: locCode, UserCode: "001" || '',
      ComCode: auth?.ComCode || '',
    };

    const ans = await postData('/SAM_AddUpdateDelLocationDetails', payload); // returns 204
    console.log(ans.ErrorDescription)
    return ans; // return the sent payload manually

  }

);


export const updateDept = createAsyncThunk(
  'master/updateDept',
  async ({ DeptCode, data }) => {
    // Add LocCode to data explicitly
    const auth = getAuthInfo();
    const payload = {
      ...data, DeptCode: DeptCode, UserCode: "001" || '',
      ComCode: auth?.ComCode || '',
    };

    const ans = await postData(`${AddDept}`, payload); 
    console.log(ans.ErrorDescription)
    return ans; // return the sent payload manually

  } 

);








// dept 

export const createDept = createAsyncThunk('Dept/create', async (formData,{rejectWithValue}) => {
  const auth = getAuthInfo();
  const body = {
    // UserCode: auth?.UserId || '',
    UserCode: "001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };


  const response = await postData(`${AddDept}`, body);
  console.log(response)

    
  console.log("Create Dept Response:", response)
   
  return response

 // make sure this is the actual data
});




export const fetchDept = createAsyncThunk('Dept/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: auth?.UserId || '',
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetDept}`, body);
  console.log(response.Data)
  return response.Data;
});





// Divistion 
export const createDivi = createAsyncThunk('Divi/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserId: "001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddDivi}`, body);
  console.log("Create Division Response:", response);
  return response;
});



export const updateDivi = createAsyncThunk(
  'master/updateDivi',
  async ({ DivCode, data }) => {
    // Add LocCode to data explicitly
    const auth = getAuthInfo();
    const payload = {
      ...data, DivCode: DivCode, UserCode: "001" || '',
      ComCode: auth?.ComCode || '',
    };

    const ans = await postData(`${AddDivi}`, payload); // returns 204
    console.log(ans.ErrorDescription)
    return ans; // return the sent payload manually

  }

);




export const deleteDiVi = createAsyncThunk(
  'master/deleteDiVi',
  async ({ DivCode, LocCode }, { rejectWithValue }) => {
    const auth = getAuthInfo();

    const payload = {
     
      DivCode: DivCode,
      LocCode:LocCode,
      UserCode: "001",
      ComCode: auth?.ComCode || '',
      DeleteStatus: "1",
    };

    try {
      const response = await postData(`${AddDivi}`, payload);

      if (response?.ErrorDetails.ErrorCode !== "200") {
        return rejectWithValue(response?.ErrorDetails.ErrorDescription || "Failed to delete");
      }

      return  response;
    } catch (err) {
      return rejectWithValue("Delete failed");
    }
  }
);



export const fetchDivi = createAsyncThunk('Divi/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: "001",
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetDivi}`, body);
  return response.Data;
});


// Tax Master 
export const createTaxMaster = createAsyncThunk('Tax/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserCode: "001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddTax}`, body);
  console.log("Create TaxMaster Response:", response);
  return response;
});


export const fetchTaxMaster = createAsyncThunk('Tax/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: "001",
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetTax}`, body);
  return response.Data;
});




export const updateTaxMaster = createAsyncThunk(
  'master/updateTaxMaster',
  async ({ Taxid, data }) => {
    // Add LocCode to data explicitly
    const auth = getAuthInfo();
    const payload = {
      ...data, Taxid: Taxid, UserCode: "001" || '',
      ComCode: auth?.ComCode || '',
    };



    const ans = await postData(`${AddTax}`, payload); // returns 204
    console.log(ans.ErrorDetails.ErrorDescription)
    return ans; // return the sent payload manually

  }

);


export const deleteTaxMaster = createAsyncThunk(
  'master/deleteTaxMaster',
  async ({ Taxid, data }, { rejectWithValue }) => {
    const auth = getAuthInfo();

    const payload = {
      ...data,
      Taxid,
      UserCode: "001",
      ComCode: auth?.ComCode || '',
      DeleteStatus: 1,
    };

    try {
      const response = await postData(`${AddTax}`, payload);
      console.log(response)
      console.log(payload)

      if (response?.ErrorDetails.ErrorCode !== "200") {
        return rejectWithValue(response?.ErrorDetails.ErrorDescription || "Failed to delete");
      }

      return { ...response, Taxid };
    } catch (err) {
      return rejectWithValue("Delete failed");
    }
  }
);











// GL type 
export const createGLType = createAsyncThunk('GLType/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserCode: "001",
    ComCode: auth?.ComCode || '',
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddGLType}`, body);
  console.log("Create GL Type Response:", response);
  return response;
});




export const updateGLType = createAsyncThunk(
  'master/updateDivi',
  async ({ AccountCode, data }) => {
    // Add LocCode to data explicitly
    const auth = getAuthInfo();
    const payload = {
      ...data, AccountCode: AccountCode, UserCode: "001" || '',
      ComCode: auth?.ComCode || '',
    };

    const ans = await postData(`${AddGLType}`, payload); // returns 204
    console.log(ans.ErrorDescription)
    return ans; // return the sent payload manually

  }

);


export const deleteGLType = createAsyncThunk(
  'master/deleteGLType',
  async ({ AccountCode, data }, { rejectWithValue }) => {
    const auth = getAuthInfo();

    const payload = {
      ...data,
      AccountCode: AccountCode,
      UserCode: "001",
      ComCode: auth?.ComCode || '',
      DeleteStatus: "1",
    };

    try {
      const response = await postData(`${AddGLType}`, payload);

      if (response?.ErrorDetails.ErrorCode !== "200") {
        return rejectWithValue(response?.ErrorDetails.ErrorDescription || "Failed to delete");
      }

      return { ...response, AccountCode: AccountCode };
    } catch (err) {
      return rejectWithValue("Delete failed");
    }
  }
);







export const fetchGLType = createAsyncThunk('GLType/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserId: "001",
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetGLType}`, body);
  return response.Data;
});


// Vendor Master 
export const createVendor = createAsyncThunk('Vendor/create', async (formData) => {
  const auth = getAuthInfo();
  const body = {
    // UserId: auth?.UserId || '',
    UserCode: "001",
    ComCode: auth?.ComCode || '',
     DeleteStatus: 0,
    ...formData, // merge formData into body
  };
  const response = await postData(`${AddVendor}`, body);
  console.log("Create Vendor Response:", response);
  return response;
});


export const fetchVendor = createAsyncThunk('Vendor/fetchAll', async () => {
  const auth = getAuthInfo();
  const body = {
    UserCode: "001",
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetVendor}`, body);
  return response.Data;
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
    UserCode: "001",
    ComCode: auth?.ComCode || '',
  };
  const response = await postData(`${GetUser}`, body);
  return response.Data;
});



















