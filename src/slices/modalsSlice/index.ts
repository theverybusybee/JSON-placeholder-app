import { createAppSlice } from 'app/createAppSlice';
import { type ModalsSliceState } from './types';

const initialState: ModalsSliceState = {
  isOpened: false,
};

export const modalsSlice = createAppSlice({
  name: 'modals',
  initialState,
  reducers: (create) => ({
    toggleIsOpened: create.reducer((state) => {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = state.isOpened ? 'unset' : 'hidden';
      }
      return {
        ...state,
        isOpened: !state.isOpened,
      };
    }),
  }),

  selectors: {
    selectIsModalOpened: (modal) => modal.isOpened,
  },
});

export const { toggleIsOpened } = modalsSlice.actions;

export const { selectIsModalOpened } = modalsSlice.selectors;
