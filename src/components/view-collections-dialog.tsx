"'use client'"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MenuBar } from "./menu-bar"
import { FavoritesList } from "./favorites-list"
import { UploadArea } from "./upload-area"
import { SearchBar } from "./search-bar"
import { ExportButton } from "./export-button"

export function ViewCollectionsDialog() {
  const [filter, setFilter] = useState("'all'")
  const [searchQuery, setSearchQuery] = useState("''")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Collections</Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Your Library</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 flex flex-col gap-4 overflow-hidden">
              <div className="flex items-center justify-between">
                <MenuBar onFilterChange={setFilter} />
                <ExportButton />
              </div>
              <SearchBar onSearch={setSearchQuery} />
              <div className="flex-1 overflow-hidden">
                <FavoritesList filter={filter} searchQuery={searchQuery} />
              </div>
            </div>
            <div className="md:w-1/2 overflow-auto">
              <UploadArea />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

