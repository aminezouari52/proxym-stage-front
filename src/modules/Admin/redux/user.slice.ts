import { createSlice } from '@reduxjs/toolkit';
import { IReduxUser } from '../interface/user';

const reducerName = 'user';
export const initialState: IReduxUser.IInitialState = {
  users: [],
};

export const userSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
});

export const userSliceReducer = { [reducerName]: userSlice.reducer };
