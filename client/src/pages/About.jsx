
import '../assets/About.css';

export default function About() {
  return (
    <main className="about-wrapper">
      <section className="about-card">
        <h1 className="about-title">About Our Restaurant</h1>

        <article className="section">
          <h2 className="section-heading">Our Story</h2>
          <p>
        This full-stack restaurant application was developed as part of my internship at <strong>InterPro IT</strong>,
        showcasing practical skills in MERN stack development, deployment, and secure backend implementation.
      </p>
      <p>
        The project simulates a complete restaurant experience — including menu listings, table bookings, user interactions,
        and admin functionality — built with scalability and user experience in mind.
      </p>
      <p>
        Core features include dynamic routing, MongoDB data management, Stripe integration, and responsive UI design using modern frontend practices.
      </p>
      <p>
        From writing efficient backend logic to deploying on platforms like Render and integrating tools like Cloudflare Tunnel,
        this internship has been a hands-on journey in bringing professional-grade applications to life.
      </p>
        </article>

        <article className="section">
          <h2 className="section-heading">Our Philosophy</h2>
          <ul className="philosophy-list">
            <li><strong>Freshness First:</strong> We source our ingredients daily from local farms and trusted suppliers.</li>
            <li><strong>Culinary Innovation:</strong> Our chefs constantly experiment with new techniques and flavors.</li>
            <li><strong>Warm Hospitality:</strong> We create a welcoming atmosphere where every guest feels at home.</li>
            <li><strong>Sustainability:</strong> We support eco-friendly practices and reduce food waste.</li>
          </ul>
        </article>

        <article className="section">
  <h2 className="section-heading">Meet Our Development Team</h2>
  <div className="team-grid">
    <div className="team-member">
      <img src="https://placehold.co/150x150/E0F2F7/0D47A1?text=Mahaboob" alt="Shaik Mahaboob" />
      <h3>Shaik Mahaboob</h3>
      <p className="position">Full-Stack Developer & Project Lead</p>
      <p className="bio">
        Mahaboob spearheaded backend architecture, deployment, and UI integration for the restaurant app during his internship at InterPro IT.
        His focus on scalability, secure systems, and clean design brought this project to life.
      </p>
    </div>

    <div className="team-member">
      <img src="https://placehold.co/150x150/E0F2F7/0D47A1?text=Aryan" alt="Aryan Sharma" />
      <h3>Aryan Sharma</h3>
      <p className="position">Full-Stack Developer</p>
      <p className="bio">
        Aryan crafted dynamic and responsive frontend components, refining user experience and collaborating on backend features. His attention to animation,
        styling, and user flow gave the app its polished look and feel.
      </p>
    </div>
  </div>
</article>

      </section>
    </main>
  );
};
