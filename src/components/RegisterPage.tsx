import { useState } from 'react';
import './LoginPage.css'; // Reuse styles from login page

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Registration failed');
      }

      alert('Account created! You can now log in.');
    } catch (err: any) {
      alert(err.message || 'Registration error');
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Create Your PigeonFlix Account</h2>
      <form className="login-form" onSubmit={handleRegister}>
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
        <input
          className="login-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button className="login-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
