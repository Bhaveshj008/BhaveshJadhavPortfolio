// src/App.jsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header.jsx';
import Hero from './components/hero.jsx';
import About from './components/about.jsx';
import Skills from './components/skills.jsx';
import Resume from './components/resume.jsx';
import Portfolio from './components/portfolio.jsx';
import Blogs from './components/blogs.jsx';
import AllBlogs from './components/AllBlogs.jsx';
import BlogPost from './components/BlogPost';
import ContactForm from './components/contact.jsx';
import ProjectDetails from './components/projectDetails.jsx';
import NotFound from './components/NotFound';
import Footer from './components/footer.jsx';
import SEOManager from './components/SEOManager';
import './index.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import { Analytics } from "@vercel/analytics/react";
import usePageTracking from './components/usePageTracking';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HelmetProvider>
        <SEOManager />
        <Header />
        <Hero />
        <main id="main">
          <section id="Portfolio"><Portfolio /></section>
          <section id="Blogs"><Blogs /></section>
          <section id="Skills"><Skills /></section>
          <section id="Resume"><Resume /></section>
          <section id="About"><About /></section>
          <section id="ContactForm"><ContactForm /></section>
          <Footer />
        </main>
      </HelmetProvider>
    ),
  },
  {
    path: '/blog',
    element: (
      <>
        <Header />
        <AllBlogs />
      </>
    ),
  },
  {
    path: '/blog/:slug',
    element: (
      <>
        <Header />
        <main id="main"><BlogPost /></main>
      </>
    ),
  },
  {
    path: '/project/:slug',
    element: (
      <>
        <Header />
        <main id="main"><ProjectDetails /></main>
      </>
    ),
  },
  {
    path: '*',
    errorElement: (
      <>
        <NotFound />
      </>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <PageTrackingWrapper />
      <Analytics />
    </RouterProvider>
  );
}

const PageTrackingWrapper = () => {
  usePageTracking();
  return null;
}

export default App;
