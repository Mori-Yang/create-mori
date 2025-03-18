import { StateCreator } from 'zustand';

export interface CountSlice {
    count: number
    doubleCount: () => number
    resetCount: () => void
    addCount: () => void
    subCount: () => void
}

const initialCount = 0;
const createCountSlice: StateCreator<CountSlice> = (set, get) => ({
    count: initialCount,
    doubleCount: () => get().count * 2,
    resetCount: () => set({ count: initialCount }),
    addCount: () => set(state => ({ count: state.count + 1 })),
    subCount: () => set(state => ({ count: state.count - 1 })),
});

export default createCountSlice;
