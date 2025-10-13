import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendWaitlistConfirmation } from '@/lib/email';

// Google Sheets API configuration
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID || '';
const GOOGLE_PRIVATE_KEY_ID = process.env.GOOGLE_PRIVATE_KEY_ID || '';
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || '';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const SHEET_NAME = process.env.SHEET_NAME || 'Waitlist';

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

    // Check if Google Sheets credentials are configured
    if (!GOOGLE_SHEET_ID || !GOOGLE_PROJECT_ID || !GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL) {
      console.error('Google Sheets API credentials not configured');
      
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

    // Check if using placeholder/invalid credentials
    if (GOOGLE_PRIVATE_KEY.includes('Your-private-key-here') || 
        GOOGLE_CLIENT_EMAIL.includes('your-service-account') ||
        GOOGLE_SHEET_ID === 'your-sheet-id-here') {
      console.error('Google Sheets API credentials are placeholder values');
      
      // Fallback: Log to console (for development)
      console.log('Waitlist submission:', { email, name, walletAddress, timestamp: new Date().toISOString() });
      
      return NextResponse.json(
        { 
          message: 'Submission received! (Using development mode - please configure real credentials)',
          data: { email, name, walletAddress }
        },
        { status: 200 }
      );
    }

    // Create Google Sheets client with service account authentication
    const glAuth = await google.auth.getClient({
      projectId: GOOGLE_PROJECT_ID,
      credentials: {
        type: 'service_account',
        project_id: GOOGLE_PROJECT_ID,
        private_key_id: GOOGLE_PRIVATE_KEY_ID,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: GOOGLE_CLIENT_EMAIL,
        client_id: GOOGLE_CLIENT_ID,
        universe_domain: 'googleapis.com'
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const glSheets = google.sheets({ version: 'v4', auth: glAuth });

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      name || '',
      email,
      walletAddress || ''
    ];

    // Append row to Google Sheets
    const response = await glSheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Successfully added to Google Sheets:', response.data);

    // Send confirmation email
    const emailResult = await sendWaitlistConfirmation(email, name);
    
    if (emailResult.success) {
      console.log('Confirmation email sent to:', email);
    } else {
      console.log('Email not sent (credentials may not be configured)');
    }

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist! Check your email for confirmation.',
        data: { email, name }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error adding to waitlist:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to add to waitlist. Please try again.' },
      { status: 500 }
    );
  }
}
