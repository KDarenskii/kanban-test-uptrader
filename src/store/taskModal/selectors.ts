import { RootState } from "store/types";

export const selectModalTask = (state: RootState) => {
    return state.taskModalReducer;
};
