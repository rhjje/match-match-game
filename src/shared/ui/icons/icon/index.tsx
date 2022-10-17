import { SVGAttributes, FC } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number;
}

export const withDefaultProps =
  (Icon: FC<IconProps>) =>
  ({ size = 96, ...props }: IconProps) =>
    <Icon size={size} {...props} />;
