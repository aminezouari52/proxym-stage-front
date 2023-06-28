import store from 'app/store';
import { initialState, userAPI } from '.';

import { IReduxUser } from 'models';

describe('User slice test', () => {
  it('Should return a correct initial state', () => {
    expect(initialState).toEqual({
      users: [],
    } as IReduxUser.IInitialState);
  });
});

describe('User query test', () => {
  it('Should duplicate the data to user reducer', async () => {
    await store.dispatch(userAPI.endpoints.getUsers.initiate({}, {}));

    expect(store.getState()?.user?.users?.length).toBeGreaterThan(0);
  });
});
