
import { adminDb } from "@/firebase/admin-config";
import { db } from "@/firebase/firebaseConfig"
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"
import { NextResponse } from "next/server"


export async function GET(request: Request) {
  try {
    // Get the session cookie from the request
    const sessionCookie = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('session='))
      ?.split('=')[1];

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized - No session found" },
        { status: 401 }
      );
    }

    // Verify the session exists and is valid
    const campaignRef = adminDb.collection('campaigns')
    const campaignSnapshot = await campaignRef.get()

    const campaigns = campaignSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return NextResponse.json(campaigns)

  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Get the session cookie from the request
    const sessionCookie = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('session='))
      ?.split('=')[1];

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Unauthorized - No session found" },
        { status: 401 }
      );
    }

    const campaign = await request.json()
    const campaignRef = adminDb.collection('campaigns')
    
    const docRef = await campaignRef.add({
      ...campaign,
      createdAt: new Date() // Admin SDK uses native Date object
    })

    return NextResponse.json({
      id: docRef.id,
      ...campaign
    })

  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    )
  }
}
