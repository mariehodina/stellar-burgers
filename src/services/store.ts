import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
<<<<<<< HEAD

=======
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
import { rootReducer } from './RootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
<<<<<<< HEAD

=======
>>>>>>> 5613f3f6626cc344f1142a6387d582e391da6776
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
