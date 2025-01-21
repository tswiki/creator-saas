"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/v0/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/v0/ui/dialog"
import { ResourceFormData } from "@/types/resources"
import { Step1Form } from "./step1-form"
import { Step2Form } from "./step2-form"
import { Step3Form } from "./step3-form"

const steps = [
  { title: "Basic Information", description: "Enter resource title, description, and creator" },
  { title: "Resource Type and Details", description: "Select resource type and add specific details" },
  { title: "Additional Details", description: "Add benefits, price, and contact information" },
]

export function ResourceCreationButton() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const methods = useForm<ResourceFormData>({
    defaultValues: {
      modules: [],
      benefits: [],
    },
  })

  const onSubmit = (data: ResourceFormData) => {
    console.log(data)
    // Here you would typically save the resource data
    setOpen(false)
    setStep(1)
    methods.reset()
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        New Product
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{steps[step - 1].title}</DialogTitle>
                <DialogDescription>
                  {steps[step - 1].description} (Step {step} of 3)
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {step === 1 && <Step1Form />}
                {step === 2 && <Step2Form />}
                {step === 3 && <Step3Form />}
              </div>
              <DialogFooter>
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Create Resource</Button>
                )}
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ResourceCreationButton;
