// Uncomment this line to use CSS modules
// import styles from './app.module.css';


import { Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList';

export function App() {
  return (
    <div>
      {/* START: routes */}
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <UserList />
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
