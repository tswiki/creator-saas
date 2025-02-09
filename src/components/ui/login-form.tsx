"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase/firebaseConfig"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // Handle login logic here
      console.log("Login attempt with:", email, password)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()

      provider.addScope('https://www.googleapis.com/auth/gmail.readonly')
      provider.addScope('https://www.googleapis.com/auth/calendar')
      provider.addScope('https://www.googleapis.com/auth/drive.readonly')
  
      provider.setCustomParameters({
        access_type: 'offline',
        prompt: 'consent'
      })

      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()
    
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })

      if (response.ok) {
        const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime
        
        if (isNewUser) {
          router.push('/onboarding')
        } else {
          router.push('/cohort')
        }
      }

    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{step === 1 ? "Enter your email" : "Welcome back"}</CardTitle>
          <CardDescription>
            {step === 1 ? "To get started, enter your email" : `Please enter your password for ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {step === 1 ? (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              ) : (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <Button type="submit" className="w-full">
                {step === 1 ? "Next" : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {step === 1 && (
            <>
              <div className="w-full mb-4">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleSignIn}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  Login with Google
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline">
                  Sign up
                </a>
              </p>
            </>
          )}
          {step === 2 && (
            <Button variant="link" className="w-full" onClick={() => setStep(1)}>
              Back to email
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
