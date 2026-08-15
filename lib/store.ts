import { configureStore } from "@reduxjs/toolkit";
import { paymentReducer } from "@/lib/features/paymentSlice";
import { plansReducer } from "@/lib/features/plansSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      payment: paymentReducer,
      plans: plansReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
