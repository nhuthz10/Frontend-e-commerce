import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userSlice from "./userSlice";
import paginationSlice from "./paginationSlice";
import productSlice from "./productSlice";
import adminSlice from "./adminSlice";
import searchSlice from "./searchSlice";
import orderSlice from "./orderSlice";
import cartSlice from "./cartSlice";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["login", "userInfo", "favourites", "cartId"],
};

const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userSlice),
    order: orderSlice,
    cart: cartSlice,
    pagination: paginationSlice,
    product: productSlice,
    search: searchSlice,
    admin: adminSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
