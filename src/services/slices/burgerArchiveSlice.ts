import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '@api';

export const getBurgerOrders = createAsyncThunk(
  'burgerOrders/getBurgerOrders',
  getOrdersApi
);

export const getBurgerOrderByNumber = createAsyncThunk(
  'burgerOrders/getBurgerOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

type TBurgerOrdersState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TBurgerOrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

const burgerOrdersSlice = createSlice({
  name: 'burgerOrders',
  initialState,
  reducers: {
    clearBurgerCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBurgerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getBurgerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      })
      .addCase(getBurgerOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBurgerOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getBurgerOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearBurgerCurrentOrder } = burgerOrdersSlice.actions;
export const burgerOrdersReducer = burgerOrdersSlice.reducer;
