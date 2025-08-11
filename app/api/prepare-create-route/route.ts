import type { NextRequest } from 'next/server';
import { Message } from '@farcaster/core';
import { provider } from '@/lib/monad';
import { empowerToursInterface } from '@/lib/monad';
import { getEmpowerToursContract } from '@/lib/monad';
import { ethers } from 'ethers';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { trustedData, untrustedData } = body;

  if (!trustedData?.messageBytes) return new Response(JSON.stringify({ error: 'Missing messageBytes' }), { status: 400 });
  const message = Message.decode(Buffer.from(trustedData.messageBytes, 'hex'));
  if (!message) return new Response(JSON.stringify({ error: 'Invalid message' }), { status: 400 });

  const routeData = untrustedData?.inputText || 'Default route data';

  try {
    // Encode calldata for createRoute (non-payable, value 0)
    const calldata = empowerToursInterface.encodeFunctionData('createRoute', [routeData]);

    // Return new Frame with tx button
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://raw.githubusercontent.com/EmpowerTours/empower-tours-farcaster/refs/heads/main/public/IMG_4422.jpeg" />
          <meta property="fc:frame:button:1" content="Confirm Create Route" />
          <meta property="fc:frame:button:1:action" content="tx" />
          <meta property="fc:frame:button:1:target" content="/api/create-route-tx" />
          <meta property="fc:frame:button:1:post_url" content="/api/tx-callback?type=create-route" />
        </head>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
