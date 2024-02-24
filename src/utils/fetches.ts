import { baseUrl, checkResponse } from './constants';

type TRequestOptions = {
  method: 'POST' | 'GET' | 'PATCH';
  mode: RequestMode | undefined;
  cache: RequestCache | undefined;
  credentials: RequestCredentials | undefined;
  redirect: RequestRedirect | undefined;
  referrerPolicy: ReferrerPolicy | undefined;
  headers: {
    'Content-Type': 'application/json';
    Authorization?: string;
  };
  body?: any;
};

export const getPosts = async () => {
  const requestOptions: TRequestOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' },
  };

  const res = await fetch(`${baseUrl}/posts`, requestOptions);
  return checkResponse(res);
};

export const getUsers = async () => {
  const requestOptions: TRequestOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' },
  };

  const res = await fetch(`${baseUrl}/users`, requestOptions);
  return checkResponse(res);
};

export const getComments = async () => {
  const requestOptions: TRequestOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' },
  };

  const res = await fetch(`${baseUrl}/comments`, requestOptions);
  return checkResponse(res);
};
