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
  DialogTrigger
} from "@/components/v0/ui/dialog"
import { Input } from "@/components/v0/ui/input"
import { Label } from "@/components/v0/ui/label"
import { Textarea } from "@/components/v0/ui/textarea"
import { Mail } from "lucide-react"
import { Card } from "./ui/card"

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
        <Button className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Compose
        </Button>
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
                placeholder="johndoe@example.com"
                className="border-2 border-primary"
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
                className="border-2 border-primary"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">
                Message
              </Label>
              <Card className="border-2 border-primary">
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="h-28 py-10 text-center"
                  {...register("message", { required: "Message is required" })}
                />
              </Card>
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