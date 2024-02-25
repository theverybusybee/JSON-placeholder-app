export interface ButtonProps {
  content: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  shape?: ButtonShape;
  hasArrow?: boolean;
  isActive?: boolean;
  extraClass?: string;
}

export enum ButtonShape {
  'Rounded' = '_rounded',
  'RoundedSquare' = '_rounded-square',
}
