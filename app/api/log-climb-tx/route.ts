import type { NextRequest } from 'next/server';
import { Message } from '@farcaster/core';
import { empowerToursInterface, getEmpowerToursContract } from '@/lib/monad';
import { parseEther } from 'ethers';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { trustedData, untrustedData } = body;

  if (!trustedData?.messageBytes) return new Response(JSON.stringify({ error: 'Missing messageBytes' }), { status: 400 });
  const message = Message.decode(Buffer.from(trustedData.messageBytes, 'hex'));
  if (!message) return new Response(JSON.stringify({ error: 'Invalid message' }), { status: 400 });

  const climbData = untrustedData?.inputText || 'Default climb data';

  try {
    const contract = getEmpowerToursContract();
    const calldata = empowerToursInterface.encodeFunctionData('logClimb', [climbData]);
    const value = parseEther('0.001').toString(16);
    const valueHex = `0x${value}`;

    return new Response(JSON.stringify({
      type: 'transaction',
      chainId: 'eip155:10143',
      params: {
        to: contract.target,
        value: valueHex,
        data: calldata
      }
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
