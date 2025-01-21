import { ScrollArea } from "@/components/v0/ui/scroll-area"
import { Star, File, MessageSquare, Folder, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/v0/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/v0/ui/dropdown-menu"
import { Card } from "@/components/v0/ui/card"

interface FavoritesListProps {
  filter: string
  searchQuery: string
}

interface FavoriteItem {
  id: number
  type: "'resource'" | "'message'" | "'collection'"
  title: string
  collection: string
  description: string
  icon: React.ReactNode
}

export function FavoritesList({ filter, searchQuery }: FavoritesListProps) {
  // Sample data with more details
  const favorites: FavoriteItem[] = [
    { 
      id: 1, 
      type: "'resource'", 
      title: "'Product Requirements Doc'", 
      collection: "'Work Documents'",
      description: "'Key requirements and specifications for Q1 2024'", 
      icon: <File className="h-4 w-4" /> 
    },
    { 
      id: 2, 
      type: "'message'", 
      title: "'Team Sync Notes'", 
      collection: "'Project Alpha'",
      description: "'Weekly sync meeting notes from engineering team'", 
      icon: <MessageSquare className="h-4 w-4" /> 
    },
    { 
      id: 3, 
      type: "'collection'", 
      title: "'Design Assets'", 
      collection: "'Marketing'",
      description: "'Brand guidelines and marketing materials'", 
      icon: <Folder className="h-4 w-4" /> 
    }
  ]

  const filteredFavorites = favorites
    .filter(fav => filter === "'all'" || fav.type === filter.slice(0, -1))
    .filter(fav => fav.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   fav.collection.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleUnstar = (id: number) => {
    console.log("'Unstarred item with id:'", id)
  }

  if (filteredFavorites.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
        <Star className="h-12 w-12 mb-4" />
        <p className="text-lg font-medium">No favorites yet</p>
        <p className="text-sm">Star items to see them here</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-4 p-1">
        {filteredFavorites.map((fav) => (
          <Card key={fav.id} className="p-4 hover:bg-accent transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="p-2 bg-muted rounded-md">
                  {fav.icon}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="font-medium truncate">{fav.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {fav.collection} • {fav.type}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {fav.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" onClick={() => handleUnstar(fav.id)}>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
