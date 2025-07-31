import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import FavoritesPage from './components/FavoritesPage';
import NavBar from './components/NavBar';
import RegisterPage from './components/RegisterPage';
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
