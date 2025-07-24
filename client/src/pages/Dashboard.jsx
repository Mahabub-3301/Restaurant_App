import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../api/orderAPI';
import { Navigate, useLocation } from 'react-router-dom';
import '../assets/dashboard.css';

const Dashboard = ({ setLogin }) => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.id, token);
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user, token]);

  const handleLogout = () => {
    logout();
    setLogin(false);
  };

  if (!user) {
    return (
      <div className="container">
        <div className="card center">
          <h2>Access Denied</h2>
          <p>Please login to view your dashboard.</p>
          <a href="/login" className="btn">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{user.role === 'admin' ? 'Admin Panel' : 'Your Dashboard'}</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="card">
        <h2>Account Information</h2>
        <div className="grid">
          <div><p className="label">Name</p><p>{user.name}</p></div>
          <div><p className="label">Email</p><p>{user.email}</p></div>
          <div><p className="label">Role</p><p className="capitalize">{user.role}</p></div>
          <div><p className="label">Member Since</p><p>{new Date(user.createdAt).toLocaleDateString()}</p></div>
        </div>
      </div>

      {user.role !== 'admin' && (
        <div className="card">
          <h2>Order History</h2>
          {loading ? (
            <p className="center">Loading orders...</p>
          ) : error ? (
            <div className="error">{error}</div>
          ) : orders.length === 0 ? (
            <p className="center">You haven't placed any orders yet</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr><th>Order ID</th><th>Date</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.substring(0, 8)}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>₹{order.totalAmount.toFixed(2)}</td>
                      <td><span className={`status ${order.status}`}>{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
