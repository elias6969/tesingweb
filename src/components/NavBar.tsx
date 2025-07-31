import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="nav-brand">🕊️ PigeonFlix</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/favorites">Favorites</Link></li>
              <li className="nav-user">👤 {user}</li>
              <li><button onClick={logout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
