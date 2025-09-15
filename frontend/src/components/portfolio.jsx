// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
//  // Ensure you have appropriate CSS

// const Portfolio = () => {
//   const portfolioRef = useRef(null);
//   const [projects, setProjects] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('*');

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get('/api/projects'); // Adjust the URL as necessary
//         setProjects(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.1,
//     };

//     const handleIntersection = (entries, observer) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate');
//           observer.unobserve(entry.target);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);
//     const items = portfolioRef.current.querySelectorAll('.portfolio-item');

//     items.forEach(item => {
//       observer.observe(item);
//     });

//     return () => {
//       if (items) {
//         items.forEach(item => {
//           observer.unobserve(item);
//         });
//       }
//     };
//   }, [projects]);

//   const handleFilterClick = (filter) => {
//     setActiveFilter(filter);

//     const items = portfolioRef.current.querySelectorAll('.portfolio-item');
//     items.forEach(item => {
//       item.classList.remove('animate');
//       setTimeout(() => {
//         item.classList.add('animate');
//       }, 10);
//     });
//   };

//   return (
//     <section id="portfolio" className="portfolio section-bg">
//       <div className="container" ref={portfolioRef}>
//         <div className="section-title">
//           <h2>Portfolio</h2>
//           <p>Welcome to my portfolio! Here are some of my created projects in web development and design.</p>
//         </div>
//         <div className="col-lg-12 d-flex justify-content-center">
//           <ul id="portfolio-flters">
//             <li 
//               data-filter="*" 
//               className={activeFilter === '*' ? 'filter-active' : ''} 
//               onClick={() => handleFilterClick('*')}
//             >
//               All
//             </li>
//             <li 
//               data-filter=".filter-mini" 
//               className={activeFilter === '.filter-mini' ? 'filter-active' : ''} 
//               onClick={() => handleFilterClick('.filter-mini')}
//             >
//               Mini Projects
//             </li>
//             <li 
//               data-filter=".filter-mega" 
//               className={activeFilter === '.filter-mega' ? 'filter-active' : ''} 
//               onClick={() => handleFilterClick('.filter-mega')}
//             >
//               Mega Projects
//             </li>
//           </ul>
//         </div>
//         <div className="row portfolio-container">
//           {projects.map((project) => (
            
//             <div 
//               key={project.id} 
//               className={`col-lg-4 col-md-6 portfolio-item filter-${project.category} ${activeFilter === '*' || activeFilter === `.filter-${project.category}` ? 'show' : 'hide'}`}
//             >
//               <div className="portfolio-wrap">
//               <Link to={`/project/${project.slug}`} className="portfolio-source-btn">
//                 <div className="portfolio-info">
//                   <h4>{project.name}</h4>
//                 </div>
//                 {project.images && project.images.length > 0 && (
//         <img src={`/api/project_images/${project.images[0]}`} className="img-fluid" alt={project.name} />
//       )}
//       </Link>
//                 <div className="portfolio-links">
//                   <Link to={`/project/${project.slug}`} className="portfolio-source-btn">Details</Link> 
//                    <a href={project.sourceCode} className="portfolio-source-btn">Source code</a>
//                   <a href={project.livePreview} className="portfolio-preview-btn">Live Preview</a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Portfolio;








/* =========================
   🔑 ENV CONFIG
   - CRA/Vite (browser):  REACT_APP_VERCEL_TOKEN, REACT_APP_VERCEL_TEAM_ID (optional)
   - Next.js (browser):   NEXT_PUBLIC_VERCEL_TOKEN, NEXT_PUBLIC_VERCEL_TEAM_ID (optional)
   NOTE: Exposing token in the browser is unsafe; OK for private/testing.
   ========================= */
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Clock, Zap, Globe, AlertCircle, X, Calendar, Code, Activity, Eye, Sparkles, Brain, Target, Layers } from 'lucide-react';

// API tokens - in a real app, these should be environment variables
const VERCEL_TOKEN = import.meta.env.VITE_VERCEL_TOKEN;
const GEMINI_API = import.meta.env.VITE_GEMINI_API;

const VercelProjectsShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (!VERCEL_TOKEN) {
      setError('Vercel API token not found. Please set your Vercel API token.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.vercel.com/v9/projects', {
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGitHubRepoData = async (project) => {
    const githubUrl = getGithubUrl(project);
    if (!githubUrl) return null;

    try {
      const repoPath = githubUrl.replace('https://github.com/', '');
      const [owner, repo] = repoPath.split('/');

      // Fetch repository information
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      const repoData = await repoResponse.json();

      // Fetch README content
      let readmeContent = '';
      try {
        const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
        const readmeData = await readmeResponse.json();
        readmeContent = atob(readmeData.content).slice(0, 3000); // Limit to 3000 chars
      } catch (e) {
        console.log('No README found or error fetching README');
      }

      // Fetch package.json for better tech stack detection
      let packageJson = null;
      try {
        const packageResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`);
        const packageData = await packageResponse.json();
        packageJson = JSON.parse(atob(packageData.content));
      } catch (e) {
        console.log('No package.json found or error fetching package.json');
      }

      // Fetch directory structure (first level)
      let directoryStructure = [];
      try {
        const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
        const contentsData = await contentsResponse.json();
        directoryStructure = contentsData.map(item => ({
          name: item.name,
          type: item.type
        })).slice(0, 20); // Limit to 20 items
      } catch (e) {
        console.log('Error fetching directory structure');
      }

      return {
        repoData,
        readmeContent,
        packageJson,
        directoryStructure
      };
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return null;
    }
  };

  const generateProjectInsights = async (project) => {
    if (!GEMINI_API) {
      setAiInsights({
        error: 'Gemini API key not found. Please set your Gemini API key.'
      });
      return;
    }

    setAiLoading(true);
    setAiInsights(null);

    try {
      const projectUrl = getProjectUrl(project);
      const githubUrl = getGithubUrl(project);
      
      // Fetch GitHub repository data for more detailed analysis
      const githubData = await fetchGitHubRepoData(project);
      
      // Create a comprehensive prompt with repository data for portfolio showcase
      let prompt = `
        You are analyzing a project from my personal portfolio. I am the developer showcasing my work. 
        Generate a detailed, personalized project description based on the actual code and repository content.
        Write as if I am presenting this project in my portfolio.
        
        Project Details:
        - Name: ${project.name}
        - Framework: ${project.framework || 'Unknown'}
        - URL: ${projectUrl || 'No URL available'}
        - GitHub: ${githubUrl || 'No repository linked'}
        - Created: ${new Date(project.createdAt).toLocaleDateString()}
        - Last Updated: ${new Date(project.updatedAt).toLocaleDateString()}
      `;

      if (githubData) {
        prompt += `
        
        Repository Analysis (analyze this thoroughly):
        - Repository Description: ${githubData.repoData.description || 'No description'}
        - Primary Language: ${githubData.repoData.language || 'Unknown'}
        - Repository Size: ${Math.round((githubData.repoData.size || 0) / 1024)}MB
        - Stars: ${githubData.repoData.stargazers_count || 0}
        - Last Updated: ${githubData.repoData.pushed_at ? new Date(githubData.repoData.pushed_at).toLocaleDateString() : 'Unknown'}
        
        ${githubData.readmeContent ? `README Content (analyze this for project details):
        ${githubData.readmeContent}` : 'No README available'}
        
        ${githubData.packageJson ? `Dependencies & Scripts (analyze for tech stack):
        Main Dependencies: ${JSON.stringify(Object.keys(githubData.packageJson.dependencies || {}), null, 2)}
        Dev Dependencies: ${JSON.stringify(Object.keys(githubData.packageJson.devDependencies || {}), null, 2)}
        Available Scripts: ${JSON.stringify(githubData.packageJson.scripts || {}, null, 2)}
        Package Name: ${githubData.packageJson.name || 'N/A'}
        Description: ${githubData.packageJson.description || 'N/A'}` : 'No package.json available'}
        
        Project File Structure (analyze for project type and architecture):
        ${githubData.directoryStructure.map(item => `- ${item.name} (${item.type})`).join('\n')}
      `;
      }

      prompt += `
        
        IMPORTANT INSTRUCTIONS:
        1. Write in first person as if I am the developer presenting this project
        2. Be specific about what technologies I used and why
        3. Focus on what I accomplished and built, not generic recommendations
        4. Use actual details from the README, package.json, and code structure
        5. Make it sound professional but personal - like a portfolio presentation
        6. Avoid generic descriptions - be specific about the actual project
        
        Please provide a detailed JSON response with this structure:
        {
          "description": "A detailed 4-5 sentence first-person description of what I built, using specific details from the README and code. Start with 'I developed/built/created...' and explain the purpose, key features, and what makes it special.",
          "techStack": ["List of actual technologies I used, based on package.json dependencies and file structure"],
          "projectType": "Specific project category (e.g., 'Full-Stack E-commerce Platform', 'React Dashboard Application', 'Next.js Portfolio Website')",
          "keyFeatures": ["Specific features I implemented, based on README and code analysis"],
          "purpose": "What problem this project solves or what it demonstrates in my portfolio",
          "technicalHighlights": ["Specific technical accomplishments, patterns, or interesting solutions I implemented"],
          "developmentFocus": "What aspects of development this project showcases (e.g., 'Frontend Design', 'Full-Stack Development', 'API Integration', 'Performance Optimization')",
          "architecture": "Brief explanation of the project structure and architecture decisions I made",
          "complexity": "Simple|Moderate|Advanced (based on technical complexity and scope)"
        }
        
        Remember: This is MY project showcase. Write as if I'm proudly presenting my work to potential employers or clients.
        Base everything on actual repository content, not generic assumptions.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text;
      
      if (aiResponse) {
        try {
          // Try to parse JSON from the response
          const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const insights = JSON.parse(jsonMatch[0]);
            // Add GitHub data to insights for display
            insights.githubData = githubData;
            setAiInsights(insights);
          } else {
            // Fallback to plain text if JSON parsing fails
            setAiInsights({
              description: aiResponse.slice(0, 500) + '...',
              githubData: githubData,
              error: 'Could not parse structured response'
            });
          }
        } catch (parseError) {
          setAiInsights({
            description: aiResponse.slice(0, 500) + '...',
            githubData: githubData,
            error: 'Could not parse JSON response'
          });
        }
      }
    } catch (err) {
      setAiInsights({
        error: `Failed to generate insights: ${err.message}`
      });
    } finally {
      setAiLoading(false);
    }
  };

  const getProjectUrl = (project) => {
    const primaryAlias = project.targets?.production?.alias?.[0];
    return primaryAlias ? `https://${primaryAlias}` : null;
  };

  const getGithubUrl = (project) => {
    if (project.link?.type === 'github' && project.link?.repo) {
      return `https://github.com/${project.link.org || 'user'}/${project.link.repo}`;
    }
    return null;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFrameworkIcon = (framework) => {
    switch (framework?.toLowerCase()) {
      case 'nextjs':
        return '⚡';
      case 'react':
        return '⚛️';
      case 'vue':
        return '💚';
      case 'nuxtjs':
        return '💚';
      case 'svelte':
        return '🔥';
      case 'static':
        return '📄';
      default:
        return '🌐';
    }
  };

  const openPreview = (project) => {
    setSelectedProject(project);
    setPreviewLoading(true);
    setAiInsights(null);
    // Generate AI insights when opening preview
    generateProjectInsights(project);
  };

  const closePreview = () => {
    setSelectedProject(null);
    setPreviewLoading(false);
    setAiInsights(null);
    setAiLoading(false);
  };

  const handleIframeLoad = () => {
    setPreviewLoading(false);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading your projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="portfolio" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Vercel Projects</h1>
        <p style={styles.subtitle}>
          {projects.length} projects deployed • Enhanced with AI insights ✨
        </p>
      </div>

      <div style={styles.grid}>
        {projects.map((project) => {
          const projectUrl = getProjectUrl(project);
          const githubUrl = getGithubUrl(project);
          
          return (
            <div key={project.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.projectInfo}>
                  <div style={styles.frameworkBadge}>
                    <span style={styles.frameworkIcon}>
                      {getFrameworkIcon(project.framework)}
                    </span>
                    <span style={styles.frameworkText}>
                      {project.framework || 'Static'}
                    </span>
                  </div>
                  <h3 style={styles.projectName}>{project.name}</h3>
                </div>
                
                <div style={styles.actions}>
                  {projectUrl && (
                    <button
                      onClick={() => openPreview(project)}
                      style={styles.actionButton}
                      title="Preview with AI insights"
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  {projectUrl && (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.actionButton}
                      title="Visit site"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.actionButton}
                      title="View source"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div style={styles.cardBody}>
                {projectUrl && (
                  <div style={styles.urlContainer}>
                    <Globe size={14} />
                    <span style={styles.url}>{projectUrl.replace('https://', '')}</span>
                  </div>
                )}

                <div style={styles.metadata}>
                  <div style={styles.metadataItem}>
                    <Clock size={14} />
                    <span>Updated {formatDate(project.updatedAt)}</span>
                  </div>
                  
                  {project.latestDeployments?.[0]?.readyState === 'READY' && (
                    <div style={styles.statusBadge}>
                      <div style={styles.statusDot}></div>
                      <span>Production</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.cardFooter}>
                {projectUrl ? (
                  <button
                    onClick={() => openPreview(project)}
                    style={styles.previewButton}
                  >
                    <Sparkles size={14} />
                    Preview with AI Insights
                  </button>
                ) : (
                  <div style={styles.noUrlMessage}>
                    No production deployment
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal with AI Insights */}
      {selectedProject && (
        <div style={styles.modal} onClick={closePreview}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalProjectInfo}>
                <div style={styles.modalFrameworkBadge}>
                  <span style={styles.frameworkIcon}>
                    {getFrameworkIcon(selectedProject.framework)}
                  </span>
                  <span style={styles.frameworkText}>
                    {selectedProject.framework || 'Static'}
                  </span>
                </div>
                <h2 style={styles.modalTitle}>{selectedProject.name}</h2>
                <div style={styles.modalUrl}>
                  {getProjectUrl(selectedProject)?.replace('https://', '')}
                </div>
              </div>
              
              <div style={styles.modalActions}>
                <a
                  href={getProjectUrl(selectedProject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.modalActionButton}
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>
                {getGithubUrl(selectedProject) && (
                  <a
                    href={getGithubUrl(selectedProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.modalActionButton}
                    title="View source"
                  >
                    <Github size={18} />
                  </a>
                )}
                <button
                  onClick={closePreview}
                  style={styles.closeButton}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.sidebar}>
                {/* Project Details */}
                <div style={styles.sidebarSection}>
                  <h4 style={styles.sectionTitle}>Project Details</h4>
                  <div style={styles.projectDetails}>
                    <div style={styles.detailItem}>
                      <Calendar size={16} />
                      <div>
                        <div style={styles.detailLabel}>Created</div>
                        <div style={styles.detailValue}>{formatDate(selectedProject.createdAt)}</div>
                      </div>
                    </div>
                    
                    <div style={styles.detailItem}>
                      <Activity size={16} />
                      <div>
                        <div style={styles.detailLabel}>Last Updated</div>
                        <div style={styles.detailValue}>{formatDate(selectedProject.updatedAt)}</div>
                      </div>
                    </div>
                    
                    <div style={styles.detailItem}>
                      <Code size={16} />
                      <div>
                        <div style={styles.detailLabel}>Framework</div>
                        <div style={styles.detailValue}>{selectedProject.framework || 'Static'}</div>
                      </div>
                    </div>
                    
                    {selectedProject.latestDeployments?.[0] && (
                      <div style={styles.detailItem}>
                        <Zap size={16} />
                        <div>
                          <div style={styles.detailLabel}>Status</div>
                          <div style={{...styles.detailValue, ...styles.statusText}}>
                            <div style={styles.statusDot}></div>
                            {selectedProject.latestDeployments[0].readyState}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Insights Section */}
                <div style={styles.sidebarSection}>
                  <h4 style={styles.sectionTitle}>
                    <Sparkles size={18} />
                    AI Insights
                  </h4>
                  
                  {aiLoading && (
                    <div style={styles.aiLoading}>
                      <div style={styles.smallSpinner}></div>
                      <p>Analyzing project...</p>
                    </div>
                  )}

                  {aiInsights && !aiLoading && (
                    <div style={styles.aiInsights}>
                      {aiInsights.error ? (
                        <div style={styles.aiError}>
                          <AlertCircle size={16} />
                          <span>{aiInsights.error}</span>
                        </div>
                      ) : (
                        <>
                          {aiInsights.description && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Brain size={14} />
                                Description
                              </div>
                              <p style={styles.insightText}>{aiInsights.description}</p>
                            </div>
                          )}

                          {aiInsights.projectType && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Target size={14} />
                                Project Type
                              </div>
                              <span style={styles.insightBadge}>{aiInsights.projectType}</span>
                            </div>
                          )}

                          {aiInsights.techStack && aiInsights.techStack.length > 0 && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Layers size={14} />
                                Tech Stack
                              </div>
                              <div style={styles.techStack}>
                                {aiInsights.techStack.map((tech, index) => (
                                  <span key={index} style={styles.techBadge}>{tech}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {aiInsights.keyFeatures && aiInsights.keyFeatures.length > 0 && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Target size={14} />
                                Key Features
                              </div>
                              <ul style={styles.featureList}>
                                {aiInsights.keyFeatures.map((feature, index) => (
                                  <li key={index} style={styles.featureItem}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {aiInsights.purpose && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Brain size={14} />
                                Purpose
                              </div>
                              <p style={styles.insightText}>{aiInsights.purpose}</p>
                            </div>
                          )}

                          {aiInsights.technicalHighlights && aiInsights.technicalHighlights.length > 0 && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Sparkles size={14} />
                                Technical Highlights
                              </div>
                              <ul style={styles.featureList}>
                                {aiInsights.technicalHighlights.map((highlight, index) => (
                                  <li key={index} style={styles.featureItem}>{highlight}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {aiInsights.developmentFocus && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Code size={14} />
                                Development Focus
                              </div>
                              <span style={styles.insightBadge}>{aiInsights.developmentFocus}</span>
                            </div>
                          )}

                          {aiInsights.githubData && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Github size={14} />
                                Repository Stats
                              </div>
                              <div style={styles.repoStats}>
                                <div style={styles.statItem}>
                                  <span style={styles.statLabel}>Stars:</span>
                                  <span style={styles.statValue}>{aiInsights.githubData.repoData.stargazers_count || 0}</span>
                                </div>
                                <div style={styles.statItem}>
                                  <span style={styles.statLabel}>Forks:</span>
                                  <span style={styles.statValue}>{aiInsights.githubData.repoData.forks_count || 0}</span>
                                </div>
                                <div style={styles.statItem}>
                                  <span style={styles.statLabel}>Size:</span>
                                  <span style={styles.statValue}>{Math.round((aiInsights.githubData.repoData.size || 0) / 1024)}MB</span>
                                </div>
                                <div style={styles.statItem}>
                                  <span style={styles.statLabel}>Language:</span>
                                  <span style={styles.statValue}>{aiInsights.githubData.repoData.language || 'Unknown'}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {aiInsights.architecture && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>
                                <Layers size={14} />
                                Architecture
                              </div>
                              <p style={styles.insightText}>{aiInsights.architecture}</p>
                            </div>
                          )}

                          {aiInsights.complexity && (
                            <div style={styles.insightItem}>
                              <div style={styles.insightLabel}>Complexity Level</div>
                              <span style={{
                                ...styles.complexityBadge,
                                backgroundColor: 
                                  aiInsights.complexity === 'Simple' ? '#dcfce7' :
                                  aiInsights.complexity === 'Moderate' ? '#fef3c7' : 
                                  aiInsights.complexity === 'Advanced' ? '#ddd6fe' : '#fecaca',
                                color:
                                  aiInsights.complexity === 'Simple' ? '#166534' :
                                  aiInsights.complexity === 'Moderate' ? '#92400e' : 
                                  aiInsights.complexity === 'Advanced' ? '#5b21b6' : '#991b1b'
                              }}>
                                {aiInsights.complexity}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.previewContainer}>
                {previewLoading && (
                  <div style={styles.previewLoading}>
                    <div style={styles.spinner}></div>
                    <p>Loading preview...</p>
                  </div>
                )}
                <iframe
                  src={getProjectUrl(selectedProject)}
                  style={{
                    ...styles.iframe,
                    display: previewLoading ? 'none' : 'block'
                  }}
                  onLoad={handleIframeLoad}
                  title={`Preview of ${selectedProject.name}`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .vercel-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .vercel-action-button:hover {
          background-color: #000 !important;
          color: #fff !important;
        }
        
        .vercel-preview-button:hover {
          background-color: #333 !important;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#000',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: '0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    className: 'vercel-card',
  },
  cardHeader: {
    padding: '20px 20px 16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  projectInfo: {
    flex: 1,
  },
  frameworkBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '4px 8px',
    borderRadius: '16px',
    fontSize: '12px',
    marginBottom: '12px',
  },
  frameworkIcon: {
    marginRight: '4px',
  },
  frameworkText: {
    color: '#666',
    textTransform: 'capitalize',
  },
  projectName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#000',
    margin: '0',
    lineHeight: '1.3',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: '#f4f4f4',
    color: '#666',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    className: 'vercel-action-button',
  },
  cardBody: {
    padding: '0 20px 20px 20px',
  },
  urlContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '8px 12px',
    backgroundColor: '#f8f8f8',
    borderRadius: '6px',
  },
  url: {
    marginLeft: '8px',
    fontSize: '14px',
    color: '#666',
  },
  metadata: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#888',
  },
  metadataItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#16a34a',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#16a34a',
  },
  cardFooter: {
    padding: '16px 20px',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fafafa',
  },
  previewButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '8px 16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    className: 'vercel-preview-button',
  },
  noUrlMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10000',
    padding: '20px',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '1600px',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fafafa',
  },
  modalProjectInfo: {
    flex: 1,
  },
  modalFrameworkBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '4px 8px',
    borderRadius: '16px',
    fontSize: '12px',
    marginBottom: '8px',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#000',
    margin: '0 0 4px 0',
  },
  modalUrl: {
    fontSize: '14px',
    color: '#666',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  modalActionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#f4f4f4',
    color: '#666',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    className: 'vercel-action-button',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#f4f4f4',
    color: '#666',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    className: 'vercel-action-button',
  },
  modalBody: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '380px',
    backgroundColor: '#fafafa',
    borderRight: '1px solid #e5e5e5',
    overflow: 'auto',
  },
  sidebarSection: {
    padding: '24px',
    borderBottom: '1px solid #e5e5e5',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#000',
    margin: '0 0 16px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  projectDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: '4px',
  },
  detailValue: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
  },
  statusText: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#16a34a',
  },
  aiLoading: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    color: '#666',
    fontSize: '14px',
  },
  smallSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #f3f3f3',
    borderTop: '2px solid #000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  aiInsights: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  aiError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#dc2626',
    fontSize: '14px',
    padding: '12px',
    backgroundColor: '#fef2f2',
    borderRadius: '6px',
  },
  insightItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  insightLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  insightText: {
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.5',
    margin: '0',
  },
  insightBadge: {
    display: 'inline-block',
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  complexityBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  techBadge: {
    backgroundColor: '#e5e7eb',
    color: '#374151',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '500',
  },
  featureList: {
    margin: '0',
    paddingLeft: '16px',
    fontSize: '14px',
    color: '#555',
  },
  featureItem: {
    marginBottom: '4px',
    lineHeight: '1.4',
  },
  repoStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 8px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
    fontSize: '12px',
  },
  statLabel: {
    color: '#666',
    fontWeight: '500',
  },
  statValue: {
    color: '#333',
    fontWeight: '600',
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  previewLoading: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    zIndex: 10,
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    color: '#666',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    height: '400px',
    color: '#e11d48',
    backgroundColor: '#fef2f2',
    borderRadius: '8px',
    padding: '20px',
  },
};

export default VercelProjectsShowcase;