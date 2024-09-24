import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import Hero from './hero.jsx';
import About from './about.jsx';
import Skills from './skills.jsx';
import Resume from './resume.jsx';
import Portfolio from './portfolio.jsx';
import Blogs from './blogs.jsx';
import ContactForm from './contact.jsx';
import SEOManager from './SEOManager';

function Home(){
    return (
        <>
        <HelmetProvider>
        <SEOManager />
        <Hero />
        <main id="main">
          <section id="Portfolio"><Portfolio /></section>
          <section id="Blogs"><Blogs /></section>
          <section id="Skills"><Skills /></section>
          <section id="Resume"><Resume /></section>
          <section id="About"><About /></section>
          <section id="ContactForm"><ContactForm /></section>
        </main>
      </HelmetProvider>
        </>
    );
}
export default Home;