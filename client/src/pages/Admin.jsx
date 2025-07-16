import { useState, useEffect } from 'react';
import '../assets/Admin.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Make sure you have this

export default function Admin() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  // States for adding menu item
  const [newCategory, setNewCategory] = useState('');
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [menuMessage, setMenuMessage] = useState('');

  useEffect(() => {
    axios.get("/api/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    setMenuMessage('');

    if (!newCategory || !newName || !newDescription || !newPrice) {
      setMenuMessage('Please fill in all fields.');
      return;
    }

    axios.post("/api/menu", {
      category: newCategory,
      name: newName,
      description: newDescription,
      price: newPrice,
    })
      .then(() => {
        setMenuMessage('Menu item added successfully!');
        setNewCategory('');
        setNewName('');
        setNewDescription('');
        setNewPrice('');
      })
      .catch((err) => {
        console.error(err);
        setMenuMessage('Failed to add menu item.');
      });
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-card1">
        <h1 className="admin-title">Admin Page</h1>
        <div className="admin-welcome">
          <p>Welcome, {user?.name}!</p>

          <div className="admin-dashboard">
            <h2>📚 Bookings</h2>
            <table>
              <thead>
                <tr><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Email</th></tr>
              </thead>
              <tbody>
                {Array.isArray(bookings) && bookings.length > 0 ? (
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

            {/* Add Menu Item Section */}
            <h2>🍽️ Add Menu Item</h2>
            <form onSubmit={handleAddMenuItem} className="menu-form">
              <label>
                Category
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g., Main Courses"
                />
              </label>

              <label>
                Name
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Grilled Salmon"
                />
              </label>

              <label>
                Description
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="e.g., Pan-seared salmon with lemon sauce"
                />
              </label>

              <label>
                Price
                <input
                  type="text"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g., ₹900"
                />
              </label>

              <button type="submit" className="add-button">Add Item</button>
              {menuMessage && <p className={menuMessage.includes('success') ? 'success-text' : 'error-text'}>{menuMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
