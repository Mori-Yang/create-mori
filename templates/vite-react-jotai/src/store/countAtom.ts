import { atom } from 'jotai';

const initialCount = 0;
// original atom
export const countAtom = atom(initialCount);

// write only atom
export const addCountAtom = atom(null, (get, set) => {
    set(countAtom, get(countAtom) + 1);
});

export const resetCountAtom = atom(null, (_, set) => {
    set(countAtom, initialCount);
});

export const subCountAtom = atom(null, (get, set) => {
    set(countAtom, get(countAtom) - 1);
});

// derived atom
export const doubleCountAtom = atom(get => get(countAtom) * 2);
