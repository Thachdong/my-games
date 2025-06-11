import React, { useMemo, useState } from 'react';
import { Input, TInputProps } from './input';

export const InputPassword: React.FC<TInputProps> = ({ ...props }) => {
  const [isShow, setIsShow] = useState(false);

  const appendIcon = useMemo(() => {
    const src = `./assets/images/${isShow ? 'eyes' : 'eyes-slash'}.png`;
    return (
      <img
        className="w-6 -translate-y-8 ml-auto mr-2"
        src={src}
        alt="show / hide password"
        onClick={() => setIsShow(!isShow)}
      />
    );
  }, [isShow]);

  const inputType = useMemo(() => {
    return isShow ? 'text' : 'password';
  }, [isShow]);

  return <Input appendIcon={appendIcon} type={inputType} {...props} />;
};
