import { NextRequest, NextResponse } from 'next/server';
import { getEmpowerToursContract, empowerToursInterface } from '../../../lib/monad'; // Adjust import path as needed

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body; // Farcaster signed message
    const { fid, inputText } = message; // Parse user FID and input

    // Parse inputText for climb details (e.g., "name:Foo,grade:V5,desc:Bar,lat:37.77,long:-122.42,imageCid:Qm...")
    const climbData = parseClimbInput(inputText); // Implement your parsing function

    // Prepare next frame for confirmation/tx
    const baseUrl = process.env.BASE_URL || 'https://empower-tours-farcaster-production.up.railway.app';
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/images/build-climb.png" />
          <meta property="fc:frame:button:1" content="Confirm Build Climb" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:button:1:target" content="${baseUrl}/api/build-climb-tx" />
        </head>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    console.error('Prepare build climb error:', error);
    return NextResponse.json({ error: 'Failed to prepare climb' }, { status: 500 });
  }
}

// Helper to parse input (customize as needed)
function parseClimbInput(input: string) {
  // Example parsing logic
  const parts = input.split(',');
  return {
    name: parts[0]?.split(':')[1]?.trim(),
    grade: parts[1]?.split(':')[1]?.trim(),
    description: parts[2]?.split(':')[1]?.trim(),
    lat: parseFloat(parts[3]?.split(':')[1]?.trim()),
    long: parseFloat(parts[4]?.split(':')[1]?.trim()),
    imageCid: parts[5]?.split(':')[1]?.trim(),
  };
}
