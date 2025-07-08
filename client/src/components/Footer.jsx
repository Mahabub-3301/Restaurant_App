import '../assets/Footer.css'

export default function Footer() {
  return (
    <footer className="FooterSec">
      <div className="footer-container">
        <p className="footer-text">
            © {new Date().getFullYear()} Resto. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
