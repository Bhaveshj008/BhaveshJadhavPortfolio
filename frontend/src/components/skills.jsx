import React, { useEffect, useRef } from 'react';

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-skills');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (skillsRef.current) {
      const skillElements = skillsRef.current.querySelectorAll('.skill-category');
      skillElements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <div className="section-title">
          <h2>What I Know</h2>
        </div>

        <div className="skills-table">

          {/* BACKEND */}
          <div className="skill-category">
            <div className="skill-category-name">Backend</div>
            <div className="skill-items">
              Node.js, Express.js, PostgreSQL, AWS Lambda, RDS Proxy,
              Serverless Framework, SQS
            </div>
          </div>

          {/* FRONTEND */}
          <div className="skill-category">
            <div className="skill-category-name">Frontend</div>
            <div className="skill-items">
              JavaScript (ES6+), React, React Native, Tailwind CSS
            </div>
          </div>

          {/* DATABASES & CACHING */}
          <div className="skill-category">
            <div className="skill-category-name">Databases &amp; Caching</div>
            <div className="skill-items">
              PostgreSQL, MySQL, MongoDB
            </div>
          </div>

          {/* CLOUD & DEVOPS */}
          <div className="skill-category">
            <div className="skill-category-name">Cloud &amp; DevOps</div>
            <div className="skill-items">
              AWS (Lambda, RDS Proxy, CloudWatch, EC2), Docker, CI/CD
            </div>
          </div>

          {/* TESTING & QUALITY */}
          <div className="skill-category">
            <div className="skill-category-name">Testing &amp; Quality</div>
            <div className="skill-items">
              Jest, Postman
            </div>
          </div>

          {/* MONITORING & OBSERVABILITY */}
          <div className="skill-category">
            <div className="skill-category-name">Monitoring &amp; Observability</div>
            <div className="skill-items">
              CloudWatch, Automated Bug Tracking System
            </div>
          </div>

          {/* VERSION CONTROL */}
          <div className="skill-category">
            <div className="skill-category-name">Version Control</div>
            <div className="skill-items">
              Git, GitHub, Bitbucket
            </div>
          </div>

          {/* OTHER */}
          <div className="skill-category">
            <div className="skill-category-name">Other</div>
            <div className="skill-items">
              Open-source (npm package zod-fragments), Windows, Linux
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
