import './LoginPage.css';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="login-bg">
      <div className="login-overlay">
        <div className="login-box">
          <h2 className="login-title">Welcome to 🕊️ PigeonFlix</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
