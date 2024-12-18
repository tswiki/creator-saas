import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock database for demo purposes
let resources = [
  {
    id: 1,
    title: "Advanced React Patterns",
    type: "Course",
    platform: "Udemy", 
    link: "https://udemy.com/react-patterns",
    recommended: "Sarah Wilson",
    description: "Deep dive into advanced React patterns and best practices",
    attachments: [
      { name: "Course Slides", type: "PDF", size: "2.4MB" },
      { name: "Exercise Files", type: "ZIP", size: "15MB" }
    ],
    progress: 45
  }
]

export async function GET() {
  return NextResponse.json(resources)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  
  const newResource = {
    id: resources.length + 1,
    ...data
  }
  
  resources.push(newResource)
  
  return NextResponse.json(newResource, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  const { id, ...updates } = data
  
  const index = resources.findIndex(r => r.id === id)
  if (index === -1) {
    return NextResponse.json(
      { error: 'Resource not found' },
      { status: 404 }
    )
  }

  resources[index] = {
    ...resources[index],
    ...updates
  }

  return NextResponse.json(resources[index])
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))

  const index = resources.findIndex(r => r.id === id)
  if (index === -1) {
    return NextResponse.json(
      { error: 'Resource not found' },
      { status: 404 }
    )
  }

  resources = resources.filter(r => r.id !== id)
  
  return NextResponse.json(
    { message: 'Resource deleted successfully' },
    { status: 200 }
  )
}