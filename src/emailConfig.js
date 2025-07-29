// EmailJS Configuration
// You need to sign up at https://www.emailjs.com/ and get these values

export const emailConfig = {
  // Your EmailJS Public Key (found in Account > API Keys)
  PUBLIC_KEY: "YOUR_PUBLIC_KEY_HERE",
  
  // Your EmailJS Service ID (found in Email Services)
  SERVICE_ID: "YOUR_SERVICE_ID_HERE",
  
  // Your EmailJS Template ID (found in Email Templates)
  TEMPLATE_ID: "YOUR_TEMPLATE_ID_HERE"
};

// Alternative: Formspree (easier setup)
export const formspreeConfig = {
  // Your Formspree endpoint (sign up at https://formspree.io/)
  ENDPOINT: "https://formspree.io/f/YOUR_FORM_ID"
}; 