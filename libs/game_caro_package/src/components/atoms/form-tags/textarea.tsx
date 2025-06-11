import { genClassName } from 'game_caro_package/libs';
import React from 'react';

type TInputProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  name: string;
  label?: string;
  className?: string;
};

const DEFAULT_CLASS_NAME = {
  textarea:
    'w-full px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
};

export const Textarea: React.FC<TInputProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <label>
      {label}
      <textarea
        className={genClassName(DEFAULT_CLASS_NAME.textarea, className)}
        {...props}
      />
    </label>
  );
};
