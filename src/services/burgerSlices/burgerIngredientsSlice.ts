import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export const fetchBurgerIngredients = createAsyncThunk<TIngredient[]>(
  'ingredientsBurger/fetchBurgerIngredients',
  getIngredientsApi
);

type TBurgerIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const burgerIngredientsSlice = createSlice({
  name: 'ingredientsBurger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchBurgerIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;