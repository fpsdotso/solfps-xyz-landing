# Zoho Mail Setup Guide for Waitlist Emails

## Overview

This guide helps you configure Zoho Mail to automatically send confirmation emails to users when they join the waitlist.

## Prerequisites

- A Zoho Mail account (Free tier works fine!)
- Your custom domain email (e.g., hello@solfps.xyz) or Zoho email (e.g., yourname@zohomail.com)

## Setup Steps

### Step 1: Create App-Specific Password (5 minutes)

For security, you should use an app-specific password instead of your regular Zoho password.

1. **Log in to Zoho Mail**
   - Go to [mail.zoho.com](https://mail.zoho.com)
   - Sign in with your account

2. **Navigate to Security Settings**
   - Click your profile icon (top right)
   - Go to **Settings** → **Security**

3. **Enable Two-Factor Authentication** (if not already enabled)
   - This is required to create app-specific passwords
   - Follow the prompts to set up 2FA

4. **Generate App-Specific Password**
   - Still in Security settings, find **App Passwords** or **Application-Specific Passwords**
   - Click **Generate New Password**
   - Name it: `SOLFPS Waitlist`
   - Copy the generated password immediately (you won't see it again!)

### Step 2: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Zoho Mail Configuration
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=465
ZOHO_EMAIL=your-email@yourdomain.com
ZOHO_PASSWORD=your-app-specific-password-here
ZOHO_FROM_NAME=SOLFPS Team
```

**Replace:**
- `your-email@yourdomain.com` with your actual Zoho email
- `your-app-specific-password-here` with the app password you just generated

### Step 3: SMTP Settings by Region

Zoho has different SMTP servers based on your region:

**US/International:**
```env
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=465
```

**Europe:**
```env
ZOHO_SMTP_HOST=smtp.zoho.eu
ZOHO_SMTP_PORT=465
```

**India:**
```env
ZOHO_SMTP_HOST=smtp.zoho.in
ZOHO_SMTP_PORT=465
```

**China:**
```env
ZOHO_SMTP_HOST=smtp.zoho.com.cn
ZOHO_SMTP_PORT=465
```

### Step 4: Test the Configuration

1. Restart your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to [http://localhost:3000](http://localhost:3000)

3. Submit a test entry with your email

4. Check your inbox! You should receive a confirmation email

## Email Configuration Details

### What Gets Sent?

When someone joins the waitlist, they receive:
- ✅ Professional HTML email with SOLFPS branding
- 📧 Plain text fallback for email clients that don't support HTML
- 🎮 Information about what to expect
- 🚀 Details about the game features

### Email Content

The confirmation email includes:
- Personalized greeting (using their name if provided)
- Welcome message
- Game features overview
- What they can expect from the waitlist
- SOLFPS branding and styling

## Troubleshooting

### "Email not configured" message

**Solution:** Make sure all Zoho environment variables are set in `.env.local`

### "Authentication failed"

**Possible causes:**
1. Using regular password instead of app-specific password
   - **Fix:** Generate an app-specific password
2. Wrong email address
   - **Fix:** Verify your Zoho email is correct
3. Wrong SMTP server for your region
   - **Fix:** Check the region-specific SMTP settings above

### "Connection timeout"

**Possible causes:**
1. Wrong SMTP port
   - **Fix:** Use port `465` (SSL) or `587` (TLS)
2. Firewall blocking SMTP
   - **Fix:** Check your network/firewall settings

### Email goes to spam

**Solutions:**
1. Ask users to add your email to their contacts
2. Set up SPF and DKIM records in your domain settings
3. Use a custom domain email instead of @zohomail.com

## Using Custom Domain Email

If you have a custom domain (e.g., hello@solfps.xyz):

1. **Add Domain to Zoho**
   - Go to Zoho Mail Admin Console
   - Add and verify your domain
   - Set up MX records

2. **Create Email Address**
   - Create `hello@solfps.xyz` or `team@solfps.xyz`
   - Use this email in your `.env.local`

3. **Update DNS Records**
   - Add SPF record: `v=spf1 include:zoho.com ~all`
   - Add DKIM record (provided by Zoho)
   - This improves email deliverability

## Email Limits

### Zoho Free Plan:
- 5 GB storage
- 25 MB attachment limit
- **5,000 emails per day** (more than enough for a waitlist!)

### Zoho Mail Lite (Paid):
- More storage
- Higher limits
- Custom domain included

## Optional: Customize the Email Template

To customize the confirmation email, edit:
```
/src/lib/email.ts
```

You can modify:
- Email subject line
- HTML template and styling
- Text content
- Branding and colors

## Production Deployment

When deploying to production (Vercel/Cloudflare):

1. Add the Zoho environment variables to your deployment platform
2. Make sure to use the correct SMTP server for your region
3. Monitor email sending logs
4. Consider setting up email error notifications

## Security Best Practices

- ✅ Always use app-specific passwords
- ✅ Never commit `.env.local` to git
- ✅ Rotate passwords periodically
- ✅ Enable 2FA on your Zoho account
- ✅ Monitor email sending activity
- ✅ Use environment variables for all credentials

## Alternative: Disable Email Notifications

If you don't want to send emails, the waitlist will still work! Submissions will be saved to Google Sheets, but users won't receive confirmation emails.

Simply don't set the Zoho environment variables, and the system will skip email sending.

## Support

- [Zoho Mail Help](https://www.zoho.com/mail/help/)
- [Zoho SMTP Documentation](https://www.zoho.com/mail/help/zoho-smtp.html)
- Check server logs for detailed error messages
