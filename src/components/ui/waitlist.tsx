"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CardWithForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Waitlist</CardTitle>
          <CardDescription>Enter your details to join Concrete Manifest.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullname" className="">Name</Label>
                <Input 
                  id="fullname" 
                  placeholder="Name" 
                  className=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Email" 
                  type="email"
                  className=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNo" className="">Phone Number</Label>
                <Input 
                  id="phoneNo" 
                  placeholder="Phone Number" 
                  type="tel"
                  className=""
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full">Join Waitlist</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
