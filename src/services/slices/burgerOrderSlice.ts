import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const createBurgerOrder = createAsyncThunk(
  'burgerOrder/createBurgerOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

type TBurgerOrderState = {
  orderRequest: boolean;
  orderModalData: { number: number } | null;
  error: string | null;
};

const initialState: TBurgerOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const burgerOrderSlice = createSlice({
  name: 'burgerOrder',
  initialState,
  reducers: {
    clearBurgerOrder: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurgerOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createBurgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = { number: action.payload.number };
      })
      .addCase(createBurgerOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const { clearBurgerOrder } = burgerOrderSlice.actions;
export const burgerOrderReducer = burgerOrderSlice.reducer;
