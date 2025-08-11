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

  const inputText = untrustedData?.inputText || '1';
  const tournamentId = parseInt(inputText, 10);
  if (isNaN(tournamentId)) return new Response(JSON.stringify({ error: 'Invalid tournament ID' }), { status: 400 });

  try {
    const contract = getEmpowerToursContract();
    const tournament = await contract.tournaments(tournamentId);
    const fee = tournament.entryFee;  // Assume entryFee is the payable value
    const feeHex = `0x${fee.toString(16)}`;

    // Encode calldata for joinTournament
    const calldata = empowerToursInterface.encodeFunctionData('joinTournament', [tournamentId]);

    // Return new Frame with tx button
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="https://your-domain.com/images/confirm-join-tournament.png" />
          <meta property="fc:frame:button:1" content="Confirm Join Tournament (${fee / ethers.parseEther('1')} MON)" />
          <meta property="fc:frame:button:1:action" content="tx" />
          <meta property="fc:frame:button:1:target" content="/api/join-tournament-tx" />
          <meta property="fc:frame:button:1:post_url" content="/api/tx-callback?type=join-tournament" />
        </head>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
