import type { NextRequest } from 'next/server';

export async function GET() {
  const baseUrl = process.env.BASE_URL || 'https://empower-tours-farcaster-production.up.railway.app';
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://raw.githubusercontent.com/EmpowerTours/empower-tours-farcaster/refs/heads/main/public/IMG_4419.jpeg" />
        <meta property="og:image" content="https://raw.githubusercontent.com/EmpowerTours/empower-tours-farcaster/refs/heads/main/public/IMG_4419.jpeg" />
        <meta property="og:title" content="EmpowerTours: Rock Climbing on Monad" />
        <meta property="og:description" content="Build climbs, create routes, and join tournaments in this Farcaster mini-app." />
        <meta property="fc:frame:button:1" content="Build a Climb" />
        <meta property="fc:frame:button:1:action" content="post" />
        <meta property="fc:frame:button:1:target" content="${baseUrl}/api/prepare-build-climb" />
        <meta property="fc:frame:button:2" content="Create Route" />
        <meta property="fc:frame:button:2:action" content="post" />
        <meta property="fc:frame:button:2:target" content="${baseUrl}/api/prepare-create-route" />
        <meta property="fc:frame:button:3" content="Join Tournament" />
        <meta property="fc:frame:button:3:action" content="post" />
        <meta property="fc:frame:button:3:target" content="${baseUrl}/api/prepare-join-tournament" />
        <meta property="fc:frame:input:text" content="Enter climb details" />
      </head>
      <body></body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}


export async function POST(req: NextRequest) {
  return new Response('Frame root POST', { status: 200 });
}
