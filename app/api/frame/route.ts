import type { NextRequest } from 'next/server';

export async function GET() {
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://raw.githubusercontent.com/EmpowerTours/empower-tours-farcaster/main/public/IMG_4419.jpeg" />
        <meta property="og:title" content="EmpowerTours: Rock Climbing on Monad" />
        <meta property="og:description" content="Build climbs, create routes, and join tournaments in this Farcaster mini-app." />
      </head>
      <body></body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}



export async function POST(req: NextRequest) {
  return new Response('Frame root POST', { status: 200 });
}
