'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import 'stream-chat-react/dist/css/v2/index.css';
import LoginForm from "@/components/ui/login-form";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const handleGoogleSignIn = async (e: any) => {
    try {
      const provider = new GoogleAuthProvider();

      provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
      provider.addScope('https://www.googleapis.com/auth/calendar');
      provider.addScope('https://www.googleapis.com/auth/drive.readonly');
  
      provider.setCustomParameters({
        access_type: 'offline',
        prompt: 'consent'
      });

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
    
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
        
        if (isNewUser) {
          router.push('/onboarding');
        } else {
          router.push('/cohort');
        }
      }

    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-black flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Platform</h1>
        <p className="text-xl mb-8 max-w-md text-center">
          Experience the future of collaboration. Join us and transform the way you work.
        </p>
        <HeroVideoDialog 
          videoSrc="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          thumbnailSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop"
          thumbnailAlt="Abstract technology visualization"
          animationStyle="from-bottom"
          className="w-[512px] aspect-video rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1 bg-background">
        <LoginForm />
      </div>
    </div>
  );
}
