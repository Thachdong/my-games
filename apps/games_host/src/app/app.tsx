import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const GameCaro = React.lazy(() => import('game_caro/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/game-caro">GameCaro</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="games_host" />} />
        <Route path="/game-caro" element={<GameCaro />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
