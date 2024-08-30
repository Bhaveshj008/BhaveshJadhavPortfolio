import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();

const app = express();
const port_no = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configure the SMTP transporter with Bravo
const transporter = nodemailer.createTransport({
  host: process.env.BRAVO_SMTP_HOST,
  port: process.env.BRAVO_SMTP_PORT,
  secure: false, // or true if using SSL
  auth: {
    user: process.env.BRAVO_SMTP_USER,
    pass: process.env.BRAVO_SMTP_PASS,
  },
});

// Async function to send emails
const sendEmails = async (ownerMailOptions, userMailOptions) => {
  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    console.log(address)
    throw error; // Propagate the error to be caught in the API endpoint
  }
};

// app.use(express.static('../dist'));
// POST endpoint to handle contact form submissions



app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_OWNER,
    subject: `New Message from ${name}`,
    html: `
    <h2>New Message Received</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
  };

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'I’ve Got Your Message!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hi there!</h2>
        <p>Thanks for reaching out. I’ve received your message and will get back to you soon.</p>
        <p style="font-size: smaller; color: #888;">Please don’t reply to this message as it’s system generated.</p>
        <p>Have a great day!</p>
      </div>
    `,
  };

  try {
    await sendEmails(ownerMailOptions, userMailOptions);
    res.status(200).send('Emails sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});



app.get('/api/blogs/', async (req, res) => {
  const { limit } = req.query;
  const query = `
    query {
      user(username: "${process.env.HASHNODE_USERNAME}") {
        publications(first: 1) {
          edges {
            node {
              posts(first: ${limit || 0}) { 
                edges {
                  node {
                    id
                    title
                    brief
                    slug
                    coverImage {
                      url
                    }
                       readTimeInMinutes
          reactionCount
          publishedAt
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post('https://gql.hashnode.com/', { query }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const posts = response.data.data.user.publications.edges.map(edge => edge.node.posts.edges.map(postEdge => postEdge.node));
    res.json(posts.flat());
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Error fetching blogs' });
  }
});



const host = process.env.HASHNODE_HOST;
app.get('/api/blogs/:slug', async (req, res) => {
  const { slug } = req.params;
  const query = `
    query SinglePublicationPost($host: String, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
        slug 
        views
        seo {
              title
              description
            }
        ogMetaData {
              image
            }
        tags {
              id
              name
            } 
        id
          title
          content {
            markdown
          }
          coverImage {
            url
          }
          readTimeInMinutes
          reactionCount
          publishedAt
        }
      }
    }
  `;

  try {
    const response = await axios.post('https://gql.hashnode.com/', {
      query,
      variables: { host, slug }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const postData = response.data.data.publication.post;

    // Function to remove align attributes
    const removeAlignAttribute = (markdownContent) => {
      const regex = / align="center"/g;
      return markdownContent.replace(regex, '');
    };

    // Function to modify images: center all images with the same size
    const centerAndResizeImages = (markdownContent) => {
      const regex = /!\[([^\]]*)\]\(([^)]+?)\)/g;
      return markdownContent.replace(regex, (match, alt, url) => {
        return `<div><img src="${url}" alt="${alt}"></div>`;
      });
    };

    // Update the markdown content
    let updatedMarkdown = removeAlignAttribute(postData.content.markdown);
    

    updatedMarkdown = centerAndResizeImages(updatedMarkdown);


    postData.content.markdown = updatedMarkdown;

    res.json(postData);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Error fetching post' });
  }
});

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/project_images', express.static(path.join(__dirname, 'project_images')));
const projectsFilePath = path.join(__dirname, 'projects.json');

// Read the projects data from JSON file
const projects = JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));

// Endpoint to get all projects
app.get('/api/projects', (req, res) => {
  fs.readFile(projectsFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read projects file' });
    }
    const projects = JSON.parse(data);
    res.json(projects);
  });
});

// Endpoint to get a single project by ID
app.get('/api/projects/:slug', (req, res) => {
  const projectSlug = req.params.slug;
  fs.readFile(projectsFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read projects file' });
    }
    const projects = JSON.parse(data);
    const project = projects.find(p => p.slug === projectSlug);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  });
});

app.get('/api/projects')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
// Start the server
app.listen(port_no, () => {
  console.log(process.env.HASHNODE_USERNAME)
  console.log(`Server is running on port ${port_no}`);
});
