
import { OnboardingSurvey } from "@/components/onboarding/OnboardingSurvey"

export default function OnboardingPage() {
  return (
    <div className="container mx-auto p-5 mt-3 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-center">Welcome to Dijitaru</h1>
      <div className="p-3">     
      <p>Complete this form to finish setting up your profile</p>
      </div>
      <OnboardingSurvey/>
    </div>
  )
}
