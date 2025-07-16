import { useState } from 'react';
import '../assets/BookingPage.css';
import axios from 'axios'

export default function Booking() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: ''
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.date) {
      newErrors.date = 'Date is required.';
    } else if (new Date(formData.date) < today) {
      newErrors.date = 'Booking date cannot be in the past.';
    }

    if (!formData.time) newErrors.time = 'Time is required.';
    if (!formData.guests || parseInt(formData.guests) <= 0) {
      newErrors.guests = 'Number of guests must be at least 1.';
    }

    if (!formData.name) newErrors.name = 'Name is required.';

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid (e.g., +911234567890 or 1234567890).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (validateForm()) {
      const res = await axios.post("/api/bookings",{
        date:formData.date,
        time:formData.time,
        guests:formData.guests,
        name:formData.name,
        email:formData.email,
        phone:formData.phone
      },{
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res.data.message);


      setMessage(res.data.message);
      alert(res.data.message);
      
    } else {
      setMessage('Please correct the errors in the form.');
    }
  };

  return (
    <div className="booking-container">
      {message && (
          <div className={`booking-message ${message.includes('errors') ? 'error-message' : 'success-message'}`}>
            {message}
          </div>
        )}
      <div className="booking-card">
        <h1 className="booking-title">Book Your Table</h1>
        <form onSubmit={handleSubmit} className="booking-form">
          {['date', 'time', 'guests', 'name', 'email', 'phone'].map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              {field === 'time' ? (
                <select name="time" value={formData.time} onChange={handleChange} required>
                  <option value="">Select a time</option>
                  <option value="18:00">06:00 PM</option>
                  <option value="18:30">06:30 PM</option>
                  <option value="19:00">07:00 PM</option>
                  <option value="19:30">07:30 PM</option>
                  <option value="20:00">08:00 PM</option>
                  <option value="20:30">08:30 PM</option>
                  <option value="21:00">09:00 PM</option>
                </select>
              ) : (
                <input
                  type={field === 'guests' ? 'number' : field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'date' ? 'date' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === 'name' ? 'Full Name' : field === 'email' ? 'your@example.com' : field === 'phone' ? '+91 9876543210' : ''}
                  min={field === 'guests' ? 1 : undefined}
                  required
                />
              )}
              {errors[field] && <p className="error">{errors[field]}</p>}
            </div>
          ))}
          <button type="submit" className="booking-button">Confirm Booking</button>
        </form>
        
      </div>
    </div>
  );
}
