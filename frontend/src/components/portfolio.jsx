import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Portfolio = () => {
  const portfolioRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('*');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects'); 
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const items = portfolioRef.current.querySelectorAll('.portfolio-item');

    items.forEach(item => {
      observer.observe(item);
    });

    return () => {
      if (items) {
        items.forEach(item => {
          observer.unobserve(item);
        });
      }
    };
  }, [projects]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);

    const items = portfolioRef.current.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      item.classList.remove('animate');
      setTimeout(() => {
        item.classList.add('animate');
      }, 10);
    });
  };

  return (
    <section id="portfolio" className="portfolio section-bg">
      <div className="container" ref={portfolioRef}>
        <div className="section-title">
          <h2>Portfolio</h2>
          <p>Welcome to my portfolio! Here are some of my created projects in web development and design.</p>
        </div>
        <div className="col-lg-12 d-flex justify-content-center">
          <ul id="portfolio-flters">
            <li 
              data-filter="*" 
              className={activeFilter === '*' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('*')}
            >
              All
            </li>
            <li 
              data-filter=".filter-mini" 
              className={activeFilter === '.filter-mini' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('.filter-mini')}
            >
              Mini Projects
            </li>
            <li 
              data-filter=".filter-mega" 
              className={activeFilter === '.filter-mega' ? 'filter-active' : ''} 
              onClick={() => handleFilterClick('.filter-mega')}
            >
              Mega Projects
            </li>
          </ul>
        </div>
        <div className="row portfolio-container">
          {projects.map((project) => (
            
            <div 
              key={project.id} 
              className={`col-lg-4 col-md-6 portfolio-item filter-${project.category} ${activeFilter === '*' || activeFilter === `.filter-${project.category}` ? 'show' : 'hide'}`}
            >
              <div className="portfolio-wrap">
              <Link to={`/project/${project.slug}`} className="portfolio-source-btn">
                <div className="portfolio-info">
                  <h4>{project.name}</h4>
                </div>
                {project.images && project.images.length > 0 && (
        <img src={`/api/project_images/${project.images[0]}`} className="img-fluid" alt={project.name} />
      )}
      </Link>
                <div className="portfolio-links">
                  <Link to={`/project/${project.slug}`} className="portfolio-source-btn">Details</Link> 
                   <a href={project.sourceCode} className="portfolio-source-btn">Source code</a>
                  <a href={project.livePreview} className="portfolio-preview-btn">Live Preview</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
