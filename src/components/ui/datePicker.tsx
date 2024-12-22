

"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export function CalendarForm() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getButtonWidth = () => {
    if (windowWidth < 640) return 'w-full' // Mobile
    if (windowWidth < 1024) return 'w-[320px]' // Tablet
    return 'w-[240px]' // Desktop
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-white p-4">
          <code className="text-black">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-white">Date of event</FormLabel>
              <FormControl>
                <Calendar
                  className={cn(
                    getButtonWidth(),
                    "bg-gray-700 border-gray-600 text-white"
                  )}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-gray-400">
                Select a date from the calendar.
              </FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className={cn(
            "bg-gray-600 hover:bg-gray-500 text-white", 
            windowWidth < 640 ? "w-full" : "w-auto"
          )}
        >
          Confirm
        </Button>
      </form>
    </Form>
  )
}