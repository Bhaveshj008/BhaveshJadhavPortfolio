import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs?limit=3');
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
    <section id="blogs" className="blogs section-bg">
      <div className="container">
        <div className="section-title">
          <h2>My Blogs</h2>
          <p>Welcome to my learning journey! Discover my latest articles simplifying complex topics and sharing practical tips. Let's expand our knowledge together!</p>
        </div>
        <div className="row">
          {blogs && blogs.length > 0 && blogs.map((blog) => (
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
        <button className="download-button"><Link to="/blog">View All Blogs</Link></button>
      </div>
    </section>
  );
};

export default Blogs;
