
import { NextResponse } from 'next/server';
import { auth } from '@/firebase/firebaseConfig';

// Types
type Contact = {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status?: 'online' | 'offline';
  lastSeen?: string;
  expertise?: string[];
  interests?: string[];
  goals?: string[];
  matchScore?: number;
};

// GET handler to fetch contacts and recommended matches
export async function GET(request: Request) {
  try {
    // Verify authentication
    const user = auth.currentUser;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock data - replace with actual DB queries
    const contacts: Contact[] = [
      {
        id: 1,
        name: "Sarah Wilson",
        role: "Mentor", 
        email: "sarah.w@example.com",
        avatar: "SW",
        status: 'online',
        expertise: ["React", "TypeScript"],
        interests: ["Web Development"],
        goals: ["Technical Leadership"],
        matchScore: 92
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Mentor",
        email: "michael.c@example.com", 
        avatar: "MC",
        status: 'offline',
        lastSeen: '2 hours ago',
        expertise: ["System Design", "Cloud Architecture"],
        interests: ["Mentoring"],
        goals: ["Engineering Management"],
        matchScore: 85
      }
    ];

    return NextResponse.json({ contacts });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST handler to initiate connection/chat with a contact
export async function POST(request: Request) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contactId } = body;

    // Mock connection logic - replace with actual implementation
    const connection = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.uid,
      contactId: contactId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ connection });

  } catch (error) {
    console.error('Error creating connection:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT handler to update connection status
export async function PUT(request: Request) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { connectionId, status } = body;

    // Mock status update logic - replace with actual implementation
    const updatedConnection = {
      id: connectionId,
      status: status,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ connection: updatedConnection });

  } catch (error) {
    console.error('Error updating connection:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
