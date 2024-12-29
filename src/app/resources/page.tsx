import { ResourceCreationDialog } from "@/components/resource-creation-dialog"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Resource Management</h1>
      <ResourceCreationDialog />
    </div>
  )
}

