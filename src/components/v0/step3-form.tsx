import { useFormContext, useFieldArray } from "react-hook-form"
import { Input } from "@/components/v0/ui/input"
import { Label } from "@/components/v0/ui/label"
import { Button } from "@/components/v0/ui/button"
import { ResourceFormData } from "@/app/types/resource"
import { PlusCircle, Trash2 } from 'lucide-react'

export function Step3Form() {
  const { register, control, formState: { errors } } = useFormContext<ResourceFormData>()
  const { fields: benefits, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: "benefits",
  })

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Program Benefits</Label>
        {benefits.map((benefit, index) => (
          <div key={benefit.id} className="flex items-center space-x-2">
            <Input
              {...register(`benefits.${index}` as const, { required: "Benefit is required" })}
              placeholder="Enter a benefit"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeBenefit(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendBenefit("")}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Benefit
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Program Price</Label>
        <Input
          id="price"
          type="number"
          {...register("price", { 
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" }
          })}
          placeholder="Enter program price"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          type="email"
          {...register("contactEmail", { 
            required: "Contact email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address"
            }
          })}
          placeholder="Enter contact email"
        />
        {errors.contactEmail && <p className="text-sm text-red-500">{errors.contactEmail.message}</p>}
      </div>
    </div>
  )
}

