
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    if (window.gtag) {
      window.gtag('config', 'G-LF4JBQXKST', {
        page_path: pagePath,
      });
    }
  }, [location]);
};

export default usePageTracking;
