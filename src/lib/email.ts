import nodemailer from "nodemailer";

// Zoho Mail SMTP configuration
const ZOHO_SMTP_HOST = process.env.ZOHO_SMTP_HOST || "smtp.zoho.com";
const ZOHO_SMTP_PORT = parseInt(process.env.ZOHO_SMTP_PORT || "465");
const ZOHO_EMAIL = process.env.ZOHO_EMAIL || "";
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD || "";
const ZOHO_FROM_NAME = process.env.ZOHO_FROM_NAME || "SOLFPS Team";

export async function sendWaitlistConfirmation(
	email: string,
	name?: string
) {
	// Check if email credentials are configured
	if (!ZOHO_EMAIL || !ZOHO_PASSWORD) {
		console.log(
			"Email credentials not configured. Skipping email send."
		);
		return { success: false, message: "Email not configured" };
	}

	try {
		// Create transporter using Zoho SMTP
		const transporter = nodemailer.createTransport({
			host: ZOHO_SMTP_HOST,
			port: ZOHO_SMTP_PORT,
			secure: true, // Use SSL
			auth: {
				user: ZOHO_EMAIL,
				pass: ZOHO_PASSWORD,
			},
		});

		// Email HTML template
		const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo h1 {
      font-size: 48px;
      font-weight: 900;
      background: linear-gradient(135deg, #00ffff, #ff00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      letter-spacing: -1px;
    }
    .content {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      padding: 32px;
      color: #333;
    }
    .greeting {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1a0a2e;
    }
    .message {
      font-size: 16px;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .highlight {
      background: linear-gradient(135deg, #00ffff, #ff00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 600;
    }
    .features {
      margin: 24px 0;
      padding: 20px;
      background: rgba(0, 255, 255, 0.05);
      border-left: 4px solid #00ffff;
      border-radius: 4px;
    }
    .features h3 {
      margin-top: 0;
      color: #1a0a2e;
    }
    .features ul {
      margin: 0;
      padding-left: 20px;
    }
    .features li {
      margin: 8px 0;
    }
    .footer {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
      color: #666;
    }
    .social-links {
      margin-top: 16px;
    }
    .social-links a {
      color: #00ffff;
      text-decoration: none;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1>FPS.SO</h1>
    </div>
    
    <div class="content">
      <div class="greeting">
        Hey ${name || "there"}! 👋
      </div>
      
      <div class="message">
        Thanks for joining the <span class="highlight">FPS.SO</span> waitlist! We're thrilled to have you on board for the future of gaming.
      </div>
      
      <div class="message">
        You're now among the first to know about a <strong>fully onchain first person shooter</strong> built on Solana. We're building something truly revolutionary, and we can't wait to share it with you.
      </div>
      
      <div class="features">
        <h3>🎮 What to Expect:</h3>
        <ul>
          <li>⚡ Real-time gameplay powered by Solana</li>
          <li>🔗 Every action recorded onchain</li>
          <li>💎 True ownership of your in-game assets</li>
          <li>🏆 Competitive multiplayer battles</li>
          <li>� Fast-paced, skill-based combat</li>
        </ul>
      </div>
      
      <div class="message">
        We'll keep you updated with:
      </div>
      <ul>
        <li>Early access opportunities</li>
        <li>Development updates and behind-the-scenes content</li>
        <li>Beta testing invitations</li>
        <li>Launch date announcements</li>
      </ul>
      
      <div class="message">
        <strong>Stay tuned!</strong> We'll be in touch soon with more exciting news.
      </div>
      
      <div class="footer">
        <p>FPS.SO - The Future of Onchain Gaming</p>
        <p style="color: #999; font-size: 12px; margin-top: 8px;">
          Solana Colosseum Cypherpunk Hackathon Project
        </p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

		// Plain text version
		const textContent = `
Hey ${name || "there"}!

Thanks for joining the FPS.SO waitlist! We're thrilled to have you on board for the future of gaming.

You're now among the first to know about a fully onchain first person shooter built on Solana. We're building something truly revolutionary, and we can't wait to share it with you.

What to Expect:
- Real-time gameplay powered by Solana
- Every action recorded onchain
- True ownership of your in-game assets
- Competitive multiplayer battles
- Fast-paced, skill-based combat

We'll keep you updated with:
- Early access opportunities
- Development updates and behind-the-scenes content
- Beta testing invitations
- Launch date announcements

Stay tuned! We'll be in touch soon with more exciting news.

---
FPS.SO - The Future of Onchain Gaming
Solana Colosseum Cyberpunk Hackathon Project
    `.trim();

		// Send email
		const info = await transporter.sendMail({
			from: `"${ZOHO_FROM_NAME}" <${ZOHO_EMAIL}>`,
			to: email,
			subject: "🎮 Welcome to FPS.SO Waitlist!",
			text: textContent,
			html: htmlContent,
		});

		console.log("Email sent successfully:", info.messageId);
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error("Error sending email:", error);
		return { success: false, error };
	}
}
