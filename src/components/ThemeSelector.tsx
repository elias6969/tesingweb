import { useTheme } from './ThemeContext';
import './ThemeSelector.css';

const ThemeSelector = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="theme-selector">
      <div className="theme-label">THEME:</div>
      <div className="theme-options">
        {themes.map((t) => (
          <button
            key={t.id}
            className={`theme-option ${theme === t.id ? 'active' : ''}`}
            onClick={() => setTheme(t.id)}
            title={t.name}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;