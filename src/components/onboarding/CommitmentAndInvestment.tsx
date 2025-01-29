import { Checkbox } from "@/components/v0/ui/checkbox"
import { Label } from "@/components/v0/ui/label"

type CommitmentAndInvestmentProps = {
  commitmentType: string
  updateFields: (fields: Partial<{ commitmentType: string }>) => void
}

export function CommitmentAndInvestment({ commitmentType, updateFields }: CommitmentAndInvestmentProps) {
  return (
    <div className="grid w-full gap-4">
      <Label className="text-base font-semibold text-center">You are best described as:</Label>
      <div className="space-y-4 flex flex-col items-center">
        <div className="flex items-center space-x-2 justify-center">
          <Checkbox 
            id="able-committed" 
            checked={commitmentType === "able-committed"}
            onCheckedChange={() => updateFields({ commitmentType: "able-committed" })}
          />
          <Label htmlFor="able-committed" className="text-sm font-normal">
            I can invest time and resources with full commitment
          </Label>
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <Checkbox 
            id="unable-committed" 
            checked={commitmentType === "unable-committed"}
            onCheckedChange={() => updateFields({ commitmentType: "unable-committed" })}
          />
          <Label htmlFor="unable-committed" className="text-sm font-normal">
            I have limited resources but I'm commited
          </Label>
        </div>
      </div>
    </div>
  )
}
