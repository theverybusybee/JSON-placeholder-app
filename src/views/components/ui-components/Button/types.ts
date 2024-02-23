import { ReactComponentElement, ReactSVGElement } from 'react';

export interface ButtonProps {
  content: string;
  shape: ButtonShape;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export enum ButtonShape {
  'Rounded' = '_rounded',
  'RoundedSquare' = '_rounded-square',
}
