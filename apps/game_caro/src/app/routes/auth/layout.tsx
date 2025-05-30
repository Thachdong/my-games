import { TransitionAnimate } from 'game_caro_package/components/molecules';
import { Outlet, useLocation } from 'react-router-dom';
import "./layout.scss";

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="grid grid-rows-[auto,1fr] h-screen">
      <img
        src="./assets/images/logo-caro.png"
        alt="game-caro"
        className="mx-auto w-40 py-12"
      />

      <TransitionAnimate transitionProps={{ mode: 'out-in' }} cssTransitionProps={{
        classNames: 'fade',
        timeout: 500,
        unmountOnExit: true,
        key: location.pathname,
      }} >
        <Outlet />
      </TransitionAnimate>
    </div>
  );
}
