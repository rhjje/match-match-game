import { SVGAttributes, FC } from 'react';

interface IconProps extends SVGAttributes<SVGElement> {
  width?: number;
  height?: number;
}

const withDefaultProps =
  (Icon: FC<IconProps>) =>
  ({ width = 20, height = 20, color = 'currentColor', ...props }: IconProps) =>
    <Icon width={width} height={height} color={color} {...props} />;

const Check = withDefaultProps(
  ({ width, height, color, className }: IconProps) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m4 10 4 4 8-8"
      />
    </svg>
  ),
);

const Arrow = withDefaultProps(
  ({ width, height, color, className }: IconProps) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        stroke={color}
        strokeWidth="1.5"
        d="m15 13-4.788-4.788a.3.3 0 0 0-.424 0L5 13"
      />
    </svg>
  ),
);

export const Icons = {
  Check,
  Arrow,
};
