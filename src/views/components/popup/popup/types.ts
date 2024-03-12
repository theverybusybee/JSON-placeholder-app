export interface PopupProps {
  children: React.ReactNode;
  isOpened?: boolean;
  onClose: () => void;
  title: string;
}
