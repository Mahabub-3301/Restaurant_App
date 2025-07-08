import { useState } from 'react';
import '../assets/BookingPage.css'

export default function BookingPage() {
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
      setMessage('Booking functionality is under development. Your validated data is: ' + JSON.stringify(formData));
    } else {
      setMessage('Please correct the errors in the form.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center border-b-2 border-green-600 pb-4">Book Your Table</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errors.date ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              required
            />
            {errors.date && <p className="text-red-500 text-xs italic mt-1">{errors.date}</p>}
          </div>

          <div>
            <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errors.time ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              required
            >
              <option value="">Select a time</option>
              <option value="18:00">06:00 PM</option>
              <option value="18:30">06:30 PM</option>
              <option value="19:00">07:00 PM</option>
              <option value="19:30">07:30 PM</option>
              <option value="20:00">08:00 PM</option>
              <option value="20:30">08:30 PM</option>
              <option value="21:00">09:00 PM</option>
            </select>
            {errors.time && <p className="text-red-500 text-xs italic mt-1">{errors.time}</p>}
          </div>

          <div>
            <label htmlFor="guests" className="block text-gray-700 text-sm font-bold mb-2">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errors.guests ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              required
            />
            {errors.guests && <p className="text-red-500 text-xs italic mt-1">{errors.guests}</p>}
          </div>

          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errors.name ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              placeholder="Full Name"
              required
            />
            {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              placeholder="your@example.com"
              required
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${errors.phone ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              placeholder="e.g., +91 9876543210"
              required
            />
            {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105 w-full"
          >
            Confirm Booking
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-md text-center ${message.includes('errors') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

