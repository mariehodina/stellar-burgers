import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect: (state) => {
      state.loading = true;
    },
    wsOpen: (state) => {
      state.loading = false;
    },
    wsMessage: (state, action: PayloadAction<{ orders: TOrder[]; total: number; totalToday: number }>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsError: (state) => {
      state.loading = false;
    },
  },
});

export const { wsConnect, wsOpen, wsMessage, wsError } = feedSlice.actions;
export default feedSlice.reducer;