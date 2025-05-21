import { genClassName } from 'game_caro_ui/libs';
import React from 'react';

export type TInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  label?: string;
  error?: string;
  info?: string;
  containerClassName?: string;
};

const DEFAULT_CLASS_NAME = {
  container: 'w-full mb-3',
  input:
    'h-10 w-full px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  inputError: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  infoText: 'mt-1 text-sm text-gray-500',
  errorText: 'mt-1 text-sm text-red-600',
  label: 'block text-sm font-medium text-gray-700',
};

export const Input: React.FC<TInputProps> = ({
  name,
  label,
  className,
  error,
  info,
  containerClassName,
  ...props
}) => {
  return (
    <div className={genClassName(DEFAULT_CLASS_NAME.container, containerClassName)}>
      {label && (
        <label htmlFor={name} className={DEFAULT_CLASS_NAME.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={genClassName(
          DEFAULT_CLASS_NAME.input,
          className,
          error ? DEFAULT_CLASS_NAME.inputError : ''
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${name}-error` : info ? `${name}-info` : undefined
        }
        {...props}
      />

      {error && (
        <p id={`${name}-error`} className={DEFAULT_CLASS_NAME.errorText}>
          {error}
        </p>
      )}

      {info && (
        <p id={`${name}-info`} className={DEFAULT_CLASS_NAME.infoText}>
          {info}
        </p>
      )}
    </div>
  );
};
