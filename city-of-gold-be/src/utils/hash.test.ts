import { hashPassword } from './hash';
import bcrypt from 'bcrypt';

describe('hashPassword utility', () => {
  test('should return a hashed string', async () => {
    const password = 'mysecret';
    const hashed = await hashPassword(password);

    expect(typeof hashed).toBe('string');
    const match = await bcrypt.compare(password, hashed);
    expect(match).toBe(true);
  });
});
