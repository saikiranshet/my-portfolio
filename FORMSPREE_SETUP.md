# Formspree Setup Guide for Contact Form

## Quick Setup (5 minutes)

### Step 1: Create Formspree Account
1. Go to https://formspree.io/
2. Click "Get Started" or "Sign Up"
3. Create a free account (you can use your Google account)

### Step 2: Create a New Form
1. After signing in, click "New Form"
2. Form name: "Portfolio Contact"
3. Email: saikiran.shet@gmail.com (your email)
4. Click "Create Form"

### Step 3: Get Your Form ID
1. After creating the form, you'll see a form ID like `xrgjqkqw`
2. Copy this form ID

### Step 4: Update Your Code
1. Open `src/emailConfig.js`
2. Replace the ENDPOINT with your actual form ID:
   ```javascript
   ENDPOINT: "https://formspree.io/f/YOUR_ACTUAL_FORM_ID"
   ```
   For example: `"https://formspree.io/f/xrgjqkqw"`

### Step 5: Deploy
1. Run: `npm run deploy`
2. Test the contact form on your live portfolio

## How It Works

- When someone fills out your contact form, Formspree will:
  - Send an email to saikiran.shet@gmail.com
  - Include the sender's name, email, and message
  - Provide spam protection
  - Allow you to reply directly to the sender

## Email Format

You'll receive emails like this:
```
From: [Sender's Name] <[Sender's Email]>
Subject: Portfolio Contact from [Sender's Name]

Name: [Sender's Name]
Email: [Sender's Email]

Message:
[Their message content]
```

## Troubleshooting

- Check your spam folder for the first email
- Make sure the form ID is correct in the config file
- Test with a different email address first
- Formspree free plan allows 50 submissions per month

## Alternative: Use the Current Setup

The current setup uses a placeholder form ID. To make it work:
1. Follow the steps above to get your own form ID
2. Update the config file
3. Deploy the changes 