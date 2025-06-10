export const genClassName = (...classNames: (string | undefined)[]) => {
  return classNames.filter(Boolean).join(' ');
};
