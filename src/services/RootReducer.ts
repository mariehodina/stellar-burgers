import { combineReducers } from '@reduxjs/toolkit';
import { burgerIngredientsReducer } from './burgerSlices/burgerIngredientsSlice';
import { burgerUserReducer } from './burgerSlices/burgerUserSlice';
import { burgerConstructorReducer } from './burgerSlices/burgerConstructorSlice';
import { burgerOrderReducer } from './burgerSlices/burgerOrderSlice';
import { burgerFeedReducer } from './burgerSlices/burgerFeedSlice';
import { burgerOrdersReducer } from './burgerSlices/burgerArchiveSlice';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  user: burgerUserReducer,
  burgerConstructor: burgerConstructorReducer,
  order: burgerOrderReducer,
  feed: burgerFeedReducer,
  orders: burgerOrdersReducer
});