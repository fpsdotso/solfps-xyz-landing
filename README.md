# SOLFPS.XYZ Landing Page

Landing page for **solfps.xyz** - The first fully onchain first person shooter game on Solana.

**Entry for Solana Colosseum Cyberpunk Hackathon**

## Features

- 🎮 Modern cyberpunk-themed landing page
- 📹 Demo video showcase
- 📝 Waitlist functionality with Google Sheets API integration
- 📧 Automatic email confirmation via Zoho Mail
- ⚡ Built with Next.js 15 and React 19
- 🎨 Responsive design with gradient animations
- 💯 100% Free setup (no paid services required!)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

1. Clone the repository and install dependencies:

```bash
pnpm install
```

2. Copy the environment variables template:

```bash
cp .env.local.example .env.local
```

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google Sheets API Setup

To connect the waitlist to Google Sheets (completely FREE, no app registration needed!):

### Quick Setup (10 minutes)

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet named "SOLFPS Waitlist"
   - Add headers: `Timestamp | Name | Email | Wallet Address`
   - Copy the Sheet ID from the URL

2. **Setup Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable **Google Sheets API**

3. **Create Service Account**
   - Go to APIs & Services → Credentials
   - Create Service Account
   - Generate JSON key (download and keep safe)

4. **Share Sheet with Service Account**
   - Copy the `client_email` from your JSON key
   - Share your Google Sheet with this email (Editor access)

5. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Add values from your JSON key file:

```env
GOOGLE_SHEET_ID=your-sheet-id-from-url
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=123456789012345678901
SHEET_NAME=Waitlist
```

   Each value comes from your downloaded JSON file.

📖 **Detailed step-by-step guide:** See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## Email Notifications Setup (Optional)

Send automatic confirmation emails to users via Zoho Mail:

1. **Create Zoho Account** (free)
2. **Generate App Password** in Zoho Security settings
3. **Add to `.env.local`:**

```env
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=465
ZOHO_EMAIL=your-email@yourdomain.com
ZOHO_PASSWORD=your-app-password
ZOHO_FROM_NAME=SOLFPS Team
```

📖 **Full guide:** See [ZOHO_MAIL_SETUP.md](./ZOHO_MAIL_SETUP.md)

### Development Mode

If environment variables are not configured:
- Waitlist will work in development mode
- Submissions logged to console instead of Google Sheets
- Emails will not be sent

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
