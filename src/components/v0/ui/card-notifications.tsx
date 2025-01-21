"use client"

import { BellRing, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/v0/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/v0/ui/card"
import { Switch } from "@/components/v0/ui/switch"

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function NotificationsCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("w-full max-w-md mx-auto bg-gray-700 border-gray-600", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <BellRing className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription className="text-gray-300">
          You have {notifications.length} unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 px-4">
        <div className="flex items-center space-x-4 rounded-md border border-gray-600 p-4">
          <BellRing className="text-gray-300 h-5 w-5 flex-shrink-0" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              Push Notifications
            </p>
            <p className="text-sm text-gray-400">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="grid grid-cols-[25px_1fr] items-start gap-4 last:mb-0"
            >
              <span className="flex h-2 w-2 translate-y-2 rounded-full bg-sky-500 justify-self-center" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-white">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-400">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Button className="w-full bg-gray-600 hover:bg-gray-500 text-white">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}
