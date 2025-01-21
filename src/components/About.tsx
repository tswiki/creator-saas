import { Textarea } from "@/components/v0/ui/textarea"
import { Label } from "@/components/v0/ui/label"

type AboutProps = {
  currentSituation: string
  biggestBottleneck: string
  updateFields: (fields: Partial<{ currentSituation: string, biggestBottleneck: string }>) => void
}

export function About({ currentSituation, biggestBottleneck, updateFields }: AboutProps) {
  return (
    <div className="grid w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="currentSituation" className="text-center w-full">Describe your current situation</Label>
        <Textarea
          id="currentSituation"
          value={currentSituation}
          onChange={(e) => updateFields({ currentSituation: e.target.value })}
          placeholder="Tell us about your content creation journey (e.g. YouTube videos, Instagram posts, blog writing), your current audience size, posting frequency, and any specific challenges you face with content creation or audience growth..."
          className="h-24 text-center overflow-hidden"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="biggestBottleneck" className="text-center w-full">What's your biggest bottleneck?</Label>
        <Textarea
          id="biggestBottleneck"
          value={biggestBottleneck}
          onChange={(e) => updateFields({ biggestBottleneck: e.target.value })}
          placeholder="What's holding you back from growing your audience and content? (e.g. lack of time, equipment, editing skills, content ideas, monetization strategy...)"
          className="h-24 text-center p-4"
        />
      </div>
    </div>
  )
}

