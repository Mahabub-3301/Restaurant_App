# 🍽️ My Restaurant Booking Application

<br>

## ✨ Project Overview

This is a full-stack web application designed for a restaurant, enabling customers to easily book tables online and providing an administrative dashboard for efficient booking management. The application is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) for robust backend and dynamic frontend capabilities, with **Tailwind CSS** for a modern, responsive, and aesthetically pleasing user interface.

<br>

## 🔥 Key Features

<br>

### User-Facing Website:

<br>

* **Home Page:** A welcoming introduction to the restaurant, showcasing specials and customer testimonials.

* **Menu Page:** A well-organized, categorized menu display of all food and beverage items.

* **About Page:** Details about the restaurant's history, culinary philosophy, and team.

* **Contact Page:** Provides essential contact information (address, phone, email, hours) and a functional contact form.

* **Online Table Booking:**

  * An intuitive form allowing users to select a desired date, time, and number of guests.

  * **Client-side validation** for all input fields (date, time, guests, name, email, phone) ensuring data integrity and a smooth user experience.

  * Integration with a backend API to save booking data to the database.

  * (Future: Confirmation email sending via EmailJS/Nodemailer).

* **Fully Responsive Design:** The entire application is optimized to provide an excellent user experience across all devices, from desktops to tablets and mobile phones.

<br>

### Admin Dashboard:

<br>

* **Admin Login Page:** A secure login interface for restaurant staff with basic client-side validation.

* **Dashboard Overview:** (Implemented) A centralized view displaying all current and past bookings in a sortable and filterable table.

* **Booking Management:** (Implemented) Functionality to view detailed booking information, update booking statuses (e.g., confirmed, cancelled, seated), and delete bookings.

<br>

<h2>🚀 Technologies Used</h2>

<br>

This project leverages the following technologies:

<br>

<h3>Frontend:</h3>

<br>

* **React.js:** For building the dynamic and interactive user interface.

* **Vite:** As a fast and efficient build tool for the React application.

* **Tailwind CSS:** A utility-first CSS framework for rapid and responsive styling.

* **React Router DOM:** For seamless client-side navigation between different pages.

<br>

<h3>Backend:</h3>

<br>

* **Node.js:** The JavaScript runtime environment for the server.

* **Express.js:** A minimalist web framework for building the RESTful API.

* **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying database interactions.

<br>

<h3>Database:</h3>

<br>

* **MongoDB:** A NoSQL document database used for storing booking information and other application data.

<br>

<h3>Authentication:</h3>

<br>

* (Placeholder/Future: Firebase Auth / NextAuth) For robust user and admin authentication.

<br>

<h3>Deployment:</h3>

<br>

* (Future: Vercel/Netlify for Frontend, Render/Firebase for Backend)

<br>

<h2>📦 Project Structure</h2>

<br>

The project follows a clear separation of concerns with distinct frontend and backend directories:


/Restaurant_App
├── /client/              # React + Vite frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable UI components (e.g., Navbar, Footer)
│   │   ├── pages/        # Main application views (Home, Menu, About, Contact, Booking, Admin)
│   │   ├── api/          # (Optional) Frontend API utility functions
│   │   ├── App.jsx       # Main React application component
│   │   ├── main.jsx      # Entry point for the React app
│   │   └── index.css     # Global styles, Tailwind CSS imports
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── /server/              # Node.js + Express.js backend API
│   ├── config/           # Database connection, environment setup
│   ├── controllers/      # Business logic for API endpoints
│   ├── models/           # Mongoose schemas for MongoDB collections
│   ├── routes/           # API route definitions
│   ├── middleware/       # (Optional) Authentication/authorization middleware
│   ├── server.js         # Main server entry point
│   └── package.json
├── .gitignore            # Specifies intentionally untracked files
└── README.md             # This file


<br>

<h2>⚙️ Installation and Local Setup</h2>

<br>

To get a local copy up and running, follow these simple steps.

<br>

<h3>Prerequisites</h3>

<br>

Ensure you have the following installed on your machine:

<br>

* **Node.js** (v18 or higher recommended)

* **npm** (comes with Node.js) or **yarn**

* **MongoDB** (Community Server installed locally, or access to a cloud-based MongoDB Atlas instance)

<br>

<h3>1. Clone the repository</h3>


git clone https://github.com/your-username/Restaurant_App.git
cd my-restaurant-app


<br>

<h3>2. Backend Setup</h3>

<br>

Navigate to the `server` directory, install dependencies, and configure environment variables.


cd server
npm install # or yarn install


<br>

Create a `.env` file in the `server` directory and add your environment variables. Replace placeholders with your actual values.


PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_bookings # Or your MongoDB Atlas connection string
JWT_SECRET=your_very_secret_key_for_auth # Use a strong, random string


<br>

Start the backend server:


npm start # or yarn start


<br>

The backend API will run on `http://localhost:5000` (or the port you specified).

<br>

<h3>3. Frontend Setup</h3>

<br>

Open a new terminal, navigate to the `client` directory, and install dependencies.


cd ../client # Go back to root and then into client, or navigate directly
npm install # or yarn install


<br>

Start the React development server:


npm run dev # or yarn dev


<br>

The frontend application will typically open in your browser at `http://localhost:5173` (or another port specified by Vite).

<br>

<h2>💡 Usage</h2>

<br>

Once both the frontend and backend servers are running:

<br>

* Open your browser and navigate to `http://localhost:5173`.

* Explore the Home, Menu, About, and Contact pages.

* Go to the "Book Table" page to make a reservation (client-side validation will guide you).

* Visit the "Admin" page to log in (default credentials: `username: admin`, `password: password`) and explore the booking management features.

<br>

<h2>🔮 Future Enhancements</h2>

<br>

* **Robust Authentication:** Implement full JWT-based authentication for both users and admins.

* **Email Confirmations:** Integrate EmailJS or Nodemailer to send booking confirmation emails.

* **Payment Gateway:** Add an option for online payment for bookings or deposits.

* **User Accounts:** Allow users to create accounts, view their past bookings, and manage their profiles.

* **Admin Features:**

  * Filtering, sorting, and pagination for the bookings table.

  * Reporting and analytics for restaurant management.

  * User role management.

* **Deployment:** Set up continuous integration/continuous deployment (CI/CD) pipelines for automated deployment.

* **Advanced UI/UX:** More complex animations (GSAP/Framer Motion), loading states, and user feedback mechanisms.

<br>

<h2>🤝 Contributing</h2>

<br>

Contributions are highly welcome! If you have suggestions for improvements, find a bug, or want to add a new feature, please feel free to:

<br>

1. **Fork** the repository.

2. Create a new branch (`git checkout -b feature/your-feature-name`).

3. Make your changes and ensure they adhere to the project's coding style.

4. Commit your changes (`git commit -m 'feat: Add new feature for X'`).

5. Push to the branch (`git push origin feature/your-feature-name`).

6. Open a **Pull Request** explaining your changes.

<br>


**Thank you for checking out My Restaurant Booking Application!**
