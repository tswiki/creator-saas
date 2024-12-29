import { CommunityStreamDialog } from "@/components/community-stream-dialog"

export default function CommunityStreamPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Community Stream</h1>
      <CommunityStreamDialog />
    </div>
  )
}

