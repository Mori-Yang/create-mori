import { create } from "zustand";
import createCountSlice, { CountSlice } from "./slices/countSlice";

const useRootStore = create<CountSlice>()((...args) => ({
    ...createCountSlice(...args),
}));

export default useRootStore;
