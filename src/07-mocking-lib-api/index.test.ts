// Uncomment the code below and write your tests
import axios, { AxiosHeaders } from 'axios';
import { throttledGetDataFromApi } from './index'; 
jest.mock('axios');//tell Jest that the 'axios' module should be mocked
jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

  const mockedAxios = axios as jest.Mocked<typeof axios>;//// Cast the imported axios to a "mocked" type
  // so that it has mock methods (create, etc.)
describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    // clear all mock calls/configuration before each test
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {

  // 1. Prepare a mock for axiosClient.get
  const getMock = jest.fn().mockResolvedValue({ data: {} });

  //Configure axios.create so that it returns our “client”
  mockedAxios.create.mockReturnValue({
    get:getMock,} as any);

  const relativePath = '/posts/123';

  //Call the function under test
  await throttledGetDataFromApi(relativePath)

  //Verify that axios.create was called with the correct baseURL
  expect(mockedAxios.create).toHaveBeenCalledTimes(1);
    expect(mockedAxios.create).toHaveBeenCalledWith({baseURL: 'https://jsonplaceholder.typicode.com'});
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({ data: {} });

    mockedAxios.create.mockReturnValue({
      get: getMock,
    } as any);

    const relativePath = '/posts/123';

    await throttledGetDataFromApi(relativePath);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(relativePath);
  });
  

  test('should return response data', async () => {

  const responseData = {id:1, title:'Test number 1'}
  const headers = new AxiosHeaders({
    'Content-Type': 'application/json',
  });
    // 1. Prepare a mock for axiosClient.get
  const getMock = jest.fn().mockResolvedValue({ data: responseData, headers });

  //Configure axios.create so that it returns our “client”
  mockedAxios.create.mockReturnValue({get:getMock} as any);
  const result = await throttledGetDataFromApi('/posts/1');

    
    expect(result).toEqual(responseData );
  });
});
