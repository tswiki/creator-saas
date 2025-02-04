import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type NicheAndGoalsProps = {
  niche: string
  biggestGoal: string
  updateFields: (fields: Partial<{ niche: string, biggestGoal: string }>) => void
}

export function NicheAndGoals({ niche, biggestGoal, updateFields }: NicheAndGoalsProps) {
  return (
    <div className="grid w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="niche" className="text-center">What's your specific niche or area of expertise?</Label>
        <Input
          id="niche"
          value={niche}
          onChange={(e) => updateFields({ niche: e.target.value })}
          placeholder="E.g., Content Creation, Motion Graphics, Copywriting..."
          className="text-center"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="biggestGoal" className="text-center">What's your biggest goal or aspiration in your field?</Label>
        <Textarea
          id="biggestGoal"
          value={biggestGoal}
          onChange={(e) => updateFields({ biggestGoal: e.target.value })}
          placeholder="List your goals (e.g. reaching 100k subscribers, launching a course, building a community, generating full-time income from content...)"
          className="h-24 text-center p-4"
        />
      </div>
    </div>
  )
}

