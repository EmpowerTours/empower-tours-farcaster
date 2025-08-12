import { NextRequest, NextResponse } from 'next/server';
import * as ethers from 'ethers';
import { getEmpowerToursContract, empowerToursInterface } from '../../../lib/monad';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;
    const { fid, inputText } = message; // Assume climbData from input

    // Parse input again to ensure consistency
    const climbData = parseClimbInput(inputText);

    const contract = getEmpowerToursContract();
    const calldata = empowerToursInterface.encodeFunctionData('addJournalEntryWithDetails', [
      climbData.contentHash,
      climbData.location,
      climbData.difficulty,
      climbData.isSharedOnFarcaster,
      climbData.farcasterCastHash
    ]);
    const value = ethers.parseEther('0.001').toString(16); // Adjust fee as needed
    const valueHex = `0x${value}`;

    return NextResponse.json({
      type: 'tx',
      chainId: 'eip155:1', // Replace with Monad chain ID (e.g., eip155:8888 for testnet)
      params: {
        to: contract.address,
        calldata,
        value: valueHex,
      },
    });
  } catch (error) {
    console.error('Build climb tx error:', error);
    return NextResponse.json({ error: 'Failed to prepare tx' }, { status: 500 });
  }
}

// Parse input (same as prepare step for consistency)
function parseClimbInput(input: string) {
  const parts = input.split(',');
  const name = parts[0]?.split(':')[1]?.trim() || '';
  const difficulty = parts[1]?.split(':')[1]?.trim() || '';
  const location = parts[2]?.split(':')[1]?.trim() || '';
  const photoHash = parts[3]?.split(':')[1]?.trim() || '';
  return {
    contentHash: photoHash,
    location,
    difficulty,
    isSharedOnFarcaster: false,
    farcasterCastHash: ''
  };
}
