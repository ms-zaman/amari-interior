import "./SimpleFooter.css";

const SimpleFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-contact">
            <h3>
              Let's Transform Your Space <br />
              info<span>@</span>amariinterior.com
            </h3>

            <p className="secondary">
              From residential renovations to commercial designs — we're always ready to bring your vision to life. Contact us today for a consultation.
            </p>

            <a href="#contact" className="btn">
              Get in Touch
            </a>
          </div>

          <div className="footer-nav">
            <a href="#" className="footer-nav-item">
              <span>Home</span>
              <span>&#8594;</span>
            </a>

            <a href="#services" className="footer-nav-item">
              <span>Services</span>
              <span>&#8594;</span>
            </a>

            <a href="#projects" className="footer-nav-item">
              <span>Projects</span>
              <span>&#8594;</span>
            </a>

            <a href="#about" className="footer-nav-item">
              <span>About</span>
              <span>&#8594;</span>
            </a>

            <a href="#contact" className="footer-nav-item">
              <span>Contact</span>
              <span>&#8594;</span>
            </a>
          </div>
        </div>
        <div className="footer-row">
          <div className="footer-header">
            <h1>Amari</h1>
            <h1>Interior</h1>
          </div>

          <div className="footer-copyright-line">
            <p className="primary sm">&copy; Amari Interior 2025</p>
            <p className="primary sm">All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
