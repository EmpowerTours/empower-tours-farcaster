import type { NextRequest } from 'next/server';

export async function GET() {
  const baseUrl = process.env.BASE_URL || 'https://empower-tours-farcaster-production.up.railway.app';
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${baseUrl}/image.png" />
        <meta property="og:image" content="${baseUrl}/image.png" />
        <meta property="og:title" content="EmpowerTours: Rock Climbing on Monad" />
        <meta property="og:description" content="Build climbs, create routes, and join tournaments in this Farcaster mini-app." />
        <meta property="fc:frame:icon" content="${baseUrl}/icon.png" />
        <meta property="fc:frame:splash_image" content="${baseUrl}/splash.png" />
        <meta property="fc:frame:splash_background_color" content="#eeccff" />
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
        <meta property="fc:frame:post_url" content="${baseUrl}/api/webhook" />
      </head>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}

export async function POST(req: NextRequest) {
  return new Response('Frame root POST', { status: 200 });
}
