import { EPagePath } from 'game_caro_package/libs';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from 'game_caro_package/context-api/auth.context';

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to={EPagePath.LOGIN} />;
  }

  return (
    <div className="bg-[#dfdcd6]">
      <div className="max-w-[1366px] mx-auto px-2">
        <div className="flex justify-between items-center py-2 px-12">
          <img
            src="./assets/images/logo-caro.png"
            alt="game-caro"
            className="w-12"
          />

          <div>
            <span>{user?.email}</span>
            <span className="px-2">|</span>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div id="modal-root"></div>
        <Outlet />
      </div>
    </div>
  );
};
