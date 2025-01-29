export interface Message {
  id: string
  type: "email" | "sms"
  subject?: string
  body: string
  attachments?: string[]
  sendAfter: number // hours after the previous message
}

export interface Campaign {
  id: string
  name: string
  messages: Message[]
}

export const messageTypeColors = {
  email: "bg-blue-500",
  sms: "bg-green-500",
}

