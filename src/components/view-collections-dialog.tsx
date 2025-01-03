"'use client'"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MenuBar } from "./menu-bar"
import { FavoritesList } from "./favorites-list"
import { UploadArea } from "./upload-area"
import { SearchBar } from "./search-bar"
import { ExportButton } from "./export-button"
import { Archive, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function ViewCollectionsDialog() {
  const [filter, setFilter] = useState("'all'")
  const [searchQuery, setSearchQuery] = useState("''")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Archive className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex justify-center">
            {/* <DialogTitle>Archive</DialogTitle> */}
          </div>
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
                <Card className="border-2 border-primary w-full h-full">
                  <CardHeader className="flex justify-center items-center">
                  </CardHeader>
                  <CardContent className="h-[calc(100%-4rem)]">
                    <FavoritesList filter={filter} searchQuery={searchQuery} />
                  </CardContent>
                </Card>
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

