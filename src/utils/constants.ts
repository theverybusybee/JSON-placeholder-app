export const baseUrl = 'https://jsonplaceholder.typicode.com';

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const generateId = (): string => {
  return (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
  );
};

export const handlePostsAmount = (postsNumber: string) => {
  localStorage.setItem('postsAmount', postsNumber);
};

export const modalRoot = document.querySelector('#react-modals');
