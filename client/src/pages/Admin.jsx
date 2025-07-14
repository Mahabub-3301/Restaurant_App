import { useState } from 'react';
import '../assets/Admin.css'

export default function Admin(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginMessage('');
    const newErrors = {};

    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!password.trim()) newErrors.password = 'Password is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoginMessage('Please fill in all required fields.');
      return;
    }

    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginMessage('Login successful! Admin dashboard coming soon.');
    } else {
      setLoginMessage('Invalid username or password.');
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-card">
        <h1 className="admin-title">Admin Login</h1>

        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="admin-form">
            <label>
              Username
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors(prev => ({ ...prev, username: '' }));
                }}
                className={errors.username ? 'error' : ''}
                placeholder="admin"
                required
              />
              {errors.username && <p className="error-text">{errors.username}</p>}
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                className={errors.password ? 'error' : ''}
                placeholder="password"
                required
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </label>

            <button type="submit" className="login-button">Login</button>
            {loginMessage && (
              <p className={loginMessage.includes('successful') ? 'success-text' : 'error-text'}>{loginMessage}</p>
            )}
          </form>
        ) : (
          <div className="admin-welcome">
            <p>Welcome, Admin!</p>
            <p className="dashboard-note"></p>
            <button onClick={() => setIsLoggedIn(false)} className="logout-button">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};
