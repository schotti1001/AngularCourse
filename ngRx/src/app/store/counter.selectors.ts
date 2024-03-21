import { createSelector } from "@ngrx/store";

export const selectCount = (state: {counter: number}) => state.counter;
export const selectDoubleCount = createSelector(
    selectCount, //input for 2. argument is output of 1. argument
    (state) => state * 2
)