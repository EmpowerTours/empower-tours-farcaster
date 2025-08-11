import type { NextRequest } from 'next/server';
import { Message } from '@farcaster/core';
import { empowerToursInterface, getEmpowerToursContract } from '@/lib/monad';
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
    const fee = tournament.entryFee;
    const feeHex = `0x${fee.toString(16)}`;
    const calldata = empowerToursInterface.encodeFunctionData('joinTournament', [tournamentId]);

    return new Response(JSON.stringify({
      type: 'transaction',
      chainId: 'eip155:10143',
      params: {
        to: contract.target,
        value: feeHex,
        data: calldata
      }
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
