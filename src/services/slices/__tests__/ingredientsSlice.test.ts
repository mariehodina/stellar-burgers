import {
  burgerIngredientsReducer,
  fetchBurgerIngredients
} from '../burgerIngredientsSlice';

describe('Тесты редьюсера burgerIngredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const mockIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  };

  const mockIngredients = [
    mockIngredient,
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
    }
  ];

  test('Инициализация с undefined и неизвестным экшеном возвращает начальное состояние', () => {
    const state = burgerIngredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(initialState);
  });

  test('При неизвестном экшене возвращается текущее состояние', () => {
    const currentState = {
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    };
    const state = burgerIngredientsReducer(currentState, {
      type: 'UNKNOWN_ACTION'
    });
    expect(state).toEqual(currentState);
  });

  test('fetchBurgerIngredients.pending устанавливает isLoading в true и сбрасывает ошибку', () => {
    const action = { type: fetchBurgerIngredients.pending.type };
    const state = burgerIngredientsReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  test('fetchBurgerIngredients.fulfilled загружает ингредиенты и сбрасывает isLoading', () => {
    const action = {
      type: fetchBurgerIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = burgerIngredientsReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.ingredients).toHaveLength(2);
  });

  test('fetchBurgerIngredients.fulfilled обрабатывает пустой массив', () => {
    const action = {
      type: fetchBurgerIngredients.fulfilled.type,
      payload: []
    };
    const state = burgerIngredientsReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  test('fetchBurgerIngredients.rejected устанавливает ошибку и сбрасывает isLoading', () => {
    const errorMessage = 'Network error';
    const action = {
      type: fetchBurgerIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = burgerIngredientsReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toEqual([]);
  });

  test('fetchBurgerIngredients.rejected использует дефолтное сообщение, если message отсутствует', () => {
    const action = {
      type: fetchBurgerIngredients.rejected.type,
      error: {}
    };
    const state = burgerIngredientsReducer(
      { ...initialState, isLoading: true },
      action
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
    expect(state.ingredients).toEqual([]);
  });
});
