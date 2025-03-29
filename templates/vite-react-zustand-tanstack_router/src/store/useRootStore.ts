import { create } from 'zustand';
import type { CountSlice } from './slices/countSlice';
import createCountSlice from './slices/countSlice';

const useRootStore = create<CountSlice>()((...args) => ({
    ...createCountSlice(...args),
}));

export default useRootStore;
