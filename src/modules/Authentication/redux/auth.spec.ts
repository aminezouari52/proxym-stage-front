import { initialState } from '.';

import { IReduxUser } from 'models';

describe('Auth slice test', () => {
  it('Should return a correct initial state', () => {
    expect(initialState).toEqual({
      users: [],
    } as IReduxUser.IInitialState);
  });
});
