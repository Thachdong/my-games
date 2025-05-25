import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='grid grid-rows-[auto,1fr] h-screen'>
      <div>Auth layout</div>
      
      <Outlet />
    </div>
  );
}
