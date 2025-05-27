import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="grid grid-rows-[auto,1fr] h-screen">
      <img
        src="./assets/images/logo-caro.png"
        alt="game-caro"
        className="mx-auto w-40 py-12"
      />

      <Outlet />
    </div>
  );
}
