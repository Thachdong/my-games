import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='grid grid-rows-2'>
      <div>Auth layout</div>
      
      <Outlet />
    </div>
  );
}
