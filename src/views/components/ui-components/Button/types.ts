export interface ButtonProps {
  content: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  shape?: ButtonShape;
  borderStyle?: ButtonBorderStyle;
  hasArrow?: boolean;
  isActive?: boolean;
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
