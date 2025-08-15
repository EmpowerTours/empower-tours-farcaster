// app/api/frame/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const baseUrl =
    process.env.BASE_URL ||
    "https://empower-tours-farcaster-production.up.railway.app";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta property="og:title" content="Empower Tours" />
      <meta property="og:description" content="Training masters of their trade." />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/images/frame1.png" />
      <meta property="fc:frame:post_url" content="${baseUrl}/api/frame/action" />
      <meta property="fc:frame:button:1" content="Learn More" />
    </head>
    <body>
      <p>This is a Farcaster frame — open in Warpcast to interact.</p>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

// Optional POST handler for button actions
export async function POST(req: NextRequest) {
  const baseUrl =
    process.env.BASE_URL ||
    "https://empower-tours-farcaster-production.up.railway.app";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta property="og:title" content="Empower Tours - Step 2" />
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/images/frame2.png" />
      <meta property="fc:frame:button:1" content="Go Back" />
    </head>
    <body>
      <p>Step 2 of the Empower Tours experience.</p>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
