"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ResourceFormData } from '../app/types/resource'
import { Step1Form } from "./step1-form"
import { Step2Form } from "./step2-form"
import { Step3Form } from "./step3-form"

const steps = [
  { title: "Basic Information", description: "Enter resource title, description, and creator" },
  { title: "Resource Type and Details", description: "Select resource type and add specific details" },
  { title: "Additional Details", description: "Add benefits, price, and contact information" },
]

export function ResourceCreationDialog() {
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Resource</Button>
      </DialogTrigger>
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
  )
}

