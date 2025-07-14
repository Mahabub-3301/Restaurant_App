import { useState, useEffect } from 'react';
import '../assets/Admin.css';
import axios from 'axios';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    /*axios.get("/api/user").then(res => { setUsers(res.data) })
      .catch((err) => { console.log(err) });*/

    axios.get("/api/bookings")
      .then(res => { setBookings(res.data) })
      .catch(err => { console.log(err) })
  }, [isLoggedIn]);

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

      {!isLoggedIn ? (
        <div className="admin-card">
          <h1 className="admin-title">Admin Login</h1>

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
        </div>

      ) : (
        <div className="admin-card1">
          <h1 className="admin-title">Admin Page</h1>

          <div className="admin-welcome">
            <p>Welcome, Admin!</p>
            <p className="dashboard-note"></p>
            <div className="admin-dashboard">
              <h2>📚 Bookings</h2>
              <table>
                <thead>
                  <tr><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Email</th></tr>
                </thead>
                <tbody>
                  {Array.isArray(bookings) ? (
                    bookings.map((booking, i) => (
                      <tr key={i}>
                        <td>{booking.name}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td>{booking.guests}</td>
                        <td>{booking.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5">No bookings available or fetch failed.</td></tr>
                  )}

                </tbody>
              </table>

              <h2>👥 Users</h2>
              <ul>
                {users.map((user, i) => (
                  <li key={i}>{user.name} — {user.email}</li>
                ))}
              </ul>
            </div>

            <button onClick={() => setIsLoggedIn(false)} className="logout-button">Logout</button>
          </div>
          </div>
        )}
    </div>
  );
};
