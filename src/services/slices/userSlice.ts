import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, getUserApi } from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

export const login = createAsyncThunk('user/login', async (data: { email: string; password: string }) => {
  const res = await loginUserApi(data);
  setCookie('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const checkAuth = createAsyncThunk('user/check', getUserApi);

const initialState = {
  user: null as { email: string; name: string } | null,
  isAuth: false as boolean,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      });
  },
});

export default userSlice.reducer;