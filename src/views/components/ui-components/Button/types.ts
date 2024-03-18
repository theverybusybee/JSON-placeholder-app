import { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  shape?: ButtonShape;
  borderStyle?: ButtonBorderStyle;
  hasArrow?: boolean;
  isActive?: boolean;
  // isDisabled?: boolean;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  extraClass?: string;
}

export enum ButtonShape {
  'Rounded' = '_rounded',
  'RoundedSquare' = '_rounded-square',
}

export enum ButtonBorderStyle {
  'Gradient' = '_gradient',
}
