import { useEffect, useState } from "react";
import '../assets/Menu.css';
import  axios  from "axios";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    // Replace this URL with your backend endpoint
    axios.get(`${API_URL}/menu`)
      .then((res) => setMenuItems(res.data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  return (
    <main className="menu-page">
      <h1 className="menu-title">Our Delicious Menu</h1>
      {Array.isArray(menuItems) && menuItems.length > 0 ?(
      menuItems.map((section, index) => (
        <section key={index} className="menu-section">
          <h2 className="menu-category">{section.category}</h2>
          <div className="menu-grid">
            {section.items.map((item, idx) => (
              <article key={idx} className="menu-item">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <span className="item-price">{item.price}</span>
              </article>
            ))}
          </div>
        </section>
      ))):(<p className="no-menu-message">No menu items available at the moment. Please check back later!</p>)}
    </main>
  );
}
