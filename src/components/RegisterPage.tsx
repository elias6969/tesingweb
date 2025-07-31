import { useState } from 'react';
import './LoginPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("🚨 PASSWORDS DON'T MATCH! TRY AGAIN NOOB! 🚨");
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

      alert('🎉 WELCOME TO THE UNDERGROUND! YOU CAN NOW LOG IN! 🎉');
    } catch (err: any) {
      alert(`💀 REGISTRATION FAILED: ${err.message || 'Unknown error'} 💀`);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-overlay">
        <div className="login-box">
          <h2 className="login-title">🕊️ JOIN THE UNDERGROUND 🕊️</h2>
          <div style={{ 
            textAlign: 'center', 
            color: '#ff0000', 
            fontSize: '0.8rem', 
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            ⚠️ INVITATION ONLY ⚠️ NO SNITCHES ⚠️
          </div>
          <form className="login-form" onSubmit={handleRegister}>
            <input
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="CODENAME"
              required
            />
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="SECRET CODE"
              required
            />
            <input
              className="login-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="CONFIRM SECRET"
              required
            />
            <button className="login-button" type="submit">
              INFILTRATE SYSTEM
            </button>
          </form>
          <div style={{ 
            textAlign: 'center', 
            color: '#00ffff', 
            fontSize: '0.7rem', 
            marginTop: '1rem',
            fontFamily: 'Courier New, monospace'
          }}>
            🔒 BY REGISTERING YOU AGREE TO KEEP THIS SECRET 🔒
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;