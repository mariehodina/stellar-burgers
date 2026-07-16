import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

export const fetchBurgerFeeds = createAsyncThunk(
  'feedBurger/fetchBurgerFeeds',
  getFeedsApi
);

type TBurgerFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TBurgerFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const burgerFeedSlice = createSlice({
  name: 'feedBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBurgerFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchBurgerFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      });
  }
});

export const burgerFeedReducer = burgerFeedSlice.reducer;