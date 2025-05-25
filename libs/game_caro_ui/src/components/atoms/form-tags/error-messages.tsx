import { genClassName } from 'game_caro_ui/libs';
import React from 'react';

type TErrorMessageProps = {
  errors?: string | string[];
  id: string;
  className?: string;
};

const DEFAULT_CLASS_NAME = {
  errorText: 'mt-1 text-sm text-red-600',
};

export const ErrorMessage: React.FC<TErrorMessageProps> = ({ errors, id, className }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  if (typeof errors === 'string') {
    return (
      <ul className={genClassName(DEFAULT_CLASS_NAME.errorText, className)} id={id}>
        <li>{errors}</li>
      </ul>
    );
  }

  return (
    <ul className={genClassName(DEFAULT_CLASS_NAME.errorText, className)} id={id}>
      {errors.map((err, index) => (
        <li key={index}>
          {err}
        </li>
      ))}
    </ul>
  );
};
