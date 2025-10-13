import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import 'isomorphic-fetch';

// Microsoft Graph API configuration
const TENANT_ID = process.env.AZURE_TENANT_ID || '';
const CLIENT_ID = process.env.AZURE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET || '';
const WORKBOOK_ID = process.env.EXCEL_WORKBOOK_ID || '';
const WORKSHEET_NAME = process.env.EXCEL_WORKSHEET_NAME || 'Waitlist';

interface WaitlistRequest {
  email: string;
  name?: string;
  walletAddress?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as WaitlistRequest;
    const { email, name, walletAddress } = body;

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if Microsoft Graph credentials are configured
    if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET || !WORKBOOK_ID) {
      console.error('Microsoft Graph API credentials not configured');
      
      // Fallback: Log to console (for development)
      console.log('Waitlist submission:', { email, name, walletAddress, timestamp: new Date().toISOString() });
      
      return NextResponse.json(
        { 
          message: 'Submission received! (Using development mode)',
          data: { email, name, walletAddress }
        },
        { status: 200 }
      );
    }

    // Create Microsoft Graph client with authentication
    const credential = new ClientSecretCredential(
      TENANT_ID,
      CLIENT_ID,
      CLIENT_SECRET
    );

    const client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token?.token || '';
        },
      },
    });

    // Prepare data for Excel
    const timestamp = new Date().toISOString();
    const rowData = [
      [timestamp, name || '', email, walletAddress || '']
    ];

    // Add row to Excel worksheet
    await client
      .api(`/me/drive/items/${WORKBOOK_ID}/workbook/worksheets/${WORKSHEET_NAME}/range(address='A1')/insert`)
      .post({
        shift: 'Down',
        values: rowData,
      });

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist!',
        data: { email, name }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error adding to waitlist:', error);
    
    return NextResponse.json(
      { error: 'Failed to add to waitlist. Please try again.' },
      { status: 500 }
    );
  }
}
