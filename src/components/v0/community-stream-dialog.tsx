"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
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
import { Input } from "@/components/v0/ui/input"
import { Label } from "@/components/v0/ui/label"
import { Textarea } from "@/components/v0/ui/textarea"

type CommunityStreamFormData = {
  headline: string
  subject: string
}

export function ActivityDialog() {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommunityStreamFormData>()

  const onSubmit = (data: CommunityStreamFormData) => {
    console.log(data)
    // Here you would typically add the event/information to the community stream
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add to Community Stream</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add to Community Stream</DialogTitle>
            <DialogDescription>
              Add a new event or information to the community stream. Click add when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="headline">
                Headline
              </Label>
              <Input
                id="headline"
                placeholder="Enter a catchy headline"
                {...register("headline", { 
                  required: "Headline is required",
                  maxLength: {
                    value: 100,
                    message: "Headline must be 100 characters or less"
                  }
                })}
              />
              {errors.headline && <p className="text-sm text-red-500">{errors.headline.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">
                Subject
              </Label>
              <Textarea
                id="subject"
                placeholder="Provide more details about your event or information"
                className="h-32"
                {...register("subject", { 
                  required: "Subject is required",
                  maxLength: {
                    value: 500,
                    message: "Subject must be 500 characters or less"
                  }
                })}
              />
              {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add to Stream</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

