import React, { useState, useEffect, useRef } from 'react';
import resumePdf from '/bhaveshRsm.pdf';

const Resume = () => {
  const [showResume, setShowResume] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger animation when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('resume-animate');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(resumeRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSeeMore = () => {
    setShowResume(!showResume);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf; // Path to your PDF file in the public directory
    link.download = 'bhaveshRsm.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="resume" ref={resumeRef}>
      <div className="container">
        <div className="section-title">
          <h2>My Resume</h2>
          

        </div>
      <div className="resume-header">
        <h1>Bhavesh Jadhav</h1>
        <p>Nashik, Maharashtra, India, 423213</p>
        <p>
        <a href="tel:+919067872194">+91 9067872194</a> ⋄ 
          <a href="mailto:bhavesh002jadhav@gmail.com">bhavesh002jadhav@gmail.com</a> ⋄ 
          <a href="https://www.linkedin.com/in/bhavesh-jadhav-82b956280/" target="_blank" rel="noopener noreferrer">LinkedIn</a> ⋄ 
          <a href="https://github.com/Bhaveshj008" target="_blank" rel="noopener noreferrer">GitHub</a> ⋄ 
          <a href="https://hashnode.com/@bhavesh002" target="_blank" rel="noopener noreferrer">Hashnode</a> ⋄ 
          <a href="https://dev.to/bhavesh_jadhav_dc5b8ed28b" target="_blank" rel="noopener noreferrer">dev.to</a>
        </p>
      </div>

      <div className="resume-section-inner">
        <h2>Objective</h2><hr/>
        <p>Looking to apply my practical front and back-end development experience in a collaborative and innovative environment. Eager to contribute to impactful projects and continuously enhance my technical skills. </p></div>
        
        <div className={`resume-section ${showResume ? 'show' : ''}`}>
      {showResume && (
        <>
          <div className="resume-section-inner">
            <h2>Education</h2><hr/>
            <p><strong>Master of Computer Applications, Govt. College of Engineering, Aurangabad</strong> - Expected 2025</p>
            <p>Relevant Coursework: Web Development, Python, Java, C.</p>
            <p><strong>Bachelor of Computer Applications, Pune University</strong> - 2020-2023</p>
            <p>CGPA: 8.16</p>
          </div>

          <div className="resume-section-inner">
            <h2>Skills</h2><hr/>
            <h3>Technical Skills</h3>
            <p>Front-End: JavaScript, HTML5, CSS3, React.js</p>
            <p>Tailwind CSS, Bootstrap, jQuery, Ajax</p>
            <p>Back-End: Node.js, PHP, MySQL, MongoDB</p>
            <h3>Soft Skills</h3>
            <p>Communication, Problem-solving, Time management, Critical thinking</p>
          </div>

          <div className="resume-section-inner">
            <h2>Projects</h2><hr/>
            <div>
              <h3>Portfolio Website </h3>
              <p>
                  Built using React + Vite (frontend) and Node.js + Express (backend) with custom API endpoints.  <br/>
                  Integrated Bravo SMTP for secure emails and Hash node API for dynamic blog posts.  <br />
                  Deployed on Vercel with CI/CD, solving SMTP configuration, API rate limits, and routing issues.  
                    <a href="https://bhavesh-jadhav-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a>
              </p>
            </div>
            <div>
              <h3>Weather Notepad App</h3>
              <p>Developed a mini React.js web application integrating weather data and notepad functionality. Utilized Axios for HTTP requests, Material-UI for UI components, and Recharts for data visualization. Features include fetching weather data using the Weatherbit API, displaying weekly average temperature, rainfall, humidity, current temperature, and a bar chart of the previous week's temperatures, along with notepad functionality to add and delete notes. <a href="https://weather-notepad-app.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a></p>
            </div>
            <div>
              <h3>Agro Mall</h3>
              <p>Innovative e-commerce platform tailored for agricultural products with a robust backend developed in PHP and a sleek front end crafted with HTML, CSS, JavaScript, jQuery, Ajax, Bootstrap. Features include an advanced admin panel with analytics, order management, expense tracking, billing software, offer management, user and role management, and secure delivery updates with OTP-based authentication. <a href="https://agromall.000webhostapp.com/" target="_blank" rel="noopener noreferrer">Live Demo</a></p>
            </div>
            <div>
              <h3>Global Cafe Management System</h3>
              <p>PHP-powered website for couple cafes providing privacy, auto ordering, timer, menu, and automated billing based on sitting time.</p>
            </div>
          </div>

          <div className="resume-section-inner">
            <h2>Extra-Curricular Activities</h2><hr/>
            <ul>
              <li>Coordinator, College Athletics Game: Organized logistics for a college athletics game.</li>
              <li>Participant, National College Hackathon: Collaborated with a team of five to develop a website for visually impaired individuals, showcasing problem-solving skills and teamwork in a competitive environment.</li>
            </ul>
          </div>
        </>
      

      )}
      </div>

<button className="see-more-button" onClick={handleSeeMore}>
        {showResume ? 'See Less' : 'See More'}
      </button>
      <button className="download-button" onClick={handleDownloadResume}>
        Download Resume
      </button>
      </div>
    </section>
  );
};

export default Resume;
