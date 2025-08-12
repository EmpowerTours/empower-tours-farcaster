import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();  // Parse the incoming JSON body from Farcaster

    // Expected body format from Farcaster webhook: { event, notificationDetails }
    const { event, notificationDetails } = body;

    // Optional: Basic validation (add full signature check if needed using ethers)
    if (!event) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    // Process the event
    switch (event) {
      case 'miniapp_added':
        // Handle app addition (e.g., store token for notifications)
        console.log('User added app:', notificationDetails);
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

    // Respond with 200 OK
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
