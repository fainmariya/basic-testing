// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = { a: 1, b: 'test' };
    await expect(resolveValue(value)).resolves.toBe(value);
  });
  });

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'Custom error message';
    expect(() => throwError(msg)).toThrow(msg);
    
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    })
  });


describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    });
  
  });
