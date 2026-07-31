import { combineReducers } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { burgerIngredientsReducer } from './slices/burgerIngredientsSlice';
import { burgerUserReducer } from './slices/burgerUserSlice';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice';
import { burgerOrderReducer } from './slices/burgerOrderSlice';
import { burgerFeedReducer } from './slices/burgerFeedSlice';
import { burgerOrdersReducer } from './slices/burgerArchiveSlice';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  user: burgerUserReducer,
  burgerConstructor: burgerConstructorReducer,
  order: burgerOrderReducer,
  feed: burgerFeedReducer,
  orders: burgerOrdersReducer
=======
import { ingredientsReducer } from './slices/ingredientsSlice';
import { userReducer } from './slices/userSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';
import { ordersReducer } from './slices/ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  orders: ordersReducer
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
});
