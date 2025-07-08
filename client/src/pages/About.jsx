
import '../assets/About.css';

export default function About() {
  return (
    <main className="about-wrapper">
      <section className="about-card">
        <h1 className="about-title">About Our Restaurant</h1>

        <article className="section">
          <h2 className="section-heading">Our Story</h2>
          <p>
            Founded in 2023, My Restaurant was born from a passion for bringing authentic and innovative culinary experiences to our community. Our journey began with a simple idea: to create a space where food lovers could gather, share stories, and savor dishes crafted with the freshest local ingredients and a touch of global inspiration.
          </p>
          <p>
            Over the years, we've grown from a small family-run eatery into a beloved local landmark, thanks to the support of our patrons and the dedication of our incredible team. We believe dining is more than just eating — it's an experience, a celebration of flavors, and a chance to create lasting memories.
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
          <h2 className="section-heading">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://placehold.co/150x150/E0F2F7/0D47A1?text=Chef" alt="Head Chef" />
              <h3>Chef Anya Sharma</h3>
              <p className="position">Head Chef & Culinary Director</p>
              <p className="bio">With 15+ years of experience, Chef Anya blends traditional Indian flavors and modern artistry.</p>
            </div>
            <div className="team-member">
              <img src="https://placehold.co/150x150/E0F2F7/0D47A1?text=Manager" alt="Restaurant Manager" />
              <h3>Mr. Rahul Singh</h3>
              <p className="position">Restaurant Manager</p>
              <p className="bio">Rahul ensures every guest has a seamless dining experience, overseeing front-of-house operations.</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};
