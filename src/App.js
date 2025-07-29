import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import avatar from './Capture.PNG';
import Typical from 'react-typical';
import { Link as ScrollLink, Element, Events, scroller } from 'react-scroll';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import Switch from 'react-switch';

const sections = [
  { id: 'about', label: 'About', icon: 'fa-user' },
  { id: 'skills', label: 'Skills', icon: 'fa-code' },
  { id: 'experience', label: 'Experience', icon: 'fa-briefcase' },
  { id: 'projects', label: 'Projects', icon: 'fa-diagram-project' },
  { id: 'achievements', label: 'Achievements', icon: 'fa-trophy' },
  { id: 'contact', label: 'Contact', icon: 'fa-envelope' },
];

const projects = [
  {
    title: 'Data-Driven Automation Framework',
    year: '2023',
    desc: 'Enhanced automation framework using Selenium, Python, PyTest, Git and Jenkins',
    details: 'One of the key architects in enhancing data-driven automation framework. Reduced monthly effort by 5-man days by enhancing the Tizen IDE data-driven UI automation framework.',
  },
  {
    title: 'API Test Framework',
    year: '2023',
    desc: 'Developed automation frameworks for both front end and back end',
    details: 'Setting up Framework for test execution, retrieving failure reports, and conducting analysis to make informed sign-off decisions.',
  },
  {
    title: 'IoT Device Testing',
    year: '2019-2022',
    desc: 'Designed Selenium test automation Data Driven framework for navigation and other systems',
    details: 'Published and debugged BDD reports to stakeholders and planned measures for Samsung IoT Devices. Delivered critical & priority automation scripts within strict deadlines for new features.',
  },
];

const skills = [
  'AI/LLM', 'JIRA', 'Automation', 'Manual Testing', 'Postman', 'Appium', 'Selenium', 'Agile',
  'SQL', 'No SQL', 'MongoDB', 'Linux', 'VS Code', 'Git', 'Docker', 'AWS CloudWatch', 'PyTest',
  'API Testing', 'Playwright', 'AI Driven Tests', 'Behave', 'Confluence', 'Jenkins (CI/CD)',
  'Allure Report', 'Wiremock', 'Load Testing (JMeter)', 'Framework Design', 'XRAY', 'Kafka',
  'SOAP UI', 'Smoke Testing', 'Regression Testing', 'Problem Solving', 'Shift Left Testing',
  'Root Cause Analysis'
];

const achievements = [
  'One of the key architects in enhancing data-driven automation framework using Selenium, Python, PyTest, Git and Jenkins',
  'Reduced monthly effort by 5-man days by enhancing the Tizen IDE data-driven UI automation framework',
  'Best Ideation awards from Samsung R and D Institute'
];

Modal.setAppElement('#root');

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setTimeout(() => {
      setFormStatus('Message sent!');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 2000);
    }, 1200);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={`app-root${darkMode ? ' dark' : ''}`}> 
      <aside className="sidebar">
        <div className="avatar-container">
          <img src={avatar} alt="Saikiran Shet" className="avatar" />
          <h1>Saikiran Shet</h1>
          <p className="sidebar-title">SDET-2/QA Engineer</p>
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
          <a className="social-icon" href="#" title="GitHub"><i className="fab fa-github"></i></a>
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
              <span className="animated-title">SDET-2/QA Engineer | Automation Expert | AI & Innovation-Driven</span>
              <p style={{ marginTop: 16 }}>
                Dynamic and results-driven Automation Engineer with a passion for optimizing cloud infrastructure. 
                Experienced in developing and maintaining test automation tools, enhancing CI/CD pipelines, and designing robust API test frameworks. 
                Professional in Agile Test Methodologies, SDLC, and Software Testing Life Cycle. 
                Highly skilled Engineer with over 8+ years of experience in test planning, designing, and execution of backend API testing across major cloud platforms.<br />
                <span className="location"><i className="fa-solid fa-location-dot"></i> Bangalore, India</span>
              </p>
              <a href="/resume.pdf" download className="resume-btn">
                <i className="fa-solid fa-download"></i> Download Resume
              </a>
            </div>
          </div>
        </Element>
        <Element name="skills" id="skills" className="section">
          <h2><i className="fa-solid fa-code"></i> Technology & Tools</h2>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                className="skill-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <i className="fa-solid fa-check"></i> {skill}
              </motion.div>
            ))}
          </div>
        </Element>
        <Element name="experience" id="experience" className="section">
          <h2><i className="fa-solid fa-briefcase"></i> Work Experience</h2>
          <div className="experience-list">
            <div className="experience-item">
              <h3>SDET-2</h3>
              <p className="company">Sequoia Consulting Group</p>
              <p className="duration">August 2023 - Present</p>
              <ul>
                <li>Revising regression test cases and executing regression suites to ensure the continued stability of simulator dashboard</li>
                <li>Setting up Framework for test execution, retrieving failure reports, and conducting analysis to make informed sign-off decisions</li>
                <li>Developed automation frameworks for both front end and back end</li>
                <li>Conducting debugging and in-depth failure analysis in collaboration with developers and product owners</li>
                <li>Coaching team members in identifying team goals and evaluating team progress for continuous improvement</li>
              </ul>
            </div>
            <div className="experience-item">
              <h3>Senior QA Engineer</h3>
              <p className="company">Biofourmis India Pvt Ltd</p>
              <p className="duration">August 2022 - July 2023</p>
              <ul>
                <li>Web App Manual and Automation Testing</li>
                <li>Strong Experience in test planning and design of backend API testing for various business and technical scenarios</li>
                <li>Collaborating closely with developers, product managers, and key stakeholders to ensure alignment and effectiveness</li>
              </ul>
            </div>
            <div className="experience-item">
              <h3>Senior QA Engineer</h3>
              <p className="company">Samsung R and D Institute</p>
              <p className="duration">February 2019 - August 2022</p>
              <ul>
                <li>Designed Selenium test automation Data Driven framework for navigation and other systems</li>
                <li>Published and debugged BDD reports to stakeholders and planned measures for Samsung IoT Devices</li>
                <li>Delivered critical & priority automation scripts within strict deadlines for new features</li>
              </ul>
            </div>
            <div className="experience-item">
              <h3>Engineer</h3>
              <p className="company">Life Signal India Pvt Ltd</p>
              <p className="duration">February 2017 - February 2019</p>
              <ul>
                <li>Worked on IoT Device testing and automating the device as per the requirement</li>
                <li>Experience with testing mobile applications (Android, iOS) and automated test cases using Appium with extensive use of pytorch, matlab</li>
                <li>Worked closely with the functional team (Dev) to follow the user-centric quality of feature design by monitoring KPIs, customer VOC and feedback</li>
              </ul>
            </div>
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
                <button className="modal-close" onClick={closeModal}>Close</button>
              </div>
            )}
          </Modal>
        </Element>
        <Element name="achievements" id="achievements" className="section">
          <h2><i className="fa-solid fa-trophy"></i> Achievements</h2>
          <div className="achievements-list">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                className="achievement-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <i className="fa-solid fa-award"></i> {achievement}
              </motion.div>
            ))}
          </div>
        </Element>
        <Element name="contact" id="contact" className="section">
          <h2><i className="fa-solid fa-envelope"></i> Contact</h2>
          <div className="contact-info">
            <p><i className="fa-solid fa-phone"></i> <strong>Phone:</strong> +91-8861532391</p>
            <p><i className="fa-solid fa-envelope"></i> <strong>Email:</strong> Saikiran.shet@gmail.com</p>
            <p><i className="fa-solid fa-location-dot"></i> <strong>Location:</strong> Bangalore, India</p>
          </div>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleFormChange} required />
            <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleFormChange} required />
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleFormChange} required />
            <button type="submit">Send</button>
            {formStatus && <div className="form-status">{formStatus}</div>}
          </form>
          <p style={{ marginTop: 16 }}>Connect with me on <a href="https://www.linkedin.com/in/saikiran-tukaram-shet-39b146121/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </Element>
        <footer>
          <p>&copy; 2024 Saikiran Shet</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
