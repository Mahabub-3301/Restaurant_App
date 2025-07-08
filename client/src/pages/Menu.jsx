import '../assets/Menu.css'
export default function Menu() {
  const menuItems = [
    {
      category: "Appetizers",
      items: [
        { name: "Bruschetta", description: "Toasted bread with fresh tomatoes, basil, and garlic.", price: "₹350" },
        { name: "Caprese Skewers", description: "Cherry tomatoes, mozzarella, and basil drizzled with balsamic glaze.", price: "₹400" },
      ],
    },
    {
      category: "Main Courses",
      items: [
        { name: "Pasta Primavera", description: "Fresh vegetables tossed with penne pasta in a light cream sauce.", price: "₹750" },
        { name: "Grilled Salmon", description: "Pan-seared salmon with asparagus and lemon-dill sauce.", price: "₹900" },
        { name: "Mushroom Risotto", description: "Arborio rice with wild mushrooms and parmesan.", price: "₹800" },
      ],
    },
    {
      category: "Desserts",
      items: [
        { name: "Tiramisu", description: "Classic Italian coffee-flavored dessert.", price: "₹450" },
        { name: "Chocolate Lava Cake", description: "Warm cake with molten center and vanilla ice cream.", price: "₹500" },
      ],
    },
    {
      category: "Beverages",
      items: [
        { name: "Fresh Lime Soda", description: "Refreshing lime soda, sweet or salty.", price: "₹150" },
        { name: "Espresso", description: "Strong black coffee.", price: "₹200" },
        { name: "Assorted Juices", description: "Orange, Apple, Pineapple.", price: "₹220" },
      ],
    },
  ];

  return (
    <main className="menu-page">
      <h1 className="menu-title">Our Delicious Menu</h1>

      {menuItems.map((section, index) => (
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
      ))}
    </main>
  );
};
