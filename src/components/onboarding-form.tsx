"'use client'"

import { useState } from "'react'"
import { useRouter } from "'next/navigation'"
import { zodResolver } from "'@hookform/resolvers/zod'"
import { useForm } from "'react-hook-form'"
import * as z from "'zod'"
import { Button } from "'@/components/ui/button'"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "'@/components/ui/form'"
import { Input } from "'@/components/ui/input'"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "'@/components/ui/select'"
import { Switch } from "'@/components/ui/switch'"
import { toast } from "'@/components/ui/use-toast'"
import { Textarea } from "'@/components/ui/textarea'"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "'Full name must be at least 2 characters.'",
  }),
  email: z.string().email({
    message: "'Please enter a valid email address.'",
  }),
  companyName: z.string().min(2, {
    message: "'Company name must be at least 2 characters.'",
  }),
  role: z.string().min(2, {
    message: "'Role must be at least 2 characters.'",
  }),
  notifications: z.boolean().default(true),
  currentJourney: z.string().min(10, {
    message: "'Please provide at least 10 characters about your current journey.'",
  }).max(500, {
    message: "'Please keep your description under 500 characters.'",
  }),
  nicheAndOffer: z.string().min(10, {
    message: "'Please provide at least 10 characters about your niche and offer.'",
  }).max(500, {
    message: "'Please keep your description under 500 characters.'",
  }),
  goalsAndObjectives: z.string().min(10, {
    message: "'Please provide at least 10 characters about your goals and objectives.'",
  }).max(500, {
    message: "'Please keep your description under 500 characters.'",
  }),
})

export function OnboardingForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "''",
      email: "''",
      companyName: "''",
      role: "''",
      notifications: true,
      currentJourney: "''",
      nicheAndOffer: "''",
      goalsAndObjectives: "''",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    
    console.log(values)
    toast({
      title: "'Onboarding Successful'",
      description: "'Your information has been submitted successfully.'",
    })
    // Redirect to dashboard or next onboarding step
    // router.push('/dashboard')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your role</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Email Notifications</FormLabel>
                  <FormDescription>
                    Receive email notifications about product updates and tips.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="currentJourney"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Journey</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Briefly describe where you are currently in your journey..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tell us about your current situation and what brought you to our platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nicheAndOffer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Niche and Offer</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your niche and what you offer..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tell us about your target audience and the products or services you provide.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goalsAndObjectives"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goals and Objectives</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What are your main goals and objectives?"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Share what you're trying to achieve and how you hope our platform can help.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "'Submitting...'" : "'Complete Onboarding'"}
        </Button>
      </form>
    </Form>
  )
}

