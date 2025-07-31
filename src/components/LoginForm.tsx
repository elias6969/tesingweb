import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🟢 Attempting login");

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });

      const token = res.data.token;
      const message = res.data.message;

      console.log("✅ Token:", token);
      console.log("✅ Message:", message);

      localStorage.setItem('jwt', token);
      login(username); // update global context (shown in navbar)
      alert("🎉 " + message);
      navigate('/'); // redirect to home
    } catch (err: any) {
      console.error("❌ Login error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <input
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="login-button" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
