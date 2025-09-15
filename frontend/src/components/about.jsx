import React, { useEffect, useRef } from 'react';
import profileImg from '../assets/img/profile-img.jpg';

const About = () => {
  const aboutRef = useRef(null);
  const profileImgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          profileImgRef.current.classList.add('animate-profile');
          contentRef.current.classList.add('animate-content');
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 }); 

    observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      
      <div className="container">
        <div className="section-title">
          <h2>About</h2>
          <p>I'm a full-stack developer creating user-focused applications, skilled in front-end and back-end, and learning DevOps.</p>
        </div>
        <div className="row">
          <div className="col-lg-4">
        <img src={profileImg} className="img-fluid about-img" alt="" ref={profileImgRef} />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content" ref={contentRef}>
            <h3>Web Developer.</h3>
            <p className="fst-italic">
            I develop user-friendly web solutions. With an MCA degree, I solve real-world challenges through software.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>31 Oct 2002</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.bhaveshjadhav.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+91 9067872194</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Nashik, Maharashtra</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>22</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Master in Computer Applications (MCA)</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>bhavesh002jadhav@gmail.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                </ul>
              </div>
            </div>
            <p>
            I thrive in collaborative, creative teams. I continuously learn and explore new technologies to deliver innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
