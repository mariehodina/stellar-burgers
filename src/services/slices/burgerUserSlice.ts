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
  authError: string | null; // ← переименовано
  isAuthLoading: boolean; // ← переименовано
};

const initialState: TBurgerUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  authError: null,
  isAuthLoading: false
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
      // Регистрация
      .addCase(registerBurgerUser.pending, (state) => {
        state.isAuthLoading = true;
        state.authError = null;
      })
      .addCase(registerBurgerUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message || 'Ошибка при регистрации';
        state.isAuthChecked = true;
      })
      .addCase(registerBurgerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      // Вход
      .addCase(loginBurgerUser.pending, (state) => {
        state.isAuthLoading = true;
        state.authError = null;
      })
      .addCase(loginBurgerUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.error.message || 'Ошибка при входе в аккаунт';
        state.isAuthChecked = true;
      })
      .addCase(loginBurgerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      // Выход
      .addCase(logoutBurgerUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      // Получение пользователя
      .addCase(getBurgerUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(getBurgerUser.rejected, (state) => {
        state.isAuthLoading = false;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(getBurgerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      // Обновление
      .addCase(updateBurgerUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { authBurgerChecked } = burgerUserSlice.actions;
export const burgerUserReducer = burgerUserSlice.reducer;
