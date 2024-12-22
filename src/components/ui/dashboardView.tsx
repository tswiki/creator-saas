import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Separator } from "@radix-ui/react-select";
import { Badge, ArrowLeft, ArrowRight, Plus, Mail, ReplyIcon, Forward } from "lucide-react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { DialogHeader, DialogFooter } from "./dialog";
import { Input } from "./input";
import { Textarea } from "./textarea";


const DashboardView = () => {
    const [todos, setTodos] = useState([
      { id: 1, title: "Complete React Tutorial", description: "Finish chapters 4-6", dueDate: "2024-02-01", priority: "High" },
      { id: 2, title: "Review Pull Request", description: "Review team's code changes", dueDate: "2024-02-03", priority: "Medium" }
    ]);

    const [inProgress, setInProgress] = useState([
      { id: 3, title: "Build Portfolio Project", description: "Working on the frontend", dueDate: "2024-02-05", priority: "High" }
    ]);

    const [completed, setCompleted] = useState([
      { id: 4, title: "Setup Development Environment", description: "Install necessary tools", dueDate: "2024-01-30", priority: "Low" }
    ]);

    const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Medium" });

    const addNewTask = () => {
      const task = {
        id: Date.now(),
        ...newTask
      };
      
      switch(selectedColumn) {
        case 'todo':
          setTodos([...todos, task]);
          break;
        case 'inProgress':
          setInProgress([...inProgress, task]);
          break;
        case 'completed':
          setCompleted([...completed, task]);
          break;
      }
      
      setNewTask({ title: "", description: "", dueDate: "", priority: "Medium" });
      setShowNewTaskDialog(false);
    };

    const moveTask = (taskId: number, from: any[], setFrom: Function, to: any[], setTo: Function) => {
      const taskIndex = from.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = from[taskIndex];
        setFrom(from.filter(t => t.id !== taskId));
        setTo([...to, task]);
      }
    };

    const TaskColumn = ({ title, tasks, onMoveLeft, onMoveRight, leftLabel, rightLabel, columnType }: any) => (
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{title}</span>
            <Badge variant="secondary">{tasks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          {tasks.map((task: any) => (
            <Card key={task.id} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">{task.title}</h4>
                <Badge>{task.priority}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Due: {task.dueDate}</span>
                <div className="flex gap-2">
                  {onMoveLeft && (
                    <Button size="sm" variant="ghost" onClick={() => onMoveLeft(task.id)}>
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">{leftLabel}</span>
                    </Button>
                  )}
                  {onMoveRight && (
                    <Button size="sm" variant="ghost" onClick={() => onMoveRight(task.id)}>
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">{rightLabel}</span>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 border-2 border-dashed"
            onClick={() => {
              setSelectedColumn(columnType);
              setShowNewTaskDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </CardContent>
      </Card>
    );

    const [showMailboxDialog, setShowMailboxDialog] = useState(false);
    const [emails] = useState([
      { id: 1, subject: "Project Update", from: "team@company.com", date: "2024-02-01", content: "Latest project updates..." },
      { id: 2, subject: "Meeting Notes", from: "manager@company.com", date: "2024-02-02", content: "Notes from today's meeting..." }
    ]);

    return (
      <div className="space-y-6 pt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Button onClick={() => setShowMailboxDialog(true)}>
            <Mail className="h-4 w-4 mr-1" />
            Mailbox
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            tasks={todos}
            onMoveRight={(id: number) => moveTask(id, todos, setTodos, inProgress, setInProgress)}
            rightLabel="Move to In Progress"
            columnType="todo"
          />
          <TaskColumn
            title="In Progress"
            tasks={inProgress}
            onMoveLeft={(id: number) => moveTask(id, inProgress, setInProgress, todos, setTodos)}
            onMoveRight={(id: number) => moveTask(id, inProgress, setInProgress, completed, setCompleted)}
            leftLabel="Move to Todo"
            rightLabel="Move to Completed"
            columnType="inProgress"
          />
          <TaskColumn
            title="Completed"
            tasks={completed}
            onMoveLeft={(id: number) => moveTask(id, completed, setCompleted, inProgress, setInProgress)}
            leftLabel="Move to In Progress"
            columnType="completed"
          />
        </div>

        <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addNewTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showMailboxDialog} onOpenChange={setShowMailboxDialog}>
          {(() => {
            const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
            
            return (
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {selectedEmailId ? (
                      <Button 
                        variant="ghost" 
                        className="p-0 hover:bg-transparent" 
                        onClick={() => setSelectedEmailId(null)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Inbox
                      </Button>
                    ) : 
                      "Mailbox"
                    }
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {!selectedEmailId ? (
                    // Inbox View
                    emails.map(email => (
                      <Card 
                        key={email.id} 
                        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedEmailId(email.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">{email.subject}</h4>
                          <span className="text-sm text-muted-foreground">{email.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">From: {email.from}</p>
                        <p className="text-sm mt-2 line-clamp-2">{email.content}</p>
                      </Card>
                    ))
                  ) : (
                    // Email Detail View
                    (() => {
                      const email = emails.find(e => e.id === selectedEmailId);
                      if (!email) return null;
                      return (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-xl font-semibold">{email.subject}</h3>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>From: {email.from}</span>
                              <span>{email.date}</span>
                            </div>
                          </div>
                          <Separator />
                          <div className="prose dark:prose-invert max-w-none">
                            {email.content}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                // Handle reply logic
                                toast({
                                  title: "Reply sent",
                                  description: "Your reply has been sent successfully"
                                });
                              }}
                            >
                              <ReplyIcon className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                // Handle forward logic
                                toast({
                                  title: "Email forwarded",
                                  description: "The email has been forwarded"
                                });
                              }}
                            >
                              <Forward className="h-4 w-4 mr-2" />
                              Forward
                            </Button>
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
              </DialogContent>
            );
          })()}
        </Dialog>
      </div>
    );
  };

  export default DashboardView;