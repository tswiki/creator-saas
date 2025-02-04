"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DialogHeader, DialogFooter } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { CampaignFormData } from "@/lib/types"

export default function CampaignForm() {
  const [formData, setFormData] = useState<CampaignFormData>({
    id: "",
    idealCustomerProfile: "",
    businessType: "",
    solution: "",
    relevancePoint: "",
    language: "",
    tone: "",
    startDate: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).some((value) => value === "")) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      })
      return
    }
    // Here you would typically send the data to your backend
    console.log(formData)
    toast({
      title: "Success", 
      description: "Campaign information submitted successfully!",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-fit">Create Campaign</Button>
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-background/60 backdrop-blur-xl p-6 rounded-lg shadow-lg border-2">
        <Card className="w-full">
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle className="text-2xl font-bold">Outbound Campaign</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[60vh]">
            <form onSubmit={handleSubmit} className="space-y-6 mt-6 px-8">
              <div className="space-y-6">
              <div className="text-center">
                  <Label htmlFor="campaignName" className="text-foreground block mb-2">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    name="id"
                    type="text"
                    placeholder="Enter campaign name (e.g. Welcome Series)"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                    className="bg-background text-foreground border-2 w-full text-center focus:border-primary"
                  />
                </div>
                <div className="text-center">
                  <Label htmlFor="idealCustomerProfile" className="text-foreground block mb-2">Ideal Customer Profile</Label>
                  <Input
                    id="idealCustomerProfile"
                    name="idealCustomerProfile"
                    placeholder="e.g., sales teams, creators, brands"
                    value={formData.idealCustomerProfile}
                    onChange={handleInputChange}
                    className="bg-background text-foreground border-2 w-full text-center"
                  />
                </div>

                <div className="text-center">
                  <Label htmlFor="relevancePoint" className="text-foreground block mb-2">User Relevance and Activation Point</Label>
                  <Textarea
                    id="relevancePoint"
                    name="relevancePoint"
                    placeholder="Describe the relevance and activation point (ie why the user opted in - lead magnet, opt in form, cohort application etc...)"
                    value={formData.relevancePoint}
                    onChange={handleInputChange}
                    className="bg-background text-foreground border-2 w-full min-h-[100px] text-center"
                  />
                </div>

                <div className="text-center">
                  <Label htmlFor="solution" className="text-foreground block mb-2">Solution Provided</Label>
                  <Textarea
                    id="solution"
                    name="solution"
                    placeholder="e.g., software that generates and qualifies leads"
                    value={formData.solution}
                    onChange={handleInputChange}
                    className="bg-background text-foreground border-2 w-full min-h-[100px] text-center"
                  />
                </div>

                <div className="text-center">
                  <Label htmlFor="language" className="text-foreground block mb-2">Language</Label>
                  <Select onValueChange={handleSelectChange("language")}>
                    <SelectTrigger className="bg-background text-foreground border-2 w-4/5 mx-auto text-center">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-center">
                  <Label htmlFor="tone" className="text-foreground block mb-2">Tone of the Campaign</Label>
                  <Select onValueChange={handleSelectChange("tone")}>
                    <SelectTrigger className="bg-background text-foreground border-2 w-3/5 mx-auto text-center">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                
                <div className="text-center">
                  <Label htmlFor="startDate" className="text-foreground block mb-2">Campaign Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-2/5 justify-center text-center font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[350px] p-3">
                      <Calendar
                        mode="single"
                        selected={formData.startDate ? new Date(formData.startDate) : undefined}
                        onSelect={(date) => {
                          const event = {
                            currentTarget: {
                              name: "startDate",
                              value: date ? date.toISOString() : ""
                            },
                            target: {
                              name: "startDate", 
                              value: date ? date.toISOString() : ""
                            }
                          } as React.ChangeEvent<HTMLInputElement>;
                          handleInputChange(event);
                        }}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

              </div>

              <DialogFooter className="mt-6 pb-6 flex justify-center items-center">
                <Button 
                  type="submit" 
                  className="w-1/4 mx-auto"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const campaignData = {
                        ...formData,
                        name: formData.businessType // Using business type as campaign name
                      };

                      const response = await fetch('/api/campaign', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(campaignData)
                      });

                      if (!response.ok) {
                        throw new Error('Failed to create campaign');
                      }

                      toast({
                        title: "Campaign Created Successfully", 
                        description: (
                          <div className="mt-2 space-y-2 text-sm">
                            <p>Campaign Name: {campaignData.name}</p>
                            <p>Business Type: {formData.businessType}</p>
                            <p>Target Customer: {formData.idealCustomerProfile}</p>
                            <p>Start Date: {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'Not set'}</p>
                            <p>Campaign Tone: {formData.tone}</p>
                          </div>
                        ),
                        variant: "default"
                      });
                    } catch (error) {
                      toast({
                        title: "Error Creating Campaign",
                        description: "There was a problem creating your campaign. Please try again.",
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  Create Campaign
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
