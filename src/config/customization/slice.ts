// project imports

// action - state management
import { createSlice, Slice } from '@reduxjs/toolkit';

export const CUSTOMIZATION_KEY_IN_STORE = 'customization';

const initialState = {
  isOpen: [], // for active default menu
  fontFamily: '"TitilliumWebRegular", sans-serif',
  borderRadius: 10,
  opened: true,
  rightOpened: true,
  direction: 'ltr',
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const reducerName = 'customization';
const customizationSlice: Slice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    openMenu: (state: any, { payload }: any) => {
      state.isOpen = [payload.id];
    },
    setMenuOpen: (state: any, { payload }: any) => {
      state.opened = payload.opened;
    },
    setRightMenuOpen: (state: any, { payload }: any) => {
      state.rightOpened = payload.rightOpened;
    },
    updateFontFamily: (state: any, { payload }: any) => {
      state.fontFamily = payload.fontFamily;
    },
    updateBorderRadius: (state: any, { payload }: any) => {
      state.borderRadius = payload.borderRadius;
    },
    setDirection: (state: any, { payload }: any) => {
      state.direction = payload.direction;
    },
  },
});

// Action creators
export const {
  openMenu,
  setMenuOpen,
  setRightMenuOpen,
  updateFontFamily,
  updateBorderRadius,
  setDirection,
} = customizationSlice.actions;

export const customizationSliceReducer = {
  [reducerName]: customizationSlice.reducer,
};
