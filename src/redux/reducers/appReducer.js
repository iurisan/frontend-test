import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_ENDPOINT = 'https://run.mocky.io/v3/1c9c285d-7388-435c-a0ec-08b4e969b51d';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isAuthenticated: false,
    patients: [],
    loading: false,
    error: null
  },
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.patients = action.payload?.patients;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { signInStart, signInSuccess, signInFailure } = appSlice.actions;

export const signIn = (params) => async (dispatch) => {
  dispatch(signInStart());
  try {
    const response = await axios.get(API_ENDPOINT, { params });
    dispatch(signInSuccess(response.data));
  } catch (error) {
    window.alert('Something went wrong!', error);
    dispatch(signInFailure(error.response.data));
  }
};

export default appSlice.reducer;
