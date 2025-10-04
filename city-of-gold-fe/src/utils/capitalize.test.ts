// src/utils/capitalize.test.ts
import { capitalize } from './capitalize';

test('capitalize should uppercase the first letter', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('world')).toBe('World');
  expect(capitalize('')).toBe('');
});
