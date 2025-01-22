import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/firebase/admin-config';

// Types based on the MentorshipPortal component
type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
};

type Progress = {
  learningGoals: number;
  sessionsCompleted: number;
  totalSessions: number;
};

type Objective = {
  title: string;
  progress: number;
};

// Mock data - In production this would come from a database
const mockProgress: Progress = {
  learningGoals: 75,
  sessionsCompleted: 12,
  totalSessions: 15
};

const mockObjectives: Objective[] = [
  { title: "Complete System Design Module", progress: 60 },
  { title: "Build Portfolio Project", progress: 45 },
  { title: "Practice Mock Interviews", progress: 30 }
];

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Review System Design Concepts",
    description: "Go through distributed systems materials",
    dueDate: "2024-02-01",
    priority: "High"
  },
  {
    id: 2, 
    title: "Complete Portfolio Website",
    description: "Finish implementing remaining features",
    dueDate: "2024-02-15",
    priority: "Medium"
  }
];

export async function GET() {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!decodedClaims) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    return NextResponse.json({
      progress: mockProgress,
      objectives: mockObjectives,
      tasks: mockTasks
    });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!decodedClaims) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'ADD_TASK':
        // In production, save to database
        const newTask = {
          id: Date.now(),
          ...data
        };
        return NextResponse.json({ task: newTask });

      case 'UPDATE_OBJECTIVE':
        // In production, update objective in database
        return NextResponse.json({ success: true });

      case 'UPDATE_PROGRESS':
        // In production, update progress in database  
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Invalid operation type' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!decodedClaims) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body = await request.json();
    const { taskId, updates } = body;

    // In production, update task in database
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const sessionCookie = (await cookies()).get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!decodedClaims) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    // In production, delete task from database
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
