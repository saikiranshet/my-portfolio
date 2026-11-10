import React, { useState, useEffect } from 'react';
import './App.css';
import avatar from './Capture.PNG';
import { Link as ScrollLink, Element, Events } from 'react-scroll';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import Switch from 'react-switch';
import emailjs from '@emailjs/browser';
import { emailConfig, formspreeConfig } from './emailConfig';

const sections = [
  { id: 'about', label: 'About', icon: 'fa-user' },
  { id: 'skills', label: 'Skills', icon: 'fa-code' },
  { id: 'experience', label: 'Experience', icon: 'fa-briefcase' },
  { id: 'projects', label: 'Projects', icon: 'fa-diagram-project' },
  { id: 'achievements', label: 'Impact', icon: 'fa-chart-line' },
  { id: 'education', label: 'Education', icon: 'fa-graduation-cap' },
  { id: 'contact', label: 'Contact', icon: 'fa-envelope' },
];

const projects = [
  {
    title: 'Playwright Automation Framework',
    year: 'Parabank',
    desc: 'End-to-end UI and API automation with reusable page objects, fixtures, and CI execution support.',
    details: 'A Playwright-based automation framework for end-to-end UI and API validation, with reusable page objects, fixtures, and continuous integration support.',
    url: 'https://github.com/saikiranshet/playwright_automation-_using_automation',
  },
  {
    title: 'REST API Automation Framework',
    year: 'Python',
    desc: 'Reusable REST API checks for authentication, data validation, negative cases, and regression runs.',
    details: 'A Python automation framework covering REST API authentication, response and data validation, negative scenarios, and repeatable regression execution.',
    url: 'https://github.com/saikiranshet/RESTAPI_FOR_TESTING_PYTHON',
  },
];

const skillGroups = [
  {
    title: 'Languages & frontend',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'PowerShell', 'HTML5', 'CSS3', 'Responsive design', 'RxJS', 'Component architecture'],
  },
  {
    title: 'Backend & data',
    skills: ['FastAPI / Flask exposure', 'REST APIs', 'Postman', 'Authentication & authorization', 'Middleware', 'SQL', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Quality engineering',
    skills: ['Playwright', 'PyTest', 'Selenium', 'Cypress', 'Behave / Cucumber', 'Robot Framework', 'Appium', 'API & E2E automation'],
  },
  {
    title: 'Cloud, delivery & collaboration',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'GitHub Actions', 'Bitbucket Pipelines', 'Git', 'Jira', 'Xray', 'Allure'],
  },
  {
    title: 'Testing & engineering practice',
    skills: ['Functional & non-functional testing', 'Integration & end-to-end testing', 'Regression & exploratory testing', 'Smoke & sanity testing', 'Security testing', 'Performance & stress testing', 'Reliability testing', 'CI quality gates', 'Agile / Scrum', 'GitHub Copilot', 'Cursor', 'LangChain'],
  },
];

const achievements = [
  { value: '80%', label: 'increase in automated regression coverage' },
  { value: '80%', label: 'reduction in automation execution time' },
  { value: '90%', label: 'improvement in product stability' },
  { value: '99.95%', label: 'availability achieved across releases' },
  { value: '3x', label: 'improvement in concurrency' },
  { value: '40%', label: 'reduction in outages' },
  { value: '30%', label: 'faster test authoring, with 20% more coverage' },
];

const experience = [
  {
    role: 'Senior Engineer',
    company: 'Sequoia Consulting Group',
    duration: 'August 2023 - Present',
    details: [
      'Develop enterprise web application features with React, TypeScript, HTML5, and reusable component architecture.',
      'Build responsive frontend modules integrated with REST APIs and business workflows.',
      'Define requirements, API contracts, acceptance criteria, test strategies, and risk-based release validation with product, backend, and architecture teams.',
      'Designed and maintained a Playwright + PyTest framework for UI, API, integration, and end-to-end workflows, increasing automated regression coverage by 80%.',
      'Integrated automated suites into Jenkins and GitHub Actions, reducing execution time by 80% and adding release quality gates.',
    ],
    technologies: 'React, TypeScript, Python, FastAPI, PyTest, Playwright, AWS, SQL, Jenkins, GitHub Actions, Bitbucket Pipelines, Git',
  },
  {
    role: 'Senior Engineer',
    company: 'Biofourmis India Pvt Ltd',
    duration: 'August 2022 - July 2023',
    details: [
      'Developed Python and React components and built PyTest automation for a cloud healthcare platform based on microservices.',
      'Designed end-to-end test strategies and validated integrations as system design and architecture evolved.',
      'Implemented performance and stress tests to assess cluster stability.',
      'Led functional, security, reliability, and performance testing, contributing to a reported 90% improvement in product stability.',
    ],
    technologies: 'React, Python, PyTest, Microservices, Cloud healthcare',
  },
  {
    role: 'Senior Engineer',
    company: 'Samsung R&D Institute',
    duration: 'February 2019 - August 2022',
    details: [
      'Built a data-driven Selenium framework for navigation systems, accelerating test authoring by 30% and increasing coverage by 20%.',
      'Published and debugged BDD reports for stakeholders and owned test suites, cases, and end-to-end activities.',
      'Enhanced Selenium, Python, and PyTest frameworks, reducing monthly effort by five person-days.',
      'Added soak and chaos scenarios to address scaling gaps; achieved 99.95% availability, 3x concurrency, and 40% fewer outages across releases.',
    ],
    technologies: 'Selenium, Python, PyTest, Robot Framework, Java, JavaScript, Jenkins, BDD',
  },
  {
    role: 'Engineer',
    company: 'Life Signals India Pvt Ltd',
    duration: 'February 2017 - February 2019',
    details: [
      'Established Python and Robot Framework automation practices to reduce manual testing and speed release cycles.',
      'Worked on embedded and IoT device automation with C and C++, validating I2C, UART, and IPC communication.',
      'Designed Android and iOS test plans and automated mobile workflows with Appium.',
      'Built simulation test benches for repeatable runs and reduced test flakiness.',
    ],
    technologies: 'Python, Robot Framework, Appium, C, C++, Android, iOS, I2C, UART, IPC',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) Modal.setAppElement(rootElement);
  }, []);

  // Initialize EmailJS (only if configured)
  useEffect(() => {
    if (emailConfig.PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
      emailjs.init(emailConfig.PUBLIC_KEY);
    }
  }, []);

  // Scroll event for active section highlight
  useEffect(() => {
    Events.scrollEvent.register('begin', () => {});
    Events.scrollEvent.register('end', () => {});
    const handleScroll = () => {
      let found = 'about';
      for (let s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) found = s.id;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Modal handlers
  const openModal = (project) => {
    setModalProject(project);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  // Contact form handlers
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    
    // Option 1: EmailJS (if configured)
    if (emailConfig.PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: 'Saikiran Shet',
        reply_to: form.email,
      };

      emailjs.send(
        emailConfig.SERVICE_ID,
        emailConfig.TEMPLATE_ID,
        templateParams
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setFormStatus('Failed to send message. Please try again or email me directly at Saikiran.shet@gmail.com');
        setTimeout(() => setFormStatus(''), 5000);
      });
    }
    // Option 2: Formspree (if configured)
    else if (formspreeConfig.ENDPOINT !== "https://formspree.io/f/YOUR_FORM_ID" && !formspreeConfig.ENDPOINT.includes("YOUR_FORM_ID")) {
      fetch(formspreeConfig.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      .then((response) => {
        if (response.ok) {
          setFormStatus('Message sent successfully!');
          setForm({ name: '', email: '', message: '' });
          setTimeout(() => setFormStatus(''), 3000);
        } else {
          throw new Error('Failed to send');
        }
      })
      .catch((err) => {
        console.log('FAILED...', err);
        setFormStatus('Failed to send message. Please try again or email me directly at Saikiran.shet@gmail.com');
        setTimeout(() => setFormStatus(''), 5000);
      });
    }
    // Option 3: Fallback - redirect to email client
    else {
      const subject = encodeURIComponent('Portfolio Contact from ' + form.name);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.open(`mailto:Saikiran.shet@gmail.com?subject=${subject}&body=${body}`);
      setFormStatus('Email service not configured. Opening email client... Please send manually.');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 4000);
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleResumeDownload = () => {
    setIsDownloading(true);
    try {
      // Method 1: Using fetch to get the file and create blob
      fetch(process.env.PUBLIC_URL + '/resume.pdf')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Saikiran_Shet_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setIsDownloading(false);
        })
        .catch(error => {
          console.error('Download failed:', error);
          // Fallback method
          const link = document.createElement('a');
          link.href = process.env.PUBLIC_URL + '/resume.pdf';
          link.download = 'Saikiran_Shet_Resume.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setIsDownloading(false);
        });
    } catch (error) {
      console.error('Download error:', error);
      // Final fallback - open in new tab
      window.open(process.env.PUBLIC_URL + '/resume.pdf', '_blank');
      setIsDownloading(false);
    }
  };

  return (
    <div className={`app-root${darkMode ? ' dark' : ''}`}> 
      <aside className="sidebar">
        <div className="avatar-container">
          <img src={avatar} alt="Saikiran Shet" className="avatar" />
          <h1>Saikiran Shet</h1>
          <p className="sidebar-title">Senior Engineer</p>
        </div>
        
        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        
        <nav className={`sidebar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <ScrollLink
                  to={s.id}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className={activeSection === s.id ? 'active' : ''}
                  spy={true}
                  onClick={handleMobileNavClick}
                >
                  <i className={`fa-solid ${s.icon}`}></i> {s.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a className="social-icon" href="https://www.linkedin.com/in/saikiran-tukaram-shet-39b146121/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
          <a className="social-icon" href="https://github.com/saikiranshet/my-portfolio" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fab fa-github"></i></a>
          <a className="social-icon" href="mailto:Saikiran.shet@gmail.com" title="Email"><i className="fa-solid fa-envelope"></i></a>
        </div>
        <div style={{ marginTop: 20 }}>
          <span style={{ color: '#ffd600', fontWeight: 600, fontSize: 14 }}>Dark Mode</span>
          <Switch
            onChange={() => setDarkMode((d) => !d)}
            checked={darkMode}
            onColor="#222"
            offColor="#bbb"
            uncheckedIcon={false}
            checkedIcon={false}
            height={18}
            width={38}
          />
        </div>
      </aside>
      <main className="content">
        <Element name="about" id="about" className="section">
          <div className="hero-banner">
            <div className="hero-text">
              <h2><i className="fa-solid fa-user"></i> About</h2>
              <span className="animated-title">Full Stack Engineer | Quality Engineering | Cloud & AI</span>
              <p className="profile-summary">
                Full Stack Engineer with 9+ years of experience, including 5+ years in full-stack application development and 4+ years in software quality engineering and test automation. Builds scalable web applications, REST APIs, and cloud-native solutions with a strong focus on performance, testability, and user experience.
              </p>
              <div className="profile-metrics" aria-label="Experience overview">
                <div><strong>9+</strong><span>years total</span></div>
                <div><strong>5+</strong><span>full-stack development</span></div>
                <div><strong>4+</strong><span>quality engineering</span></div>
              </div>
              <p className="location"><i className="fa-solid fa-location-dot"></i> Bangalore, India</p>
              <button onClick={handleResumeDownload} className="resume-btn" disabled={isDownloading}>
                <i className={isDownloading ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-download"}></i> 
                {isDownloading ? 'Downloading...' : 'Download Resume'}
              </button>
            </div>
          </div>
        </Element>
        <Element name="skills" id="skills" className="section">
          <h2><i className="fa-solid fa-code"></i> Technical Skills</h2>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skills-grid">
                  {group.skills.map((skill) => <span className="skill-item" key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Element>
        <Element name="experience" id="experience" className="section">
          <h2><i className="fa-solid fa-briefcase"></i> Work Experience</h2>
          <div className="experience-list">
            {experience.map((job) => (
              <article className="experience-item" key={job.company}>
                <h3>{job.role}</h3>
                <p className="company">{job.company}</p>
                <p className="duration">{job.duration}</p>
                <ul>{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <p className="technology-line"><strong>Technologies:</strong> {job.technologies}</p>
              </article>
            ))}
          </div>
        </Element>
        <Element name="projects" id="projects" className="section">
          <h2><i className="fa-solid fa-diagram-project"></i> Key Projects</h2>
          <div className="project-list">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                className="project-card"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(30,40,90,0.13)' }}
                onClick={() => openModal(p)}
                tabIndex={0}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="project-title">{p.title} <span className="project-year">({p.year})</span></div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-more">View Details</div>
              </motion.div>
            ))}
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="modal-overlay"
            contentLabel="Project Details"
          >
            {modalProject && (
              <div>
                <h2>{modalProject.title}</h2>
                <p><b>Year:</b> {modalProject.year}</p>
                <p>{modalProject.details}</p>
                <a className="project-repository" href={modalProject.url} target="_blank" rel="noopener noreferrer">
                  View project on GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <button className="modal-close" onClick={closeModal}>Close</button>
              </div>
            )}
          </Modal>
        </Element>
        <Element name="achievements" id="achievements" className="section">
          <h2><i className="fa-solid fa-chart-line"></i> Selected Impact</h2>
          <div className="impact-grid">
            {achievements.map((achievement) => (
              <div className="impact-item" key={achievement.label}>
                <strong>{achievement.value}</strong>
                <span>{achievement.label}</span>
              </div>
            ))}
          </div>
        </Element>
        <Element name="education" id="education" className="section">
          <h2><i className="fa-solid fa-graduation-cap"></i> Education & Certification</h2>
          <div className="education-entry">
            <div>
              <h3>Bachelor of Technology (B.Tech)</h3>
              <p>NMAM Institute of Technology</p>
            </div>
            <span>May 2016</span>
          </div>
          <div className="certification-entry">
            <i className="fa-solid fa-certificate"></i>
            <span>ISTQB Certified Engineer</span>
          </div>
          <div className="certification-entry">
            <i className="fa-solid fa-language"></i>
            <span>Language: English</span>
          </div>
        </Element>
        <Element name="contact" id="contact" className="section">
          <h2><i className="fa-solid fa-envelope"></i> Contact</h2>
          <div className="contact-info">
            <p><i className="fa-solid fa-phone"></i> <strong>Phone:</strong> +91-8861532391</p>
            <p><i className="fa-solid fa-envelope"></i> <strong>Email:</strong> <a href="mailto:saikiran.shet@gmail.com">saikiran.shet@gmail.com</a></p>
            <p><i className="fa-solid fa-location-dot"></i> <strong>Location:</strong> Bangalore, India</p>
          </div>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleFormChange} required />
            <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleFormChange} required />
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleFormChange} required />
            <button type="submit">Send</button>
            {formStatus && <div className="form-status">{formStatus}</div>}
          </form>
          <p style={{ marginTop: 16 }}>Connect with me on <a href="https://www.linkedin.com/in/saikiran-tukaram-shet-39b146121/" target="_blank" rel="noopener noreferrer">LinkedIn</a> and <a href="https://github.com/saikiranshet" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </Element>
        <footer>
          <p>&copy; {new Date().getFullYear()} Saikiran Shet</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
