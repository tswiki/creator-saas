import { EventCreationDialog } from "@/components/event-creation-dialog"

export default function EventsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Event Management</h1>
      <EventCreationDialog />
    </div>
  )
}

