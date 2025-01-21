
import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat'

const appKey = process.env.NEXT_PUBLIC_STREAM_KEY;
const secretKey = process.env.USER_TOKEN;

// Create the client outside the handler to reuse the instance
const chatClient = new StreamChat(appKey!, secretKey);

// observe current grants of the channel type
// const { grants } = await chatClient.getChannelType("messaging");

// update "channel_member" role grants in "messaging" scope
await chatClient.updateChannelType("messaging", {
  grants: {
    channel_member: [
      "read-channel", // allow access to the channel
      "create-message", // create messages in the channel
      "update-message-owner", // update own user messages
      "delete-message-owner", // delete own user messages
    ],
  },
});

export async function POST(request: Request) {
  try {
    
    const { user_id } = await request.json();

    // Validate user_id
    if (!user_id || user_id === 'anonymous') {
      return NextResponse.json(
        { error: 'User must be authenticated' }, 
        { status: 401 }
      );
    }

    // Generate token
    const token = chatClient.createToken(user_id);
    
    return NextResponse.json({ payload: token }, { status: 200 });

  } catch (error) {
    console.error('Error generating chat token:', error);
    return NextResponse.json(
      { error: 'Failed to create token' }, 
      { status: 500 }
    );
  }
}