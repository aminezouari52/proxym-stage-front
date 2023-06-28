import { IUser } from 'models/user';

declare namespace IReduxAuth {
  export interface IInitialState {
    user: IUser;
    isAuthenticated: boolean;
    isRegistered: boolean;
  }
}

export { IReduxAuth };
