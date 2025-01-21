import { MenubarMenu, MenubarTrigger, MenubarContent, MenubarRadioGroup, MenubarRadioItem, Menubar } from "@/components/v0/ui/menubar"

interface MenuBarProps {
  onFilterChange: (filter: string) => void
}

export function MenuBar({ onFilterChange }: MenuBarProps) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Filter</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup onValueChange={onFilterChange}>
            <MenubarRadioItem value="all">All</MenubarRadioItem>
            <MenubarRadioItem value="resources">Resources</MenubarRadioItem>
            <MenubarRadioItem value="messages">Messages</MenubarRadioItem>
            <MenubarRadioItem value="collections">Collections</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

