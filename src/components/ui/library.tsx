

// <Dialog>
//                     <DialogTrigger asChild>
//                       <Button className="w-full" variant="outline">Library</Button>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-[90vw] max-h-[85vh] w-full h-full">
//                       <DialogHeader>
//                         <DialogTitle>Collections</DialogTitle>
//                         <DialogDescription>
//                           Browse your collections and uploaded resources
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="grid grid-cols-[2fr,1fr] gap-4 h-[calc(85vh-120px)]">
//                         <div className="flex flex-col gap-4">
//                           <div className="flex items-center gap-4">
//                             <Input placeholder="Search resources..." className="flex-1" />
//                             <Select defaultValue="all">
//                               <SelectTrigger className="w-[180px]">
//                                 <SelectValue placeholder="Filter by type" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="all">All Resources</SelectItem>
//                                 <SelectItem value="pdf">PDFs</SelectItem>
//                                 <SelectItem value="video">Videos</SelectItem>
//                                 <SelectItem value="document">Documents</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>

//                           <Tabs defaultValue="all" className="flex-1">
//                             <TabsList>
//                               <TabsTrigger value="all">All</TabsTrigger>
//                               <TabsTrigger value="collections">Collections</TabsTrigger>
//                               <TabsTrigger value="favorites">Favorites</TabsTrigger>
//                               <TabsTrigger value="recent">Recently Added</TabsTrigger>
//                             </TabsList>

//                             <TabsContent value="all" className="mt-4">
//                               <ScrollArea className="h-[calc(85vh-250px)]">
//                                 <div className="grid gap-4 p-4">
//                                   {[
//                                     {
//                                       title: "System Design Interview Guide",
//                                       type: "PDF",
//                                       addedOn: "2024-01-15",
//                                       favorite: true,
//                                       collection: "Interview Prep"
//                                     },
//                                     {
//                                       title: "Building Scalable Web Apps",
//                                       type: "Video",
//                                       addedOn: "2024-01-10",
//                                       favorite: true,
//                                       collection: "System Design"
//                                     },
//                                     {
//                                       title: "Data Structures Cheat Sheet",
//                                       type: "Document", 
//                                       addedOn: "2024-01-05",
//                                       favorite: false,
//                                       collection: "DSA"
//                                     }
//                                   ].map((resource, i) => (
//                                     <Card key={i} className="transition-all hover:shadow-md">
//                                       <CardContent className="flex items-center justify-between p-4">
//                                         <div className="flex items-center gap-4">
//                                           <BookOpen className="h-8 w-8 text-muted-foreground" />
//                                           <div>
//                                             <h4 className="font-medium">{resource.title}</h4>
//                                             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                               <span>Added on {resource.addedOn}</span>
//                                               <span>•</span>
//                                               <span>Collection: {resource.collection}</span>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                           <Badge variant="secondary">{resource.type}</Badge>
//                                           <Button variant="ghost" size="icon">
//                                             <MoreVertical className="h-4 w-4" />
//                                           </Button>
//                                           <Star className={`h-4 w-4 cursor-pointer transition-colors ${resource.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`} />
//                                         </div>
//                                       </CardContent>
//                                     </Card>
//                                   ))}
//                                 </div>
//                               </ScrollArea>
//                             </TabsContent>
//                           </Tabs>
//                         </div>

//                         <Card className="h-full flex flex-col">
//                           <CardHeader>
//                             <CardTitle className="text-lg">Upload Resources</CardTitle>
//                             <CardDescription>Add new files to your library</CardDescription>
//                           </CardHeader>
//                           <CardContent className="flex-1">
//                             <div className="space-y-4">
//                               <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                                 <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//                                 <p className="text-sm text-muted-foreground">
//                                   Drag and drop files here or click to browse
//                                 </p>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label>Add to Collection</Label>
//                                 <Select>
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select collection" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="interview">Interview Prep</SelectItem>
//                                     <SelectItem value="system">System Design</SelectItem>
//                                     <SelectItem value="dsa">DSA</SelectItem>
//                                     <SelectItem value="new">Create New Collection...</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <Button className="w-full">Upload Files</Button>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </div>
//                     </DialogContent>
//                   </Dialog>