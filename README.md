# SOLFPS.XYZ Landing Page

Landing page for **solfps.xyz** - The first fully onchain first person shooter game on Solana.

**Entry for Solana Colosseum Cyberpunk Hackathon**

## Features

- 🎮 Modern cyberpunk-themed landing page
- 📹 Demo video showcase
- 📝 Waitlist functionality with Microsoft Excel API integration
- ⚡ Built with Next.js 15 and React 19
- 🎨 Responsive design with gradient animations

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

## Microsoft Excel API Setup

To connect the waitlist to Microsoft Excel:

### Step 1: Create an Azure App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Name your app (e.g., "SOLFPS Waitlist")
5. Select **Accounts in this organizational directory only**
6. Click **Register**

### Step 2: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Application permissions**
5. Add: `Files.ReadWrite.All`
6. Click **Grant admin consent**

### Step 3: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and select expiration
4. **Copy the secret value immediately** (you won't see it again!)

### Step 4: Get Your IDs

- **Tenant ID**: Found on the app Overview page
- **Client ID**: Found on the app Overview page
- **Client Secret**: The value you copied in Step 3

### Step 5: Prepare Excel Workbook

1. Create an Excel file on OneDrive or SharePoint
2. Name a worksheet "Waitlist" (or customize in `.env.local`)
3. Add headers in the first row: `Timestamp | Name | Email | Wallet Address`
4. Get the workbook ID from the file URL (the long string after `/items/`)

### Step 6: Update Environment Variables

Edit `.env.local` with your credentials:

```env
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
EXCEL_WORKBOOK_ID=your-workbook-id
EXCEL_WORKSHEET_NAME=Waitlist
```

### Development Mode

If environment variables are not configured, the waitlist will work in development mode and log submissions to the console instead of Excel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
