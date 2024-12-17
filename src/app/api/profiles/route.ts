
// /src/app/api/profiles/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/firebase/admin-config';
import { getFirestore } from 'firebase-admin/firestore';
import app from '@/firebase/firebaseConfig';

// Interface for Profile data structure
interface ProfileData {
  about: string;
  email: string;
  fullname: string;
  integrations: string[];
  phone_number: string;
  role: string;
  skills: string[];
}

// Get Firestore instance
const db = getFirestore(app);

export async function GET(request: Request) {
  try {
    // Verify session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the session cookie and get user claims
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    const userId = decodedClaims.uid;

    // Get user profile from Firestore
    const profileDoc = await db
      .collection('User_Data')
      .doc(userId)
      .collection('profile')
      .doc('info')
      .get();

    if (!profileDoc.exists) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile: profileDoc.data() });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verify session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the session cookie and get user claims
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    const userId = decodedClaims.uid;

    // Get request body
    const profileData: ProfileData = await request.json();

    // Validate required fields
    if (!profileData.email || !profileData.fullname) {
      return NextResponse.json(
        { error: 'Email and fullname are required' },
        { status: 400 }
      );
    }

    // Create or update profile in Firestore
    await db
      .collection('User_Data')
      .doc(userId)
      .collection('profile')
      .doc('info')
      .set(profileData, { merge: true });

    return NextResponse.json({
      status: 'success',
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to create/update profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Verify session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the session cookie and get user claims
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    const userId = decodedClaims.uid;

    // Get request body
    const updateData: Partial<ProfileData> = await request.json();

    // Update profile in Firestore
    await db
      .collection('User_Data')
      .doc(userId)
      .collection('profile')
      .doc('info')
      .update(updateData);

    return NextResponse.json({
      status: 'success',
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// Optional: Delete profile
// export async function DELETE(request: Request) {
//   try {
//     // Verify session
//     const cookieStore = await cookies();
//     const sessionCookie = cookieStore.get('session')?.value;

//     if (!sessionCookie) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     // Verify the session cookie and get user claims
//     const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
//     const userId = decodedClaims.uid;

//     // Delete profile document
//     await db
//       .collection('User_Data')
//       .doc(userId)
//       .collection('profile')
//       .doc('info')
//       .delete();

//     return NextResponse.json({
//       status: 'success',
//       message: 'Profile deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting profile:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete profile' },
//       { status: 500 }
//     );
//   }
// }