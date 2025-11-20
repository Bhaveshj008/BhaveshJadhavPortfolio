import React, { useEffect, useRef } from 'react';
import profileImg from '../assets/img/profile-img.jpg';

const About = () => {
  const aboutRef = useRef(null);
  const profileImgRef = useRef(null);
  const contentRef = useRef(null);

  // --- AUTO AGE CALC ---
  const calculateAge = (dobStr) => {
    const dob = new Date(dobStr);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = calculateAge("2002-10-31"); // Your DOB

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

    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container">

        <div className="section-title">
          <h2>About</h2>
          <p>
            I’m a full-stack developer specializing in backend engineering, serverless architectures,
            and mobile app development. I build scalable systems using Node.js, PostgreSQL,
            AWS Lambda, and React Native, delivering production systems in real environments.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <img src={profileImg} className="img-fluid about-img" alt="" ref={profileImgRef} />
          </div>

          <div className="col-lg-8 pt-4 pt-lg-0 content" ref={contentRef}>
            <h3>Full-Stack Developer (Backend Heavy)</h3>

            <p className="fst-italic">
              Passionate about scalable APIs, distributed systems, and mobile apps. Currently working at
              Mobiliya Technologies LLP, building production-grade serverless backends and React Native apps.
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
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>{age}</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> 
                    <span>MCA (Govt. College of Engineering, Aurangabad)</span>
                  </li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> 
                    <span>bhaveshjadhav3114@gmail.com</span>
                  </li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                </ul>
              </div>
            </div>

            <p>
              I enjoy solving system-level challenges like API performance, multi-database architecture,
              ORM optimization, and distributed workflows. I’ve engineered multi-tenant serverless systems,
              built cross-DB ORM tooling adopted company-wide, and shipped production apps. Always learning,
              improving, and pushing toward better engineering discipline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
