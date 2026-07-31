import { describe, it, expect } from '@jest/globals';
import { burgerConstructorReducer } from '../burgerConstructorSlice';
import {
  addBurgerIngredient,
  removeBurgerIngredient,
  moveBurgerIngredient,
  clearBurgerConstructor
} from '../burgerConstructorSlice';

const initialState = {
  bun: null,
  ingredients: []
};

const mockBun = {
  _id: '1',
  name: 'Краторная булка',
  type: 'bun',
  price: 100,
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mockIngredient = {
  _id: '2',
  name: 'Биокотлета',
  type: 'main',
  price: 50,
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  image: '',
  image_large: '',
  image_mobile: '',
  id: 'test-id-1'
};

describe('burgerConstructorSlice', () => {
  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = burgerConstructorReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('должен добавить булку', () => {
    const state = burgerConstructorReducer(
      initialState,
      addBurgerIngredient(mockBun)
    );
    expect(state.bun).toEqual(
      expect.objectContaining({
        _id: '1',
        name: 'Краторная булка',
        type: 'bun'
      })
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен добавить начинку', () => {
    const state = burgerConstructorReducer(
      initialState,
      addBurgerIngredient(mockIngredient)
    );
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        _id: '2',
        name: 'Биокотлета',
        type: 'main'
      })
    );
  });

  it('должен удалить начинку', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: 'test-id-1' }]
    };
    const state = burgerConstructorReducer(
      stateWithIngredient,
      removeBurgerIngredient(0)
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен очистить конструктор', () => {
    const stateWithItems = {
      bun: mockBun,
      ingredients: [{ ...mockIngredient, id: 'test-id-1' }]
    };
    const state = burgerConstructorReducer(
      stateWithItems,
      clearBurgerConstructor()
    );
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен переместить начинку', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: '1', name: 'Первый' },
        { ...mockIngredient, id: '2', name: 'Второй' }
      ]
    };
    const state = burgerConstructorReducer(
      stateWithIngredients,
      moveBurgerIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });
});
