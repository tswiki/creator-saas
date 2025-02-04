import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const users = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Brown" },
]

type FormData = {
  title?: string;
  description?: string;
  createdBy?: string;
}

export function Step1Form() {
  const { register, formState: { errors }, control } = useFormContext<FormData>()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Resource Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter resource title"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Resource Description</Label>
        <Textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          placeholder="Enter resource description"
          className="h-32"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="createdBy">Created By</Label>
        <Select {...register("createdBy", { required: "Creator is required" })}>
          <SelectTrigger>
            <SelectValue placeholder="Select creator" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.createdBy && <p className="text-sm text-red-500">{errors.createdBy.message}</p>}
      </div>
    </div>
  )
}
