export interface ModalsSliceState {
  isOpened: boolean;
  modalType: '' | ModalType;
}

export enum ModalType {
  Approvement = 'Approvement',
  EditPost = 'EditPost',
  CreatePost = 'CreatePost',
}
