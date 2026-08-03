import { combineReducers } from '@reduxjs/toolkit';
import { burgerIngredientsReducer } from './slices/burgerIngredientsSlice';
import { burgerUserReducer } from './slices/burgerUserSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { burgerOrderReducer } from './slices/burgerOrderSlice';
import { burgerFeedReducer } from './slices/burgerFeedSlice';
import { burgerOrdersReducer } from './slices/burgerArchiveSlice';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerUser: burgerUserReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerOrder: burgerOrderReducer,
  burgerFeed: burgerFeedReducer,
  burgerOrders: burgerOrdersReducer
});
