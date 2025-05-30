import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider, ToastProvider } from 'game_caro_package/context-api';

function App() {
  return (
    <ToastProvider timeout={5000} position="bottom-left">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
