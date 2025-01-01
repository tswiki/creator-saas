
import { NextResponse } from 'next/server';
import {StreamChat} from 'stream-chat'

const appKey = process.env.NEXT_PUBLIC_STREAM_KEY;
const secretKey = process.env.USER_TOKEN;


const chatClient = new StreamChat(appKey!, secretKey);

export async function POST(request: Request) {
  try {
    const { user_id } = await request.json();
    const token = await chatClient.createToken(user_id.toString());
    return NextResponse.json({ payload: token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 400 });
  }
}