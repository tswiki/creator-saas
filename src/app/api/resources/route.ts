
import { NextResponse } from 'next/server'
import { auth } from '@/firebase/firebaseConfig'
import { db } from '@/firebase/firebaseConfig'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

// GET /api/resources - Get all resources
export async function GET() {
  try {
    const resourcesRef = collection(db, 'resources')
    const snapshot = await getDocs(resourcesRef)
    const resources = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return NextResponse.json(resources)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}

// POST /api/resources - Create new resource
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = auth.currentUser

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const resourceData = {
      ...body,
      createdBy: user.uid,
      createdAt: new Date().toISOString()
    }

    const docRef = await addDoc(collection(db, 'resources'), resourceData)
    
    return NextResponse.json({
      id: docRef.id,
      ...resourceData
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}

// PUT /api/resources/:id - Update resource
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const user = auth.currentUser
    const { id } = body

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const resourceRef = doc(db, 'resources', id)
    await updateDoc(resourceRef, body)

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    )
  }
}

// DELETE /api/resources/:id - Delete resource 
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const user = auth.currentUser

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await deleteDoc(doc(db, 'resources', id))
    
    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    )
  }
}
