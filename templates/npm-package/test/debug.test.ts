import { expect, describe, it } from 'vitest';
import { sum } from '../src';

describe('should', () => {
  it('sum', () => {
    expect(sum(1, 2)).toMatchInlineSnapshot(`3`);
  });
});
