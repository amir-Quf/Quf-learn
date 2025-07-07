import { Container } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
        <Container>
          <div className="footer-content">
            <div className="footer-logo">
              <h3>Quf Learn</h3>
              <p>
                Modern platform for learning programming skills, built for the
                future.
              </p>
            </div>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/about">About</a>
            </div>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Quf Learn. All rights reserved.
          </p>
        </Container>
      </footer>
  )
}

export default Footer
