import React, { useEffect, useRef } from 'react';
import resumePdf from '/bhaveshRsm.pdf';

const Experience = () => {
  const resumeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('resume-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (resumeRef.current) observer.observe(resumeRef.current);

    return () => observer.disconnect();
  }, []);

  const handleViewResume = () => {
    window.open(resumePdf, "_blank");
  };

  return (
    <section id="experience" className="resume" ref={resumeRef}>
      <div className="container">

        {/* Title */}
        <div className="section-title">
          <h2>Experience</h2>
        </div>

        {/* HEADER */}
        <div className="resume-header">
          <h1>Bhavesh Jadhav</h1>
          <p>Nashik, Maharashtra, India</p>

          <p>
            <a href="tel:+919067872194">+91 9067872194</a> ⋄  
            <a href="mailto:bhaveshjadhav3114@gmail.com">bhaveshjadhav3114@gmail.com</a> ⋄  
            <a href="https://www.linkedin.com/in/bhavesh-jadhav-82b956280/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ⋄ 
            <a href="https://github.com/Bhaveshj008" target="_blank" rel="noopener noreferrer">GitHub</a> ⋄
            <a href="https://hashnode.com/@bhavesh002" target="_blank" rel="noopener noreferrer">Hashnode</a> ⋄
            <a href="https://dev.to/bhavesh_jadhav_dc5b8ed28b" target="_blank" rel="noopener noreferrer">dev.to</a>
          </p>
        </div>

        {/* EXPERIENCE SECTION */}
        <div className="resume-section-inner">
          <h2>Full Stack Developer — Mobiliya Technologies LLP</h2>
          <p><em>January 2025 – Present</em></p>
          <hr />

          <ul>
            <li>
              Delivered production-ready Android/iOS apps (React Native) for a sports-venue booking
              platform and an e-commerce marketplace.
            </li>
            <li>
              Built multi-tenant backend using Node.js + PostgreSQL on AWS Lambda &amp; RDS Proxy —
              improved API performance by 40% and reduced DB load by 60%.
            </li>
            <li>
              Developed a dynamic ORM toolkit (lazy models, runtime associations, cross-DB joins),
              reducing Sequelize boilerplate by ~80% and improving query performance by up to 85%.
            </li>
            <li>
              Built low-latency, high-uptime serverless APIs ensuring 99.9% uptime & sub-200ms responses.
            </li>
            <li>
              Designed distributed SQS workflows with retries, caching, and fault tolerance.
            </li>
            <li>
              Owned CI/CD pipelines enabling zero-downtime deployments.
            </li>
            <li>
              Added observability via CloudWatch + automated bug reporting to improve detection and resolution time.
            </li>
            <li>
              Mentored developers and enforced backend best practices for scalable systems.
            </li>
          </ul>
        </div>

        {/* VIEW RESUME BUTTON */}
        <button className="download-button" onClick={handleViewResume}>
          View Resume
        </button>

      </div>
    </section>
  );
};

export default Experience;
