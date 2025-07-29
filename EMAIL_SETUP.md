# Email Setup Guide for Portfolio Contact Form

Your portfolio contact form now supports multiple email services. Choose one of the following options:

## Option 1: Formspree (Recommended - Easiest)

1. **Sign up at Formspree**: Go to https://formspree.io/ and create a free account
2. **Create a new form**: Click "New Form" and give it a name like "Portfolio Contact"
3. **Get your form ID**: Copy the form ID (it looks like `xrgjqkqw`)
4. **Update the config**: Open `src/emailConfig.js` and replace:
   ```javascript
   ENDPOINT: "https://formspree.io/f/YOUR_FORM_ID"
   ```
   with:
   ```javascript
   ENDPOINT: "https://formspree.io/f/xrgjqkqw" // Replace with your actual form ID
   ```

## Option 2: EmailJS (More Features)

1. **Sign up at EmailJS**: Go to https://www.emailjs.com/ and create a free account
2. **Add Email Service**: Go to "Email Services" and add your email (Gmail, Outlook, etc.)
3. **Create Email Template**: Go to "Email Templates" and create a template like:
   ```
   Subject: Portfolio Contact from {{from_name}}
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```
4. **Get your keys**: Copy your Public Key, Service ID, and Template ID
5. **Update the config**: Open `src/emailConfig.js` and replace the placeholder values with your actual keys

## Option 3: Default Fallback

If neither service is configured, the form will open the user's email client with a pre-filled message.

## Testing

After setup:
1. Run `npm run deploy` to deploy your changes
2. Test the contact form on your live portfolio
3. Check your email to confirm messages are being received

## Troubleshooting

- **Formspree**: Check your spam folder for confirmation emails
- **EmailJS**: Verify all three keys are correct in the config file
- **Both**: Check browser console for error messages

## Security Notes

- Formspree and EmailJS are secure, trusted services
- Your email address is not exposed in the code
- Both services offer spam protection 