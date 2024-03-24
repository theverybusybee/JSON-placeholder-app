import { createAppSlice } from 'app/createAppSlice';
import { type ModalType, type ModalsSliceState } from './types';
import { type PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalsSliceState = {
  isOpened: false,
  modalType: '',
};

export const modalsSlice = createAppSlice({
  name: 'modals',
  initialState,
  reducers: (create) => ({
    setIsModalOpenedTrue: create.reducer(
      (state, action: PayloadAction<ModalType>) => {
        if (typeof window != 'undefined' && window.document) {
          document.body.style.overflow = 'hidden';
        }
        return {
          ...state,
          isOpened: true,
          modalType: action.payload,
        };
      },
    ),
    setIsModalOpenedFalse: create.reducer((state) => {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'unset';
      }
      return {
        ...state,
        isOpened: false,
        modalType: '',
      };
    }),
  }),

  selectors: {
    selectIsModalOpened: (modal) => modal.isOpened,
    selectModalType: (modal) => modal.modalType,
  },
});

export const { setIsModalOpenedTrue, setIsModalOpenedFalse } =
  modalsSlice.actions;

export const { selectIsModalOpened, selectModalType } = modalsSlice.selectors;
