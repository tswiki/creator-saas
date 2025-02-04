import { useFormContext, useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResourceFormData, ResourceType } from "@/app/types/resource"
import { PlusCircle, Trash2 } from 'lucide-react'

const DOCUMENT = "'document'" as const
const COURSE = "'course'" as const
const VIDEO = "'video'" as const 
const AUDIO = "'audio'" as const

const resourceTypes = [DOCUMENT, COURSE, VIDEO, AUDIO] as const

const documentFormats = ["PDF", "DOCX", "TXT", "EPUB"]
const videoResolutions = ["720p", "1080p", "1440p", "4K"]
const audioFormats = ["MP3", "WAV", "AAC", "FLAC"]

export function Step2Form() {
  const { register, watch, control, formState: { errors } } = useFormContext<ResourceFormData>()
  const { fields: modules, append: appendModule, remove: removeModule } = useFieldArray({
    control,
    name: "modules",
  })

  const resourceType = watch("type")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Resource Type</Label>
        <Select {...register("type", { required: "Resource type is required" })}>
          <SelectTrigger>
            <SelectValue placeholder="Select resource type" />
          </SelectTrigger>
          <SelectContent>
            {resourceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace(/'/g, '').charAt(0).toUpperCase() + type.replace(/'/g, '').slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
      </div>

      {resourceType === DOCUMENT && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentDetails.fileFormat">File Format</Label>
            <Select {...register("documentDetails.fileFormat", { required: "File format is required" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select file format" />
              </SelectTrigger>
              <SelectContent>
                {documentFormats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.documentDetails?.fileFormat && <p className="text-sm text-red-500">{errors.documentDetails.fileFormat.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="documentDetails.pageCount">Page Count</Label>
            <Input
              type="number"
              id="documentDetails.pageCount"
              {...register("documentDetails.pageCount", { 
                required: "Page count is required",
                min: { value: 1, message: "Page count must be at least 1" }
              })}
            />
            {errors.documentDetails?.pageCount && <p className="text-sm text-red-500">{errors.documentDetails.pageCount.message}</p>}
          </div>
        </div>
      )}

      {resourceType === COURSE && (
        <div className="space-y-4">
          <Label>Course Modules</Label>
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-2 p-4 border border-neutral-200 rounded-md dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <Label htmlFor={`modules.${moduleIndex}.title`}>Module Title</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeModule(moduleIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id={`modules.${moduleIndex}.title`}
                {...register(`modules.${moduleIndex}.title` as const, { required: "Module title is required" })}
                placeholder="Enter module title"
              />
              {errors.modules?.[moduleIndex]?.title && (
                <p className="text-sm text-red-500">{errors.modules[moduleIndex]?.title?.message}</p>
              )}

              <Label htmlFor={`modules.${moduleIndex}.chapters`}>Chapters (comma-separated)</Label>
              <Input
                id={`modules.${moduleIndex}.chapters`}
                {...register(`modules.${moduleIndex}.chapters` as const, { required: "At least one chapter is required" })}
                placeholder="Enter chapter titles, separated by commas"
              />
              {errors.modules?.[moduleIndex]?.chapters && (
                <p className="text-sm text-red-500">{errors.modules[moduleIndex]?.chapters?.message}</p>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendModule({ title: "", chapters: [] })}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Module
          </Button>
        </div>
      )}

      {resourceType === VIDEO && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="videoDetails.duration">Duration (minutes)</Label>
            <Input
              type="number"
              id="videoDetails.duration"
              {...register("videoDetails.duration", { 
                required: "Duration is required",
                min: { value: 1, message: "Duration must be at least 1 minute" }
              })}
            />
            {errors.videoDetails?.duration && <p className="text-sm text-red-500">{errors.videoDetails.duration.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoDetails.resolution">Resolution</Label>
            <Select {...register("videoDetails.resolution", { required: "Resolution is required" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select video resolution" />
              </SelectTrigger>
              <SelectContent>
                {videoResolutions.map((resolution) => (
                  <SelectItem key={resolution} value={resolution}>
                    {resolution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.videoDetails?.resolution && <p className="text-sm text-red-500">{errors.videoDetails.resolution.message}</p>}
          </div>
        </div>
      )}

      {resourceType === AUDIO && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="audioDetails.duration">Duration (minutes)</Label>
            <Input
              type="number"
              id="audioDetails.duration"
              {...register("audioDetails.duration", { 
                required: "Duration is required",
                min: { value: 1, message: "Duration must be at least 1 minute" }
              })}
            />
            {errors.audioDetails?.duration && <p className="text-sm text-red-500">{errors.audioDetails.duration.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="audioDetails.fileFormat">File Format</Label>
            <Select {...register("audioDetails.fileFormat", { required: "File format is required" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select audio format" />
              </SelectTrigger>
              <SelectContent>
                {audioFormats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.audioDetails?.fileFormat && <p className="text-sm text-red-500">{errors.audioDetails.fileFormat.message}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
