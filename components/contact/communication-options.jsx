"use client";
import { useState } from "react";
import { MessageSquare, Video, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function CommunicationOptions() {
    const [activeOption, setActiveOption] = useState(null);
    return (<div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-auto flex flex-col items-center p-6 gap-3 hover:bg-secondary transition-colors">
              <MessageSquare className="h-8 w-8 text-primary"/>
              <div className="text-center">
                <div className="font-medium">Live Chat</div>
                <div className="text-xs text-muted-foreground">Available now</div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start a Live Chat</DialogTitle>
              <DialogDescription>
                Connect with a team member in real-time to get immediate assistance.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-center text-muted-foreground">
                <p>This is a placeholder for the live chat interface.</p>
                <p className="mt-2">In a real implementation, this would connect to a live chat service.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-auto flex flex-col items-center p-6 gap-3 hover:bg-secondary transition-colors">
              <Video className="h-8 w-8 text-primary"/>
              <div className="text-center">
                <div className="font-medium">Video Call</div>
                <div className="text-xs text-muted-foreground">Schedule a meeting</div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule a Video Call</DialogTitle>
              <DialogDescription>Book a face-to-face virtual meeting with a team member.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" placeholder="What would you like to discuss?"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time"/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membership">Membership</SelectItem>
                    <SelectItem value="programs">Programs</SelectItem>
                    <SelectItem value="partnerships">Partnerships</SelectItem>
                    <SelectItem value="leadership">Leadership Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Request Video Call</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-auto flex flex-col items-center p-6 gap-3 hover:bg-secondary transition-colors">
              <Calendar className="h-8 w-8 text-primary"/>
              <div className="text-center">
                <div className="font-medium">Book Appointment</div>
                <div className="text-xs text-muted-foreground">In-person meeting</div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book an In-Person Appointment</DialogTitle>
              <DialogDescription>
                Schedule a face-to-face meeting at our headquarters or a regional chapter.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="toronto">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="toronto">Toronto</TabsTrigger>
                <TabsTrigger value="vancouver">Vancouver</TabsTrigger>
                <TabsTrigger value="montreal">Montreal</TabsTrigger>
              </TabsList>
              <TabsContent value="toronto" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-toronto">Date</Label>
                    <Input id="date-toronto" type="date"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-toronto">Time</Label>
                    <Input id="time-toronto" type="time"/>
                  </div>
                </div>
                <Button className="w-full">Check Availability</Button>
              </TabsContent>
              <TabsContent value="vancouver" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-vancouver">Date</Label>
                    <Input id="date-vancouver" type="date"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-vancouver">Time</Label>
                    <Input id="time-vancouver" type="time"/>
                  </div>
                </div>
                <Button className="w-full">Check Availability</Button>
              </TabsContent>
              <TabsContent value="montreal" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-montreal">Date</Label>
                    <Input id="date-montreal" type="date"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-montreal">Time</Label>
                    <Input id="time-montreal" type="time"/>
                  </div>
                </div>
                <Button className="w-full">Check Availability</Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-6 w-6 text-primary"/>
            <div>
              <div className="font-medium">Call Us</div>
              <div className="text-sm text-muted-foreground">Speak directly with our team</div>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium">General Inquiries</div>
              <a href="tel:+14165551234" className="text-primary hover:underline">
                +1 (416) 555-1234
              </a>
            </div>
            <div>
              <div className="text-sm font-medium">Membership Support</div>
              <a href="tel:+14165555678" className="text-primary hover:underline">
                +1 (416) 555-5678
              </a>
            </div>
            <div>
              <div className="text-sm font-medium">Programs & Events</div>
              <a href="tel:+14165559012" className="text-primary hover:underline">
                +1 (416) 555-9012
              </a>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-6 w-6 text-primary"/>
            <div>
              <div className="font-medium">Email Us</div>
              <div className="text-sm text-muted-foreground">Send us a message anytime</div>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium">General Inquiries</div>
              <a href="mailto:info@lotacanada.org" className="text-primary hover:underline">
                info@lotacanada.org
              </a>
            </div>
            <div>
              <div className="text-sm font-medium">Membership Support</div>
              <a href="mailto:membership@lotacanada.org" className="text-primary hover:underline">
                membership@lotacanada.org
              </a>
            </div>
            <div>
              <div className="text-sm font-medium">Programs & Events</div>
              <a href="mailto:programs@lotacanada.org" className="text-primary hover:underline">
                programs@lotacanada.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
