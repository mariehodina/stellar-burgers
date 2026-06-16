import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './ingredientsSlice';
import { userReducer } from './userSlice';
import { constructorReducer } from './constructorSlice';
import { orderReducer } from './orderSlice';
import { feedReducer } from './feedSlice';
import { ordersReducer } from './ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  orders: ordersReducer
});