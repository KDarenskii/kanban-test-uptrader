import { store } from "./store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface TypedAction<T = string> {
    type: T;
}

export interface PayloadAction<T, P> extends TypedAction<T> {
    payload: P;
}
