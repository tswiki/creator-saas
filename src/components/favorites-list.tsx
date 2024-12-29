import { ScrollArea } from "@/components/ui/scroll-area"
import { Star, File, MessageSquare, Folder, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FavoritesListProps {
  filter: string
  searchQuery: string
}

interface FavoriteItem {
  id: number
  type: "'resource'" | "'message'" | "'collection'"
  title: string
  collection: string
  icon: React.ReactNode
}

export function FavoritesList({ filter, searchQuery }: FavoritesListProps) {
  // This is mock data. In a real application, you'd fetch this from an API
  const favorites: FavoriteItem[] = [
    { id: 1, type: "'resource'", title: "'Important Document'", collection: "'Work'", icon: <File className="h-4 w-4" /> },
    { id: 2, type: "'message'", title: "'Team Update'", collection: "'Project X'", icon: <MessageSquare className="h-4 w-4" /> },
    { id: 3, type: "'collection'", title: "'Project X Files'", collection: "'Work'", icon: <Folder className="h-4 w-4" /> },
    // Add more items as needed
  ]

  const filteredFavorites = favorites
    .filter(fav => filter === "'all'" || fav.type === filter.slice(0, -1)) // Remove 's' from filter
    .filter(fav => fav.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   fav.collection.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleUnstar = (id: number) => {
    // Here you would typically update the favorites list in your state or database
    console.log("'Unstarred item with id:'", id)
  }

  return (
    <ScrollArea className="h-full w-full">
      <h3 className="font-semibold mb-4">Favorites</h3>
      <ul className="space-y-4">
        {filteredFavorites.map((fav) => (
          <li key={fav.id} className="flex items-center justify-between space-x-2 p-2 hover:bg-gray-100 rounded-md">
            <div className="flex items-center space-x-2 overflow-hidden">
              {fav.icon}
              <div className="overflow-hidden">
                <p className="font-medium truncate">{fav.title}</p>
                <p className="text-sm text-gray-500 truncate">{fav.collection} • {fav.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
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
                <Star className="h-4 w-4 text-yellow-400" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

