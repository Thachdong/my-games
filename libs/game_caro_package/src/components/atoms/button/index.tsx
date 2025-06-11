import { genClassName } from 'game_caro_package/libs';

export type TButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'primary' | 'secondary' | 'outline';
};

const VARIANT_CLASSNAMES: Record<'primary' | 'secondary' | 'outline', string> =
  {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    outline:
      'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
  };

const BASE_CLASSNAME =
  'h-10 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50';

export const Button: React.FC<TButtonProps> = ({
  children,
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={genClassName(
        BASE_CLASSNAME,
        VARIANT_CLASSNAMES[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
