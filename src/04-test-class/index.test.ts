// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, InsufficientFundsError,
  
  SynchronizationFailedError,} from './index';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

const mockedRandom = random as jest.MockedFunction<typeof random>;



describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    


    const account = getBankAccount(100);

  expect(account).toBeInstanceOf(BankAccount);
  expect(account.getBalance()).toBe(100);
  }); 

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError) 
  });

  test('should throw error when transferring more than balance', () => {
    const from = new BankAccount(50);
  const to = new BankAccount(0);

  expect(() => from.transfer(100, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const toAccount = new BankAccount(50);
    expect(()=>toAccount.transfer(50,toAccount)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = new BankAccount(50);
    account.deposit(100)
    expect(account.getBalance()).toBe(150)
   
  });

  test('should withdraw money', () => {
    const account = new BankAccount(150);
    account.withdraw(100)
    expect(account.getBalance()).toBe(50)
  });

  test('should transfer money', () => {
    const fromAccount = new BankAccount(50);
    const toAccount = new BankAccount(0);
    fromAccount.transfer(30,toAccount)
    expect(fromAccount.getBalance()).toBe(20)
    expect(toAccount.getBalance()).toBe(30)
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    mockedRandom.mockReturnValueOnce(42).mockReturnValueOnce(1)
    const account = new BankAccount(50);
    const res = await account.fetchBalance()
    expect(res).toBe(42);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    mockedRandom.mockReturnValueOnce(42).mockReturnValueOnce(1)
    const account = new BankAccount(50);
    await account.synchronizeBalance();

  expect(account.getBalance()).toBe(42);
    
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    mockedRandom.mockReturnValueOnce(42).mockReturnValueOnce(0)
    const account = new BankAccount(50);
    
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    expect(account.getBalance()).toBe(50); 
 
  });
  });

