import { NextRequest, NextResponse } from 'next/server';
import * as ethers from 'ethers';
import { getEmpowerToursContract, empowerToursInterface } from '../../../lib/monad'; // Adjust import path

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;
    const { fid, climbData } = message; // Assume climbData from previous prepare step

    const contract = getEmpowerToursContract();
    const calldata = empowerToursInterface.encodeFunctionData('buildClimb', [climbData]);
    const value = ethers.parseEther('0.001').toString(16);
    const valueHex = `0x${value}`;

    return NextResponse.json({
      type: 'tx',
      chainId: 'eip155:1', // Adjust for Monad chain ID
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
