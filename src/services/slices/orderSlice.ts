import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '@api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

type TOrderState = {
  isOrderRequesting: boolean;
  orderDetails: { number: number } | null;
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  isOrderRequesting: false,
  orderDetails: null,
  currentOrder: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderDetails = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isOrderRequesting = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isOrderRequesting = false;
        state.orderDetails = { number: action.payload.number };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isOrderRequesting = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка получения заказа';
      });
  }
});

export const { clearOrder, clearCurrentOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;