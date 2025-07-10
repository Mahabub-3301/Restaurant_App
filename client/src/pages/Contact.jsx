
import '../assets/Contact.css';

export default function Contact() {
  return (
    <main className="contact-wrapper">
      <section className="contact-card">
        <h1 className="contact-title">Contact Us</h1>

        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-heading">Get in Touch</h2>
            <p>Have questions, feedback, or special requests? Feel free to reach out to us or fill out the form below.</p>
            <ul className="info-list">
              <li><strong>Address:</strong> 123 Restaurant Lane, Foodie City, Andhra pradesh</li>
              <li><strong>Phone:</strong> +91 95153*****</li>
              <li><strong>Email:</strong> bablusd750@gmail.com</li>
              <li><strong>Hours:</strong> Mon–Sat: 11 AM – 10 PM, Sun: 12 PM – 9 PM</li>
            </ul>
          </div>

          <div className="contact-form">
            <h2 className="section-heading">Send Us a Message</h2>
            <form>
              <label>
                Name
                <input type="text" name="name" placeholder="Your Name" required />
              </label>

              <label>
                Email
                <input type="email" name="email" placeholder="your@example.com" required />
              </label>

              <label>
                Message
                <textarea name="message" rows="5" placeholder="Your message..." required></textarea>
              </label>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

