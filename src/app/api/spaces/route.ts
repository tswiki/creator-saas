
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

// GET /api/spaces - Get all spaces
export async function GET(req: Request) {
  try {
    // Verify auth
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get spaces from DB
    const spaces = await db.space.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } }
        ]
      },
      include: {
        owner: true,
        members: {
          include: {
            user: true
          }
        },
        channels: true
      }
    });

    return NextResponse.json({ spaces });

  } catch (error) {
    console.error('Error getting spaces:', error);
    return NextResponse.json(
      { error: 'Error getting spaces' },
      { status: 500 }
    );
  }
}

// POST /api/spaces - Create new space
export async function POST(req: Request) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description } = await req.json();

    const space = await db.space.create({
      data: {
        name,
        description,
        ownerId: user.id,
        channels: {
          create: [
            { name: 'general', description: 'General discussion' }
          ]
        }
      },
      include: {
        owner: true,
        channels: true
      }
    });

    return NextResponse.json({ space });

  } catch (error) {
    console.error('Error creating space:', error);
    return NextResponse.json(
      { error: 'Error creating space' },
      { status: 500 }
    );
  }
}

// PATCH /api/spaces/:id - Update space
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description } = await req.json();

    const space = await db.space.update({
      where: {
        id: params.id,
        ownerId: user.id
      },
      data: {
        name,
        description
      }
    });

    return NextResponse.json({ space });

  } catch (error) {
    console.error('Error updating space:', error);
    return NextResponse.json(
      { error: 'Error updating space' },
      { status: 500 }
    );
  }
}

// DELETE /api/spaces/:id - Delete space
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db.space.delete({
      where: {
        id: params.id,
        ownerId: user.id
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting space:', error);
    return NextResponse.json(
      { error: 'Error deleting space' },
      { status: 500 }
    );
  }
}
