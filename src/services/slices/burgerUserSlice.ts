import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TBurgerUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginError: string | null;
  isLoginLoading: boolean;
};

const initialState: TBurgerUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginError: null,
  isLoginLoading: false
};

export const registerBurgerUser = createAsyncThunk(
  'burgerUser/registerBurgerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginBurgerUser = createAsyncThunk(
  'burgerUser/loginBurgerUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutBurgerUser = createAsyncThunk(
  'burgerUser/logoutBurgerUser',
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const getBurgerUser = createAsyncThunk(
  'burgerUser/getBurgerUser',
  async () => {
    const response = await getUserApi();
    return response.user;
  }
);

export const updateBurgerUserData = createAsyncThunk(
  'burgerUser/updateBurgerUser',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);

const burgerUserSlice = createSlice({
  name: 'burgerUser',
  initialState,
  reducers: {
    authBurgerChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerBurgerUser.pending, (state) => {
        state.isLoginLoading = true;
        state.loginError = null;
      })
      .addCase(registerBurgerUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.error.message || 'Ошибка при регистрации';
        state.isAuthChecked = true;
      })
      .addCase(registerBurgerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoginLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginBurgerUser.pending, (state) => {
        state.isLoginLoading = true;
        state.loginError = null;
      })
      .addCase(loginBurgerUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.error.message || 'Ошибка при входе в аккаунт';
        state.isAuthChecked = true;
      })
      .addCase(loginBurgerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoginLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(logoutBurgerUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(getBurgerUser.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(getBurgerUser.rejected, (state) => {
        state.isLoginLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(getBurgerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoginLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateBurgerUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { authBurgerChecked } = burgerUserSlice.actions;
export const burgerUserReducer = burgerUserSlice.reducer;
