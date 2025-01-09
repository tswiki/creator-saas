"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type EmailFormData = {
  to: string
  subject: string
  message: string
}

export function EmailDialog() {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailFormData>()

  const onSubmit = (data: EmailFormData) => {
    console.log(data)
    // Here you would typically send the email
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Compose</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Compose Email</DialogTitle>
            <DialogDescription>
              Create a new email message. Click send when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="to">
                To
              </Label>
              <Input
                id="to"
                placeholder="recipient@example.com"
                {...register("to", { 
                  required: "Recipient is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.to && <p className="text-sm text-red-500">{errors.to.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Enter the email subject"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="h-32"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send Email</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EmailDialog