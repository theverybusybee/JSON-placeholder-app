export interface ButtonProps {
  content: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  shape?: ButtonShape;
  borderStyle?: ButtonBorderStyle;
  isActive?: boolean;
  Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  extraClass?: string;
}

export enum ButtonShape {
  'Rounded' = '_rounded',
  'RoundedSquare' = '_rounded-square',
}

export enum ButtonBorderStyle {
  'Solid' = '',
  'Gradient' = '_gradient',
}
