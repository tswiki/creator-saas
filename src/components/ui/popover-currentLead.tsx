

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define prop types for the component
interface PopoverNewLeadProps {
  onSubmit: (data: { name: string; surname: string; email: string; phoneNo: string; status: string }) => void;
  onClose: () => void;
}

export function PopoverCurrentLead({ onSubmit, onClose }: PopoverNewLeadProps) {
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phoneNo, setPhoneNo] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("New Lead");

  const handleAddLead = () => {
    onSubmit({ name, surname, email, phoneNo, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-[350px] bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Add New Lead</CardTitle>
          <CardDescription>Enter the details for the new lead.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input
                  id="phoneNo"
                  placeholder="Phone number"
                  value={phoneNo}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value: React.SetStateAction<string>) => setStatus(value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Lead</SelectItem>
                    <SelectItem value="contacted">Contact Made</SelectItem>
                    <SelectItem value="qualified">Replied</SelectItem>
                    <SelectItem value="closed">Call Booked For Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddLead}>Add Lead</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
