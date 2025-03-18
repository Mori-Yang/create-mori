import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

const initialCount = 0;
// original atom
export const countAtom = atomWithReset(initialCount);

// write only atom
export const addCountAtom = atom(null, (get, set) => {
    set(countAtom, get(countAtom) + 1);
});

export const subCountAtom = atom(null, (get, set) => {
    set(countAtom, get(countAtom) - 1);
});

// derived atom
export const doubleCountAtom = atom(get => get(countAtom) * 2);
