import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth , adminDb} from '@/firebase/admin-config';
import { getFirestore } from 'firebase-admin/firestore';
import app from '@/firebase/firebaseConfig';

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
      const profileData = await request.json();
  
      // Create the member dictionary update
      const memberUpdate = {
        [profileData.email]: {  // Using userId as the key in the dictionary
            //email: profileData.email,
          about: profileData.currentSituation,
          skills: profileData.skills,
          socials: {
            twitter: profileData.twitter || '',
            instagram: profileData.instagram || '',
            youtube: profileData.youtube || '',
            tiktok: profileData.tiktok || ''
          },
          niche: profileData.niche,
          goals: profileData.biggestGoal,
          bottleneck: profileData.biggestBottleneck,
          commitment: profileData.commitmentType,
          timestamp: new Date().toISOString(),
          userId: userId
        }
      };
  
      // Reference to the members collection and dict document
      const membersRef = adminDb.collection('members').doc('memberDict').collection('dict');
      
      // Get the current dictionary document or create if it doesn't exist
      const dictDoc = await membersRef.doc('profiles').get();
      
      if (!dictDoc.exists) {
        // If document doesn't exist, create it with the first member
        await membersRef.doc('profiles').set(memberUpdate);
      } else {
        // If document exists, update it by adding/updating the member
        await membersRef.doc('profiles').set(memberUpdate, { merge: true });
      }
  
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

  export async function GET() {
    try {
        // Verify session
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session')?.value;

        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify the session cookie
        await adminAuth.verifySessionCookie(sessionCookie);

        // Reference to the members dictionary
        const membersRef = adminDb.collection('members').doc('memberDict').collection('dict');
        const dictDoc = await membersRef.doc('profiles').get();

        if (!dictDoc.exists) {
            return NextResponse.json({ error: 'No profiles found' }, { status: 404 });
        }

        return NextResponse.json(dictDoc.data());
    } catch (error) {
        console.error('Error retrieving profiles:', error);
        return NextResponse.json({ error: 'Failed to retrieve profiles' }, { status: 500 });
    }
}
