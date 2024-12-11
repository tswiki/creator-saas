import { OnboardingForm } from "'@/components/onboarding-form'"

export default function OnboardingPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our SaaS</h1>
      <p className="text-lg mb-8">
        Please complete this form to get started with your account. We'd love to learn more about your journey, your niche, and your goals to better assist you.
      </p>
      <OnboardingForm />
    </div>
  )
}

