import { genClassName } from 'game_caro_package/libs';
import React, { ReactNode } from 'react';
import { ErrorMessage } from './error-messages';

export type TInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  label?: string;
  errors?: string[];
  info?: string;
  containerClassName?: string;
  appendIcon?: ReactNode;
  prependIcon?: ReactNode;
};

const DEFAULT_CLASS_NAME = {
  container: 'w-full mb-3 block',
  input:
    'h-10 w-full px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  inputError: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  infoText: 'mt-1 text-sm text-gray-500',
  label: 'block text-sm font-medium text-gray-700',
};

export const Input: React.FC<TInputProps> = ({
  name,
  label,
  className,
  errors,
  info,
  containerClassName,
  appendIcon,
  prependIcon,
  ...props
}) => {
  return (
    <label
      className={genClassName(DEFAULT_CLASS_NAME.container, containerClassName)}
    >
      {label && (
        <span
          className={genClassName(
            DEFAULT_CLASS_NAME.label,
            errors ? 'text-red-500' : ''
          )}
        >
          {label}
        </span>
      )}

      {prependIcon}

      <input
        id={name}
        name={name}
        className={genClassName(
          DEFAULT_CLASS_NAME.input,
          className,
          errors ? DEFAULT_CLASS_NAME.inputError : ''
        )}
        aria-invalid={!!errors}
        aria-describedby={
          errors ? `${name}-error` : info ? `${name}-info` : undefined
        }
        {...props}
      />

      {appendIcon}

      <ErrorMessage errors={errors || []} id={`${name}-error`} />

      {info && (
        <p id={`${name}-info`} className={DEFAULT_CLASS_NAME.infoText}>
          {info}
        </p>
      )}
    </label>
  );
};
