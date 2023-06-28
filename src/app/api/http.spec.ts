/* eslint-disable @typescript-eslint/no-empty-function */
import { getToken } from '.';

describe('HTTP test', () => {
  it('Should return a token', () => {
    expect(getToken()).toEqual('123');
  });

  it('Should return a null token', () => {
    expect(getToken()).toEqual(null);
  });

  it('Should return a data when use server side fetch', () => {});

  it('Should return a data when use client side fetch', () => {});
});
