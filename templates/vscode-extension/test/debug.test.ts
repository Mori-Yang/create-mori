import { describe, expect, test } from 'vitest';

function sum(a: number, b: number) {
    return a + b;
}

describe('debug', () => {
    test('sum', () => {
        expect(sum(1, 2)).toMatchInlineSnapshot(`3`);
    });
});
