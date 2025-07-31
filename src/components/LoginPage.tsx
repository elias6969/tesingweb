import './LoginPage.css';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="login-bg">
      <div className="login-overlay">
        <div className="login-box">
          <h2 className="login-title">🕊️ PIGEON FLIX UNDERGROUND 🕊️</h2>
          <div style={{ 
            textAlign: 'center', 
            color: '#ff0000', 
            fontSize: '0.8rem', 
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            ⚠️ MEMBERS ONLY ⚠️ NO FEDS ALLOWED ⚠️
          </div>
          <LoginForm />
          <div style={{ 
            textAlign: 'center', 
            color: '#00ffff', 
            fontSize: '0.7rem', 
            marginTop: '1rem',
            fontFamily: 'Courier New, monospace'
          }}>
            💀 IF YOU'RE NOT SUPPOSED TO BE HERE, LEAVE NOW 💀
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;