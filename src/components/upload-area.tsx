"'use client'"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UploadArea() {
  const [files, setFiles] = useState<File[]>([])
  const [category, setCategory] = useState("''")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleUpload = () => {
    // Here you would typically send the files to your server
    console.log("'Uploading'", files, "'to category'", category)
    // Reset state after upload
    setFiles([])
    setCategory("''")
  }

  return (
    <div className="h-full flex flex-col space-y-6 p-6 bg-background/95 rounded-lg border shadow-sm">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
        <p className="text-sm text-muted-foreground">Add files to your collection</p>
      </div>

      <div
        {...getRootProps()}
        className={`
          flex-1 border-2 border-dashed rounded-xl p-8
          flex flex-col items-center justify-center text-center
          cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}
        `}
      >
        <input {...getInputProps()} />
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        {isDragActive ? (
          <p className="text-primary font-medium">Drop files here...</p>
        ) : (
          <div>
            <p className="font-medium mb-1">Drag & drop files here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Selected Files</h4>
            <span className="text-sm text-muted-foreground">{files.length} file(s)</span>
          </div>
          <div className="space-y-2 max-h-32 overflow-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm p-2 rounded-md bg-background">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs text-primary">{index + 1}</span>
                </div>
                <span className="truncate flex-1">{file.name}</span>
                <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)}kb</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="resources">Resources</SelectItem>
            <SelectItem value="messages">Messages</SelectItem>
            <SelectItem value="collections">Collections</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={handleUpload} 
          disabled={files.length === 0 || !category}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload {files.length} file{files.length !== 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  )
}

