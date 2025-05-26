import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { AuthProvider } from 'game_caro_package/context-api/auth.context';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
