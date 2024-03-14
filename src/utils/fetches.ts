import { type PostBody } from 'slices/postsTypes';
import { baseUrl, checkResponse } from './constants';

type TRequestOptions = {
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
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

export const deletePost = async (postId: number) => {
  const requestOptions: TRequestOptions = {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' },
  };

  const res = await fetch(`${baseUrl}/posts/${postId}`, requestOptions);
  return checkResponse(res);
};

export const postPost = async (postBody: PostBody) => {
  const requestOptions: TRequestOptions = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: postBody.title,
      body: postBody.content,
      userId: 1,
    }),
  };

  const res = await fetch(`${baseUrl}/posts`, requestOptions);
  return checkResponse(res);
};
