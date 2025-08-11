import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { transaction_hash } = body;  // Farcaster sends tx hash in callback
  const type = req.nextUrl.searchParams.get('type') || 'unknown';

  try {
    // Return final success Frame
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://your-domain.com/images/success.png" />
          <meta property="fc:frame:button:1" content="View Tx" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="https://testnet.monadexplorer.com/tx/${transaction_hash}" />
          <meta property="fc:frame:button:2" content="Back to Main" />
          <meta property="fc:frame:button:2:action" content="post" />
          <meta property="fc:frame:button:2:target" content="/api/frame" />
        </head>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
