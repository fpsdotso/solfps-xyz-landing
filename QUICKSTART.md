# 🚀 Quick Start - Google Sheets Integration

## ⚡ 3-Minute Setup Checklist

### 1. Create Google Sheet (30 seconds)
- [ ] Create new sheet at [sheets.google.com](https://sheets.google.com)
- [ ] Add headers: `Timestamp | Name | Email | Wallet Address`
- [ ] Copy Sheet ID from URL

### 2. Setup Google Cloud (5 minutes)
- [ ] Go to [console.cloud.google.com](https://console.cloud.google.com)
- [ ] Create new project
- [ ] Enable **Google Sheets API**
- [ ] Create **Service Account**
- [ ] Download **JSON key**

### 3. Share Sheet (30 seconds)
- [ ] Copy `client_email` from JSON key
- [ ] Share Google Sheet with this email
- [ ] Give **Editor** permission

### 4. Configure Project (2 minutes)
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Open your downloaded JSON key file
- [ ] Copy each value to `.env.local`:
  - `GOOGLE_SHEET_ID` (from sheet URL)
  - `GOOGLE_PROJECT_ID` (from JSON: `project_id`)
  - `GOOGLE_PRIVATE_KEY_ID` (from JSON: `private_key_id`)
  - `GOOGLE_PRIVATE_KEY` (from JSON: `private_key`)
  - `GOOGLE_CLIENT_EMAIL` (from JSON: `client_email`)
  - `GOOGLE_CLIENT_ID` (from JSON: `client_id`)
  - `SHEET_NAME` (default: "Waitlist")

### 5. Setup Email (Optional - 5 minutes)
- [ ] Log in to Zoho Mail
- [ ] Enable 2FA in Security settings
- [ ] Generate app-specific password
- [ ] Add to `.env.local`:
  - `ZOHO_EMAIL` (your Zoho email)
  - `ZOHO_PASSWORD` (app password)

📖 **Detailed guide:** [ZOHO_MAIL_SETUP.md](./ZOHO_MAIL_SETUP.md)

### 6. Test (30 seconds)
```bash
pnpm dev
# Open http://localhost:3000
# Submit test entry
# Check Google Sheet!
# Check your email inbox!
```

---

## 📋 Environment Variables Template

```env
GOOGLE_SHEET_ID=1AbC_dEfGhIjKlMnOpQrStUvWxYz
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=abc123def456
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvg...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=123456789012345678901
SHEET_NAME=Waitlist
```

## 🔍 Where to Find Values

### Sheet ID
```
https://docs.google.com/spreadsheets/d/[COPY_THIS_PART]/edit
                                        ^^^^^^^^^^^^^^^^
```

### All Other Values
Open your downloaded JSON key file and copy the corresponding fields:

```json
{
  "project_id": "← Copy to GOOGLE_PROJECT_ID",
  "private_key_id": "← Copy to GOOGLE_PRIVATE_KEY_ID",
  "private_key": "← Copy to GOOGLE_PRIVATE_KEY (keep \\n)",
  "client_email": "← Copy to GOOGLE_CLIENT_EMAIL",
  "client_id": "← Copy to GOOGLE_CLIENT_ID"
}
```

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Development mode" | Environment variables not set in `.env.local` |
| "Permission denied" | Share sheet with service account email (`GOOGLE_CLIENT_EMAIL`) |
| "Invalid credentials" | Check private key has `\n` characters, not actual newlines |
| "Authentication failed" | Verify all 6 environment variables are set correctly |
| Can't find Sheet ID | Look in the URL between `/d/` and `/edit` |

## 🎯 Production Deployment

### Vercel / Netlify / Cloudflare
Add all environment variables in your deployment dashboard:
1. `GOOGLE_SHEET_ID` - Your sheet ID
2. `GOOGLE_PROJECT_ID` - From JSON file
3. `GOOGLE_PRIVATE_KEY_ID` - From JSON file
4. `GOOGLE_PRIVATE_KEY` - From JSON file (keep `\n` characters)
5. `GOOGLE_CLIENT_EMAIL` - From JSON file
6. `GOOGLE_CLIENT_ID` - From JSON file
7. `SHEET_NAME` - Waitlist
8. Redeploy

---

**Need detailed help?** See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
