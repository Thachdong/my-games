import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { SwitchTransitionProps } from 'react-transition-group/SwitchTransition';

type TTransitionAnimateProps = {
  children: React.ReactNode;
  transitionProps?: Omit<SwitchTransitionProps, 'children'>;
  cssTransitionProps?: Omit<CSSTransitionProps, 'children'>;
  timeout?: number;
};

export const TransitionAnimate: React.FC<TTransitionAnimateProps> = ({
  children,
  transitionProps = {},
  cssTransitionProps = {},
  timeout = 500,
}) => {
  return (
    <SwitchTransition {...transitionProps}>
      <CSSTransition {...cssTransitionProps} timeout={timeout} unmountOnExit>
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};
