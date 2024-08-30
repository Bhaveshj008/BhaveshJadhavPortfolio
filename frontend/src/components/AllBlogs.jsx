import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SEOManager from './SEOManager';
import { HelmetProvider } from 'react-helmet-async';

const AllBlogs = () => {
  const title = 'All Blogs | Bhavesh Jadhav - Web Development & Programming Insights';
  const description = 'Explore all blogs by Bhavesh Jadhav, featuring expert insights on web development, programming tips, tutorials, and the latest trends in software engineering. Stay updated with practical advice, coding tutorials, and in-depth articles to enhance your development skills.';
  const keywords = 'Bhavesh Jadhav blogs, web development insights, programming tips, coding tutorials, software engineering articles, JavaScript guides, React tutorials, frontend development tips, backend development strategies, tech trends, developer resources';
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchBlogs();
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
    const items = document.querySelectorAll('.blog-item');

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
  }, [blogs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching blogs: {error.message}</p>;

  return (
    <main id="main">
      <section id="blogs" className="blogs section-bg">
      <HelmetProvider>
     
      <SEOManager title={title} description={description} keywords={keywords} />
      
        <div className="container">
          <div className="section-title">
            <h2>All Blogs</h2>
          </div>
          <div className="row">
            {blogs && blogs.length > 0 && blogs.map((blog, index) => (
              <div key={blog.id} className="col-lg-4 col-md-6">
                <Link to={`/blog/${blog.slug}`} className="read-more">
                  <div className="blog-item">
                    <img src={blog.coverImage.url} alt={blog.title} className="img-fluid" />
                    <div className="blog-info">
                      <h4>{blog.title}</h4>
                    </div>
                    <div className="post-details">
  <div className="read-time"><i className='bx bx-book-reader'></i>{blog.readTimeInMinutes} min read</div>
  <div className="reaction-count"><i className="bi-heart-fill"></i>{blog.reactionCount} likes</div>
  <div className="published-at"><i className='bx bx-calendar' ></i>{new Date(blog.publishedAt).toLocaleDateString()}</div>
</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        </HelmetProvider>
      </section>
    </main>
  );
};

export default AllBlogs;
