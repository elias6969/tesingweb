import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import ThemeSelector from './ThemeSelector';
import './NavBar.css';

const NavBar = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const getBrandText = () => {
    switch (theme) {
      case 'futuristic': return '🤖 CyberFlix Neo';
      case 'creepy': return '👻 Horror Vault';
      case 'neon': return '🌃 Neon Stream';
      case 'matrix': return '💊 Digital Cinema';
      default: return '🕊️ PigeonFlix';
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="nav-brand">{getBrandText()}</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><ThemeSelector /></li>
              <li className="nav-user">👤 {user}</li>
              <li><button onClick={logout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><ThemeSelector /></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
