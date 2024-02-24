export const baseUrl = 'https://jsonplaceholder.typicode.com';

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};
