import { NextRequest, NextResponse } from 'next/server';
import { SignedMessage } from '@farcaster/core';  // For signature verification

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();  // Parse the incoming JSON body

    // Expected body format (signed JSON Farcaster Signature)
    const { header, payload, signature } = body;

    if (!header || !payload || !signature) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    // Decode base64url-encoded parts
    const decodedHeader = JSON.parse(Buffer.from(header, 'base64url').toString('utf-8'));
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));

    // Verify signature using @farcaster/core (adapt based on your version)
    const signedMessage = new SignedMessage({
      header: decodedHeader,
      payload: decodedPayload,
      signature: Buffer.from(signature, 'base64url'),
    });
    const isValid = await signedMessage.verify();  // Implement verification logic per Farcaster docs
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Process the event from decodedPayload
    const { event, notificationDetails } = decodedPayload;
    switch (event) {
      case 'miniapp_added':
        // Handle app addition (e.g., store notification token for sending pushes)
        console.log('User added app:', notificationDetails);
        // e.g., save token to DB
        break;
      case 'miniapp_removed':
        // Handle removal (invalidate tokens)
        console.log('User removed app');
        break;
      case 'notifications_enabled':
        // Handle enabling notifications
        console.log('Notifications enabled:', notificationDetails);
        break;
      case 'notifications_disabled':
        // Handle disabling (invalidate tokens)
        console.log('Notifications disabled');
        break;
      default:
        return NextResponse.json({ error: 'Unknown event' }, { status: 400 });
    }

    // Respond with 200 OK (no body needed unless specified)
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
