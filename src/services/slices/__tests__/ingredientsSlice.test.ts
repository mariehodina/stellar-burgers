import { describe, it, expect } from '@jest/globals';
import { burgerIngredientsReducer, fetchBurgerIngredients } from '../burgerIngredientsSlice';

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

describe('burgerIngredientsSlice', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = burgerIngredientsReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('должен обработать fetchBurgerIngredients.pending', () => {
    const state = burgerIngredientsReducer(initialState, fetchBurgerIngredients.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обработать fetchBurgerIngredients.fulfilled', () => {
    const mockIngredients = [
      { _id: '1', name: 'Булка', type: 'bun', price: 100, proteins: 10, fat: 5, carbohydrates: 20, calories: 150, image: '', image_large: '', image_mobile: '' }
    ];
    const state = burgerIngredientsReducer(
      { ...initialState, isLoading: true },
      fetchBurgerIngredients.fulfilled(mockIngredients, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен обработать fetchBurgerIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const state = burgerIngredientsReducer(
      { ...initialState, isLoading: true },
      fetchBurgerIngredients.rejected(new Error(errorMessage), '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});