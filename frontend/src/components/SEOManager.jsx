
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const SEOManager = ({ title: propTitle, description: propDescription, keywords: propKeywords, ogImage: propImage, type: propType , ogURL: propURL}) => {
  const [currentSection, setCurrentSection] = useState('Home');

  const handleScroll = () => {
    const sections = document.querySelectorAll('main > section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        setCurrentSection(section.getAttribute('id'));
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getTitle = () => {
    if (propTitle) return propTitle;

    switch (currentSection) {
      case 'Hero':
        return 'Home | Bhavesh Jadhav';
      case 'Portfolio':
        return 'Portfolio | Bhavesh Jadhav';
      case 'Blogs':
        return 'Blogs | Bhavesh Jadhav';
      case 'Skills':
        return 'Skills | Bhavesh Jadhav';
      case 'Resume':
        return 'Resume | Bhavesh Jadhav';
      case 'About':
        return 'About Me | Bhavesh Jadhav';
      case 'ContactForm':
        return 'Contact | Bhavesh Jadhav';
      default:
        return 'Home | Bhavesh Jadhav';
    }
  };

  const getDescription = () => {
    if (propDescription) return propDescription;

    switch (currentSection) {
      case 'Hero':
        return 'bhaveshjadhav.online';
      case 'Portfolio':
        return 'Explore the portfolio of Bhavesh Jadhav, showcasing web development projects and professional achievements.';
      case 'Blogs':
        return 'Read the latest blogs and articles by Bhavesh Jadhav, covering web development, programming tips, and more.';
      case 'Skills':
        return 'Discover the skills of Bhavesh Jadhav in web development, programming, and more.';
      case 'Resume':
        return 'Check out the resume of Bhavesh Jadhav, detailing his professional experience and education.';
      case 'About':
        return 'Learn more about Bhavesh Jadhav, a passionate web developer with a portfolio of successful projects.';
      case 'ContactForm':
        return 'Get in touch with Bhavesh Jadhav. Reach out for collaborations, project inquiries, or to say hello.';
      default:
        return 'Welcome to the portfolio of Bhavesh Jadhav. Discover my projects and skills in web development.';
    }
  };

  const getKeywords = () => {
    if (propKeywords) return propKeywords;

    switch (currentSection) {
      case 'Hero':
        return 'Bhavesh Jadhav, web developer, portfolio, frontend developer, full stack developer, software engineer, JavaScript, React, HTML, CSS';
      case 'Portfolio':
        return 'Bhavesh Jadhav portfolio, web development projects, professional achievements, project showcase, software development, coding projects, UI/UX design, frontend development, backend development';
      case 'Blogs':
        return 'Bhavesh Jadhav blogs, web development, programming tips, coding tutorials, software engineering, JavaScript tutorials, React articles, frontend development blogs, backend development blogs, developer blogs, technology news';
      case 'Skills':
        return 'Bhavesh Jadhav skills, web development, programming, software engineering, JavaScript, React, Node.js, HTML, CSS, frontend development, backend development, database management, API development, version control, Git, agile development';
      case 'Resume':
        return 'Bhavesh Jadhav resume, professional experience, education, work history, career achievements, software developer resume, web developer CV, programming experience, software engineering background, technical skills';
      case 'About':
        return 'About Bhavesh Jadhav, web developer, successful projects, professional background, career overview, personal profile, developer story, software engineering journey, technology enthusiast, coding passion, team player';
      case 'ContactForm':
        return 'Contact Bhavesh Jadhav, collaborations, project inquiries, business inquiries, networking, hire a developer, freelance projects, consulting services, software development inquiries, partnership opportunities';
      default:
        return 'Bhavesh Jadhav, web development, portfolio, software engineer, JavaScript developer, frontend developer, backend developer, full stack developer, coding projects, professional achievements';
    }
  };
   const getImage =() =>{
    return (propImage) ? propImage :'../../public/favicon.png'
   }
   const getType =() =>{
    return (propType) ? propType : 'website';
   }
   const getURL =() =>{
    return (propURL) ? propURL :'https://www.bhaveshjadhav.online/';
   }

  return (
    <Helmet>
      <title>{getTitle()}</title>
      <meta property="og:title" content={getTitle()} />
      <meta name="description" content={getDescription()} />
      <meta property="og:description" content={getDescription()} />
      <meta name="keywords" content={getKeywords()} />
      <meta property="og:keywords" content={getKeywords()} />
      <meta name="image" property="og:image" content={getImage()} />
      <meta property="og:site_name" content="Bhavesh Jadhav" />
      <meta property='og:type' content= {getType()}/>
      <meta property='og:url' content= {getURL()}/>
    </Helmet>
  );
};

export default SEOManager;
