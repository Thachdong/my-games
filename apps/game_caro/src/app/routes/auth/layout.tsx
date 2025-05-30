import { Outlet, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="grid grid-rows-[auto,1fr] h-screen">
      <img
        src="./assets/images/logo-caro.png"
        alt="game-caro"
        className="mx-auto w-40 py-12"
      />

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          timeout={500}
          unmountOnExit
          classNames="fade"
        >
          <Outlet />
        </CSSTransition>
      </SwitchTransition>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .fade-enter {
            opacity: 0;
            transform: translateX(-100%);
          }
          .fade-enter-active {
            opacity: 1;
            transform: translateX(0%);
          }
          .fade-exit {
            opacity: 1;
            transform: translateX(0%);
          }
          .fade-exit-active {
            opacity: 0;
            transform: translateX(100%);
          }
          .fade-enter-active,
          .fade-exit-active {
            transition: opacity 500ms, transform 500ms;
          }
          `,
        }}
      />
    </div>
  );
}
