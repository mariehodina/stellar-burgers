import { combineReducers } from '@reduxjs/toolkit';
import { burgerIngredientsReducer } from './burgerIngredientsSlice';
import { burgerUserReducer } from './burgerUserSlice';
import { burgerConstructorReducer } from './burgerConstructorSlice';
import { burgerOrderReducer } from './burgerOrderSlice';
import { burgerFeedReducer } from './burgerFeedSlice';
import { burgerOrdersReducer } from './burgerArchiveSlice';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: burgerOrderReducer,
  orders: burgerOrdersReducer,
  user: burgerUserReducer,
  feed: burgerFeedReducer
});
