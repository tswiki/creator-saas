'use client'


import { Button } from "@/components/v0/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/v0/ui/card"
import { useToast } from "@/hooks/use-toast"
import { About } from './About'
import { Skills } from './Skills'
import { NicheAndGoals } from './NicheAndGoals'
import { InterestsAndSocial } from './InterestsAndSocial'
import { CommitmentAndInvestment } from './CommitmentAndInvestment'
import { useRouter } from 'next/navigation'
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';


type FormData = {
  email: string
  currentSituation: string
  biggestBottleneck: string
  skills: string[]
  niche: string
  biggestGoal: string
  interests: string[]
  github: string
  linkedin: string
  twitter: string
  commitmentType: string
  socials: string[]
  instagram: string
  youtube: string
  tiktok: string
}

const INITIAL_DATA: FormData = {
  email: "",
  currentSituation: "",
  biggestBottleneck: "",
  skills: [],
  niche: "",
  biggestGoal: "",
  interests: [],
  github: "",
  linkedin: "",
  twitter: "",
  commitmentType: "",
  socials: [],
  instagram: "",
  youtube: "",
  tiktok: ""
}

export function OnboardingSurvey() {
  const [data, setData] = useState(INITIAL_DATA)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Get the current user's email when component mounts
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user && user.email) {
      setUserEmail(user.email);
      updateFields({ email: user.email });
    }
  }, []);

  const updateFields = (fields: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...fields }))
  }

  const next = () => {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }

  const back = () => {
    setCurrentStepIndex(i => {
      if (i <= 0) return i
      return i - 1
    })
  }
/*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(data)
    toast({
      title: "Survey Submitted",
      description: "Thank you for completing the onboarding survey!",
    })
  }
*/
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    if (!data.email && userEmail) {
      updateFields({ email: userEmail });}

    const response = await fetch('/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to submit survey')
    }

    const result = await response.json()

    if (result.status === 'success') {
      toast({
        title: "Survey Submitted",
        description: "Thank you for completing the onboarding survey!",
      })
      //router.push('/cohort')
    } else {
      toast({
        title: "Error",
        description: "Failed to submit survey. Please try again.",
        variant: "destructive"
      })
    }
  } catch (error) {
    console.error('Survey submission error:', error)
    toast({
      title: "Error",
      description: "Failed to submit survey. Please try again.",
      variant: "destructive"
    })
  }
}

  const steps = [
    <About key="about" currentSituation={data.currentSituation} biggestBottleneck={data.biggestBottleneck} updateFields={updateFields} />,
    <Skills key="skills" skills={data.skills} updateFields={updateFields} />,
    <NicheAndGoals key="nicheAndGoals" niche={data.niche} biggestGoal={data.biggestGoal} updateFields={updateFields} />,
    <InterestsAndSocial 
      key="interestsAndSocial" 
      socials={data.socials}
      tiktok={data.tiktok}
      instagram={data.instagram}
      youtube={data.youtube}
      twitter={data.twitter}
      updateFields={updateFields} 
    />,
    <CommitmentAndInvestment key="commitmentAndInvestment" commitmentType={data.commitmentType} updateFields={updateFields} />,
  ]

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-[550px]">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>{getStepTitle(currentStepIndex)}</CardTitle>
          <CardDescription>Step {currentStepIndex + 1} of {steps.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {steps[currentStepIndex]}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          {currentStepIndex !== 0 && (
            <Button type="button" variant="outline" onClick={back}>
              Back
            </Button>
          )}
          {currentStepIndex === steps.length - 1 ? (
            <Button 
              type="submit" 
              onClick={async (e) => {
                e.preventDefault();
                await handleSubmit(e);
                router.push('/cohort');
              }}
            >
              Submit
            </Button>
          ) : (
            <Button type="button" onClick={next}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}

function getStepTitle(stepIndex: number): string {
  const titles = ["", "", "", "", ""]
  return titles[stepIndex]
}
