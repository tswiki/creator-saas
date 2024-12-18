
import { NextResponse } from 'next/server'
import { db } from '@/firebase/firebaseConfig'
import { collection, addDoc, getDocs, query, orderBy, where, doc, updateDoc, deleteDoc } from 'firebase/firestore'

// Get all messages for a conversation
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const conversationId = searchParams.get('conversationId')

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 })
    }

    const messagesRef = collection(db, 'messages')
    const q = query(
      messagesRef,
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    )
    
    const querySnapshot = await getDocs(q)
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error getting messages:', error)
    return NextResponse.json({ error: 'Failed to get messages' }, { status: 500 })
  }
}

// Send a new message
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { conversationId, senderId, content, timestamp } = body

    if (!conversationId || !senderId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const messagesRef = collection(db, 'messages')
    const newMessage = await addDoc(messagesRef, {
      conversationId,
      senderId, 
      content,
      timestamp: timestamp || new Date().toISOString(),
      read: false
    })

    return NextResponse.json({ 
      id: newMessage.id,
      conversationId,
      senderId,
      content,
      timestamp,
      read: false
    })

  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

// Update a message (mark as read, edit content)
export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { messageId, updates } = body

    if (!messageId || !updates) {
      return NextResponse.json({ error: 'Message ID and updates are required' }, { status: 400 })
    }

    const messageRef = doc(db, 'messages', messageId)
    await updateDoc(messageRef, updates)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 })
  }
}

// Delete a message
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const messageId = searchParams.get('messageId')

    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 })
    }

    const messageRef = doc(db, 'messages', messageId)
    await deleteDoc(messageRef)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
  }
}
