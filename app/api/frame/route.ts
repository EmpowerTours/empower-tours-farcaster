// app/api/frame/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.BASE_URL || "https://empower-tours-farcaster-production.up.railway.app";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Empower Tours</title>
      <meta property="og:title" content="Empower Tours" />
      <meta property="og:image" content="${baseUrl}/images/frame1.png" />
      <meta property="og:description" content="Training masters of their trade." />

      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/images/frame1.png" />
      <meta property="fc:frame:post_url" content="${baseUrl}/api/frame/action" />
      <meta property="fc:frame:button:1" content="Learn More" />
    </head>
    <body>
      <p>Farcaster frame content — open in Warpcast to interact.</p>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}

// Handle button press
export async function POST() {
  const baseUrl = process.env.BASE_URL || "https://empower-tours-farcaster-production.up.railway.app";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Empower Tours - Step 2</title>
      <meta property="og:title" content="Step 2" />
      <meta property="og:image" content="${baseUrl}/images/frame2.png" />
      <meta property="og:description" content="Step 2 of the Empower Tours experience." />

      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/images/frame2.png" />
      <meta property="fc:frame:button:1" content="Back" />
    </head>
    <body>
      <p>Step 2 content — open in Warpcast to interact.</p>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
