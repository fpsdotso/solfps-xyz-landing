# Google Sheets API Integration Guide

## Overview

This waitlist system integrates with Google Sheets through the Google Sheets API. Submissions are automatically added to a Google Spreadsheet - no Azure or Microsoft account needed!

## Quick Setup (10 minutes)

### Step 1: Create a Google Sheet (1 minute)

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: `SOLFPS Waitlist`
4. In the first sheet, add headers in Row 1:
   ```
   Timestamp | Name | Email | Wallet Address
   ```
5. Rename the sheet to `Waitlist` (or keep "Sheet1" and update env variable)
6. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit
   ```

### Step 2: Create Google Cloud Project (3 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click the project dropdown → **New Project**
3. Name it: `SOLFPS Waitlist` (or any name)
4. Click **Create**
5. Wait for the project to be created and select it

### Step 3: Enable Google Sheets API (1 minute)

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

### Step 4: Create Service Account (2 minutes)

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - Service account name: `solfps-waitlist`
   - Service account ID: (auto-generated)
4. Click **Create and Continue**
5. Skip optional sections, click **Done**

### Step 5: Generate JSON Key (2 minutes)

1. In the **Service Accounts** list, click on your newly created service account
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create**
6. A JSON file will download - **keep this safe!**

### Step 6: Share Sheet with Service Account (1 minute)

1. Open the JSON key file you downloaded
2. Copy the `client_email` value (looks like: `solfps-waitlist@your-project.iam.gserviceaccount.com`)
3. Go back to your Google Sheet
4. Click **Share** button
5. Paste the service account email
6. Give it **Editor** access
7. **Uncheck** "Notify people"
8. Click **Share**

### Step 7: Configure Environment Variables

Create `.env.local` in your project root:

```env
GOOGLE_SHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
GOOGLE_PROJECT_ID=your-project-id-123456
GOOGLE_PRIVATE_KEY_ID=abc123def456ghi789
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BA...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=solfps-waitlist@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=123456789012345678901
SHEET_NAME=Waitlist
```

**How to get these values from your JSON key file:**

Your downloaded JSON file looks like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id-123456",           ← GOOGLE_PROJECT_ID
  "private_key_id": "abc123def456ghi789",           ← GOOGLE_PRIVATE_KEY_ID
  "private_key": "-----BEGIN PRIVATE KEY-----\n...", ← GOOGLE_PRIVATE_KEY
  "client_email": "service@project.iam.gserviceaccount.com", ← GOOGLE_CLIENT_EMAIL
  "client_id": "123456789012345678901",             ← GOOGLE_CLIENT_ID
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

**Copy each value directly from the JSON file to your `.env.local` file.**

**Important:** 
- For `GOOGLE_PRIVATE_KEY`, keep the `\n` characters (they represent newlines)
- Wrap the private key in quotes
- Don't modify the BEGIN/END markers

### Step 8: Test the Integration

1. Start (or restart) your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to [http://localhost:3000](http://localhost:3000)

3. Fill out the waitlist form and submit

4. Check your Google Sheet - a new row should appear with the submission!

## Troubleshooting

### "Failed to add to waitlist"

**Check:**
- All environment variables are in `.env.local`
- Google Sheet ID is correct (from the URL)
- Service account email is correct
- Private key includes the full `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts
- Private key has `\n` characters (not actual newlines in .env.local)
- Google Sheet is shared with the service account email

### "Development mode" message

Environment variables are not configured. The form will log submissions to the console instead.

### Authentication Error

1. Double-check the private key format in `.env.local`
2. Make sure there are no extra spaces
3. Verify the service account email matches what's in the JSON key
4. Confirm Google Sheets API is enabled in your project

### Permission Denied

The Google Sheet must be shared with the service account email with **Editor** permissions.

## Data Format

Each submission creates a new row with:
- **Timestamp**: ISO 8601 format (e.g., `2025-10-14T10:30:00.000Z`)
- **Name**: Optional user name
- **Email**: Required, validated email address
- **Wallet Address**: Optional Solana wallet address

## Production Deployment

For Vercel, Cloudflare, or other platforms:

1. Add environment variables in your deployment platform's settings
2. For the private key, copy it exactly as it appears in the JSON file (including `\n`)
3. In most platforms, you don't need to wrap values in quotes
4. Restart your deployment after adding variables

### Vercel Example:

```
GOOGLE_SHEET_ID = 1AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
GOOGLE_SERVICE_ACCOUNT_EMAIL = solfps-waitlist@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n
SHEET_NAME = Waitlist
```

## Security Best Practices

- ✅ Never commit `.env.local` or the JSON key file to git
- ✅ Only share the Google Sheet with the service account (not public)
- ✅ Rotate service account keys periodically
- ✅ Use environment variables for all sensitive data
- ✅ Enable rate limiting in production
- ✅ Consider adding CAPTCHA for spam protection

## Cost

**FREE!** 🎉

- Google Sheets API: Free for up to 100 requests per 100 seconds per user
- Service Account: Free
- Google Sheet: Free (up to 10 million cells)

Perfect for hackathons and small projects!

## Advanced: View Your Data

You can easily view and export your waitlist data:

1. Open your Google Sheet
2. Use built-in sorting, filtering, and analysis tools
3. Export to CSV, Excel, or PDF
4. Create charts and visualizations
5. Share with team members

## Need Help?

- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Service Account Guide](https://cloud.google.com/iam/docs/service-accounts)
- Check your console logs for detailed error messages
