import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileImg from '../assets/img/profile-img.jpg';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/') || location.pathname.startsWith('/project');

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  return (
    <>
      <i
        className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'} mobile-nav-toggle d-xl-none`}
        onClick={toggleMobileMenu}
        role="button"
        aria-label="Toggle navigation"
        aria-expanded={isMobileMenuOpen}
      ></i>

      <header id="header" className={isMobileMenuOpen ? 'header-mobile-active' : ''}>
        <div className="d-flex flex-column">
          <div className="profile">
            <img src={profileImg} alt="" className="img-fluid rounded-circle" />
            <h1 className="text-light">
              <Link to="/">Bhavesh Jadhav</Link>
            </h1>
            <div className="social-links mt-3 text-center">
              <a href="https://x.com/BhaveshJ3114" className="twitter"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="https://www.linkedin.com/in/bhavesh-jadhav-82b956280/" className="linkedin"><i className="bx bxl-linkedin"></i></a>
              <a href="https://hashnode.com/@bhavesh002" className="hashnode"><i className="fa-brands fa-hashnode"></i></a>
              <a href="https://dev.to/bhavesh_jadhav_dc5b8ed28b" className="hashnode"><i className="fa-brands fa-dev"></i></a>
              <a href="https://www.instagram.com/sonar_bhavesh_/" className="instagram"><i className="bx bxl-instagram"></i></a>
            </div>
          </div>

          <nav id="navbar" className={`nav-menu navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
            <ul>
              {isBlogPage ? (
                <>
                  <li>
                    <Link to="/" className="nav-link scrollto active" onClick={closeMobileMenu}>
                      <i className="bx bx-home"></i> <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/#about" className="nav-link scrollto active" onClick={closeMobileMenu}>
                      <i className="bx bx-user"></i> <span>About</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link scrollto active" onClick={closeMobileMenu}>
                      <i className="bx bx-code-alt"></i> <span>Skills</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link scrollto active" onClick={closeMobileMenu}>
                      <i className="bx bx-file-blank"></i> <span>Experience</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link scrollto active" onClick={closeMobileMenu}>
                      <i className="bx bx-book-content"></i> <span>Portfolio</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link scrollto active" onClick={closeMobileMenu}>
                      <i className="bx bx-book"></i> <span>Blogs</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link scrollto active" onClick={closeMobileMenu}>
                      <i className="bx bx-envelope"></i> <span>Contact</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="#hero" className="nav-link scrollto" onClick={closeMobileMenu} >
                      <i className="bx bx-home"></i> <span>Home</span>
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="nav-link scrollto"  onClick={closeMobileMenu}>
                      <i className="bx bx-user"></i> <span>About</span>
                    </a>
                  </li>
                  <li>
                    <a href="#skills" className="nav-link scrollto" onClick={closeMobileMenu}>
                      <i className="bx bx-code-alt"></i> <span>Skills</span>
                    </a>
                  </li>
                  <li>
                    <a href="#experience" className="nav-link scrollto" onClick={closeMobileMenu}>
                      <i className="bx bx-file-blank"></i> <span>Experience</span>
                    </a>
                  </li>
                  <li>
                    <a href="#portfolio" className="nav-link scrollto" onClick={closeMobileMenu}>
                      <i className="bx bx-book-content"></i> <span>Portfolio</span>
                    </a>
                  </li>
                  <li>
                    <a href="#blogs" className="nav-link scrollto" onClick={closeMobileMenu}>
                      <i className="bx bx-book"></i> <span>Blogs</span>
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="nav-link scrollto" onClick={closeMobileMenu}>
                      <i className="bx bx-envelope"></i> <span>Contact</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
