import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateSitemap = async () => {
  try {
    // Fetch your blog and project data dynamically
    const [blogsResponse, projectsResponse] = await Promise.all([
      axios.get('http://localhost:3000/api/blogs'), // Use the correct port
      axios.get('http://localhost:3000/api/projects') // Use the correct port
    ]);
    const blogs = blogsResponse.data;
    const projects = projectsResponse.data;
  
    const currentDate = new Date().toISOString();
      
    const urls = [
      { loc: 'https://www.bhaveshjadhav.online/', lastmod: currentDate },
      { loc: 'https://www.bhaveshjadhav.online/blog/', lastmod: currentDate },
      ...blogs.map(blog => ({
        loc: `https://www.bhaveshjadhav.online/blog/${blog.slug}`,
        lastmod: currentDate
      })),
      ...projects.map(project => ({
        loc: `https://www.bhaveshjadhav.online/project/${project.slug}`,
        lastmod: currentDate
      }))
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.map(url => `
          <url>
            <loc>${url.loc}</loc>
            <lastmod>${url.lastmod}</lastmod>
          </url>`).join('')}
      </urlset>`;

    // Write sitemap to the public directory
    const publicDir = path.join(__dirname, '/');
    await fs.ensureDir(publicDir);
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap);

    console.log('Sitemap generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};
setTimeout(() => {
  generateSitemap();
}, 5000);
