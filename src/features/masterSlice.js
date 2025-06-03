// src/features/location/MasterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLocations, createLocation, updateLocation, getlogin, createUser,
  fetchUser, createDept, createDivi, fetchDivi, fetchDept, createTaxMaster, fetchTaxMaster, createGLType, fetchGLType, createVendor, deleteLocation
  , fetchVendor
} from './masterApi';

const MasterSlice = createSlice({
  name: 'location',
  initialState: {
    locations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create location 
      //   .addCase(createLocation.fulfilled, (state, action) => {
      //     state.locations.push(action.payload);
      //   })

      .addCase(createLocation.fulfilled, (state, action) => {
        if (action.payload) {
          state.locations.push(action.payload); // push actual location object
        }
      })

      // user 
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user.push(action.payload); // push actual user object
        }
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })


      // Update
      // .addCase(updateLocation.fulfilled, (state, action) => {
      //   const index = state.locations.findIndex(loc => loc.rowNo === action.payload.rowNo);
      //   if (index !== -1) {
      //     state.locations[index] = action.payload;
      //   }
      // })

      //  .addCase(updateLocation.fulfilled, (state, action) => {
      //   const updated = action.payload;
      //   const index = state.locations.findIndex((loc) => loc.locCode === updated.LocCode);
      //   if (index !== -1) {
      //     state.locations[index] = {
      //       ...state.locations[index],
      //       locName: updated.Loc_Name,
      //       locDesc: updated.Loc_Desc,
      //     };
      //   }
      // })


      .addCase(updateLocation.fulfilled, (state, action) => {
        const updatedLocation = action.payload;
        const index = state.locations.findIndex(
          (loc) => loc.locCode === updatedLocation.LocCode || loc.LocCode === updatedLocation.LocCode
        );
        if (index !== -1) {
          state.locations[index] = {
            ...state.locations[index],
            ...updatedLocation,
          }
        }

      })



.addCase(deleteLocation.fulfilled, (state, action) => {
  const deletedLocCode = action.payload?.LocCode;
  if (deletedLocCode) {
    state.locations = state.locations.filter(loc => loc.LocCode !== deletedLocCode);
  }
})


      // .addCase(deleteLocation.fulfilled, (state, action) => {
      //   // const deletedLocCode = action.payload?.LocCode;
      //   // state.locations = state.locations.filter(
      //   //   (loc) => loc.LocCode !== deletedLocCode
      //   // );
      //   // console.log(state.locations)
      //   state.action=action.payload
      // })































      // dept 
      .addCase(createDept.fulfilled, (state, action) => {
        if (action.payload) {
          state.Dept.push(action.payload); // push actual user object
        }
      })

    .addCase(fetchDept.fulfilled, (state, action) => {
      state.loading = false;
      state.Depts = action.payload;
    })

    // Divistion 
    .addCase(createDivi.fulfilled, (state, action) => {
      if (action.payload) {
        state.divi.push(action.payload); // push actual user object
      }
    })

    .addCase(fetchDivi.fulfilled, (state, action) => {
      state.loading = false;
      state.divis = action.payload;
    })


    // tax Master 
    .addCase(createTaxMaster.fulfilled, (state, action) => {
      if (action.payload) {
        state.taxMaster.push(action.payload); // push actual user object
      }
    })

    .addCase(fetchTaxMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.Taxs = action.payload;
    })

    // GL Type 
    .addCase(createGLType.fulfilled, (state, action) => {
      if (action.payload) {
        state.taxMaster.push(action.payload); // push actual user object
      }
    })

    .addCase(fetchGLType.fulfilled, (state, action) => {
      state.loading = false;
      state.GLTypes = action.payload;
    })


    // Vendor 
    .addCase(createVendor.fulfilled, (state, action) => {
      if (action.payload) {
        state.taxMaster.push(action.payload);
      }
    })

    .addCase(fetchVendor.fulfilled, (state, action) => {
      state.loading = false;
      state.Vendors = action.payload;
    })











    //   login
    // .addCase(getlogin.fulfilled, (state, action) => {
    //     // state.locations.push(action.payload);
    //     state.loading = false;
    //     state.logindata = action.payload.data;
    //   })
    .addCase(getlogin.fulfilled, (state, action) => {
      const loginData = action.payload.data;
      state.loginData = loginData;
      console.log(loginData)

      // Store in localStorage
      localStorage.setItem('auth', JSON.stringify({
        UserId: loginData.userName,
        ComCode: loginData.currentCompany
      }));
    });












},
});

export default MasterSlice.reducer;
