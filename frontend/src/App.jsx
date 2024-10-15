
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import AllBlogs from './components/AllBlogs.jsx';
import Home from './components/Home.jsx'
import BlogPost from './components/BlogPost';
import ProjectDetails from './components/projectDetails.jsx';
import NotFound from './components/NotFound';
import Footer from './components/footer.jsx';

import './index.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import { Analytics } from "@vercel/analytics/react";
import usePageTracking from './components/usePageTracking';


const AppLayout = ()=>{
  return(
    <>
        <Header />
        <Outlet /> 
        <Footer />
    </>
  )
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
      path: '/blog',
      element:<AllBlogs />,
    },
    {
      path: '/blog/:slug',
      element:<BlogPost />,
    },
    {
      path: '/project/:slug',
      element: <ProjectDetails />,
    },
  ],
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
