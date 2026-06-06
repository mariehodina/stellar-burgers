import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

interface IIngredientsState {
  items: TIngredient[];
  loading: boolean;
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  getIngredientsApi
);

const initialState: IIngredientsState = {
  items: [],
  loading: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default ingredientsSlice.reducer;