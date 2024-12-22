import { Dialog } from "@radix-ui/react-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Users, Palette, Calendar, Filter, Plus, Video } from "lucide-react";
import { format, addDays, startOfWeek, startOfMonth, eachDayOfInterval, endOfWeek, endOfMonth } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Card, CardHeader } from "./card";
import { DialogContent } from "./dialog";

const ScheduleView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showSessionDetailsDialog, setShowSessionDetailsDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Time slots in 3-hour groups from 6 AM to 9 PM
  const timeGroups = [
    "06:00 - 09:00",
    "09:00 - 12:00",
    "12:00 - 15:00",
    "15:00 - 18:00",
    "18:00 - 21:00"
  ];

  // Calculate days to display based on view mode
  const getDaysToDisplay = () => {
    switch (viewMode) {
      case 'day':
        return [date];
      case 'week':
        const weekStart = startOfWeek(date);
        return eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) });
      case 'month':
        const monthStart = startOfMonth(date);
        return eachDayOfInterval({ start: monthStart, end: endOfMonth(monthStart) });
    }
  };

  // Mock sessions data
  const sessions = [
    {
      id: 1,
      title: "Meeting with Client",
      day: format(new Date(), 'yyyy-MM-dd'),
      startTime: '10:00',
      endTime: '12:00',
      type: "meeting",
      icon: <Users className="h-4 w-4" />,
      attendees: [
        { name: "Bayu Sasmita", avatar: "/avatars/bayu.png", status: "Accepted" },
        { name: "Fridolina Lina", avatar: "/avatars/lina.png", status: "Accepted" },
        { name: "Daffa Toldo", avatar: "/avatars/daffa.png", status: "Rejected" }
      ],
      host: { name: "John Doe", avatar: "/avatars/john.png" },
      description: "Project discussion and planning"
    }
  ];

  const daysToDisplay = getDaysToDisplay();

  return (
    <div className="h-full flex flex-col" ref={containerRef}>
      <div className="flex items-center justify-between p-4 bg-background border-b">
        <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)} className="w-full">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr] h-full">
          {/* Time Groups Column */}
          <div className="border-r bg-background w-32">
            {timeGroups.map((timeGroup) => (
              <div 
                key={timeGroup}
                className="border-b px-4 py-6 text-sm text-muted-foreground h-32"
              >
                {timeGroup}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid" style={{ 
            gridTemplateColumns: `repeat(${daysToDisplay.length}, minmax(200px, 1fr))` 
          }}>
            {daysToDisplay.map((day) => (
              <div key={format(day, 'yyyy-MM-dd')} className="min-w-[200px]">
                <div className="sticky top-0 z-10 bg-background border-b p-2 text-center">
                  <div className="text-sm font-medium">{format(day, 'EEEE')}</div>
                  <div className="text-sm text-muted-foreground">{format(day, 'd MMM')}</div>
                </div>

                {timeGroups.map((timeGroup) => {
                  const sessionForSlot = sessions.find(
                    session => session.day === format(day, 'yyyy-MM-dd')
                  );

                  return (
                    <div 
                      key={`${format(day, 'yyyy-MM-dd')}-${timeGroup}`}
                      className="border-b border-r p-2 h-32"
                    >
                      {sessionForSlot && (
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => {
                            setSelectedSession(sessionForSlot);
                            setShowSessionDetailsDialog(true);
                          }}
                        >
                          <CardHeader className="p-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {sessionForSlot.icon}
                                <div className="font-medium text-sm">{sessionForSlot.title}</div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {sessionForSlot.startTime} - {sessionForSlot.endTime}
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Details Dialog */}
      <Dialog open={showSessionDetailsDialog} onOpenChange={setShowSessionDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedSession && (
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedSession.icon}
                    <div>
                      <h3 className="font-semibold">{selectedSession.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.startTime} - {selectedSession.endTime}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => {
                    // Handle edit functionality
                    console.log('Edit session:', selectedSession.id);
                  }}>
                    Edit
                  </Button>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedSession.description}</p>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Attendees</h4>
                  <div className="flex flex-col gap-2">
                    {selectedSession.attendees.map((attendee: any) => (
                      <div key={attendee.name} className="flex items-center justify-between">
                        <div className="text-sm">{attendee.name}</div>
                        <div className="text-xs text-muted-foreground">{attendee.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleView;
