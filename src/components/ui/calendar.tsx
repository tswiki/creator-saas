import { Dialog } from "@radix-ui/react-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Users, Palette, Calendar, Filter, Plus, Video, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, startOfMonth, addMonths } from "date-fns";
import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Card, CardHeader, CardContent, CardFooter } from "./card";
import { DialogContent } from "./dialog";

const ScheduleView = () => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showSessionDetailsDialog, setShowSessionDetailsDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Constants for layout - adjusted to account for header and sidebar
  const HEADER_HEIGHT = 64; // Match header height
  const SIDEBAR_WIDTH = 256; // Match sidebar width
  const TIME_COLUMN_WIDTH = 80; // Reduced for better proportions

  // Time slots in 3-hour groups
  const timeGroups = [
    "00:00 - 03:00",
    "03:00 - 06:00",
    "06:00 - 09:00",
    "09:00 - 12:00",
    "12:00 - 15:00",
    "15:00 - 18:00",
    "18:00 - 21:00",
    "21:00 - 00:00"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock sessions data
  const sessions = [
    {
      id: 1,
      title: "Meeting with Client",
      day: format(new Date(), 'EEEE'),
      startTime: '10:00',
      endTime: '12:00',
      type: "meeting",
      icon: <Users className="h-4 w-4" />,
      attendees: [
        { name: "Bayu Sasmita", avatar: "/avatars/bayu.png", status: "Accepted" },
        { name: "Fridolina Lina", avatar: "/avatars/lina.png", status: "Accepted" },
      ],
      host: { name: "John Doe", avatar: "/avatars/john.png" },
      description: "Project discussion and planning"
    }
  ];

  const getDaysToShow = () => {
    switch(view) {
      case 'day':
        return [date];
      case 'week':
        return Array.from({length: 7}, (_, i) => addDays(startOfWeek(date), i));
      case 'month':
        return Array.from({length: 31}, (_, i) => addDays(startOfMonth(date), i));
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ 
      marginLeft: SIDEBAR_WIDTH, 
      marginTop: HEADER_HEIGHT,
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      width: `calc(100vw - ${SIDEBAR_WIDTH}px)`
    }}>
      {/* Calendar Header with Filters */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <Tabs value={view} onValueChange={(v: any) => setView(v)} className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {format(date, 'MMMM yyyy')}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid" style={{ 
          gridTemplateColumns: `${TIME_COLUMN_WIDTH}px repeat(${getDaysToShow().length}, minmax(150px, 1fr))`,
          minHeight: '100%'
        }}>
          {/* Time Column */}
          <div className="border-r bg-background/95 backdrop-blur-sm sticky left-0">
            {timeGroups.map((timeGroup) => (
              <div 
                key={timeGroup}
                className="border-b px-2 py-4 text-sm text-muted-foreground h-20"
              >
                {timeGroup}
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {getDaysToShow().map((day) => (
            <div key={format(day, 'd')} className="min-w-[150px]">
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b p-2">
                <div className="text-sm font-medium">{format(day, 'EEEE')}</div>
                <div className="text-sm text-muted-foreground">{format(day, 'd MMM')}</div>
              </div>

              {timeGroups.map((timeGroup) => (
                <div 
                  key={`${format(day, 'd')}-${timeGroup}`}
                  className="border-b border-r p-2 relative h-20"
                >
                  {sessions.map(session => (
                    <Card 
                      key={session.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setSelectedSession(session);
                        setShowSessionDetailsDialog(true);
                      }}
                    >
                      <CardHeader className="p-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {session.icon}
                            <div className="font-medium text-sm">{session.title}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Session Details Dialog */}
      <Dialog open={showSessionDetailsDialog} onOpenChange={setShowSessionDetailsDialog}>
        <DialogContent className="max-w-2xl">
          {selectedSession && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedSession.icon}
                    <h3 className="text-lg font-semibold">{selectedSession.title}</h3>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedSession.startTime} - {selectedSession.endTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedSession.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Attendees</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSession.attendees.map((attendee: any) => (
                      <div key={attendee.name} className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 rounded-full bg-muted" />
                        <span>{attendee.name}</span>
                        <span className="text-muted-foreground">({attendee.status})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </Button>
              </CardFooter>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleView;
