import { genClassName } from 'game_caro_ui/libs';

export type TButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const DEFAULT_CLASS_NAME =
  'h-10 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';

export const Button: React.FC<TButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={genClassName(DEFAULT_CLASS_NAME, className)} {...props}>
      {children}
    </button>
  );
};
