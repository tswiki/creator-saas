import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type SkillsProps = {
  skills: string[]
  updateFields: (fields: Partial<{ skills: string[] }>) => void
}

const SKILL_OPTIONS = [
  "Content Creation", "Video Editing", "Motion Graphics", "Copywriting", "Social Media Management",
  "Email Marketing", "Podcasting",
  "YouTube", "TikTok", "Instagram", "Twitter",
  "Graphic Design", "Brand Strategy", "Data Science"
]

export function Skills({ skills, updateFields }: SkillsProps) {
  const toggleSkill = (skill: string) => {
    const updatedSkills = skills.includes(skill)
      ? skills.filter(s => s !== skill)
      : [...skills, skill]
    updateFields({ skills: updatedSkills })
  }

  return (
    <div className="grid w-full gap-4">
      <Label className="text-center">Which areas do you specialize in:</Label>
      <div className="grid grid-cols-2 gap-2 pl-16">
        {SKILL_OPTIONS.map((skill) => (
          <div key={skill} className="flex items-center space-x-2">
            <Checkbox 
              id={skill} 
              checked={skills.includes(skill)}
              onCheckedChange={() => toggleSkill(skill)}
            />
            <Label htmlFor={skill}>{skill}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}

