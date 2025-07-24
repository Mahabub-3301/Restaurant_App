import { useState, useEffect } from 'react';
import '../assets/Admin.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [menuMessage, setMenuMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  // Fetch data on mount

  const API_URL = import.meta.env.VITE_API_URL || '/api'
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API_URL}/bookings`).then(res => setBookings(res.data)).catch(err => console.log(err));
    axios.get(`${API_URL}/menu`).then(res => setMenuItems(res.data)).catch(err => console.log(err));
    axios.get("/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}` // Make sure token is a valid JWT
      }
    })
      .then(res => setUsers(res.data)).catch(err => console.log(err));
  }, []);

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    setMenuMessage('');

    if (!newCategory || !newName || !newDescription || !newPrice) {
      setMenuMessage('Please fill in all fields.');
      return;
    }

    axios.post('/api/menu', {
      category: newCategory,
      name: newName,
      description: newDescription,
      price: newPrice
    }).then(() => {
      setMenuMessage('Menu item added successfully!');
      setNewCategory('');
      setNewName('');
      setNewDescription('');
      setNewPrice('');
    }).catch(err => {
      console.error(err);
      setMenuMessage('Failed to add menu item.');
    });
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await axios.delete(`/api/menu/${id}`);
      setMenuItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete item', err);
    }
  };

  return (
   <div className="admin-wrapper">
  <h1 className="admin-title">Admin Dashboard</h1>
  
  <p className="admin-welcome">Welcome, {user?.name} 👋</p>

  <div className="admin-grid-2col">
    {/* Left Column */}
    <div className="left-column">

      {/* 📆 Bookings */}
      <div className="admin-section">
        <h2>📆 Bookings Overview</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Email</th></tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((b, i) => (
              <tr key={i}>
                <td>{b.name}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>{b.guests}</td>
                <td>{b.email}</td>
              </tr>
            )) : (
              <tr><td colSpan="5">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🧾 Manage Menu */}
      {/* 🧾 Manage Menu */}
<div className="admin-section">
  <h2>🧾 Manage Menu</h2>

  <div className="category-selector">
    <h3>Select Category:</h3>
    {menuItems.map((group, i) => (
      <button
        key={i}
        className={selectedCategory === group.category ? 'active-cat' : ''}
        onClick={() => setSelectedCategory(group.category)}
      >
        {group.category}
      </button>
    ))}
  </div>

  {selectedCategory && (
    <div className="category-table">
      <h3>Items in: {selectedCategory}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.find(g => g.category === selectedCategory)?.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>₹{item.price}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteMenuItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


    </div>

    {/* Right Column */}
    <div className="right-column">

      {/* 🍽️ Add Menu Item */}
      <div className="admin-section">
        <h2>🍽️ Add New Menu Item</h2>
        <form onSubmit={handleAddMenuItem} className="menu-form">
          <label>Category
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g., Main Course" />
          </label>
          <label>Name
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g., Chicken Biryani" />
          </label>
          <label>Description
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="e.g., Hyderabadi style" />
          </label>
          <label>Price
            <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="e.g., ₹350" />
          </label>
          <button type="submit" className="add-button">Add Item</button>
          {menuMessage && (
            <p className={menuMessage.includes('success') ? 'success-text' : 'error-text'}>{menuMessage}</p>
          )}
        </form>
      </div>

      {/* 👥 Registered Users */}
      <div className="admin-section">
        <h2>👥 Registered Users</h2>
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((u, i) => (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            )) : (
              <tr><td colSpan="4">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>

  );
}
