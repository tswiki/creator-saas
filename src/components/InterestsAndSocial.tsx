import { Input } from "@/components/v0/ui/input"
import { Label } from "@/components/v0/ui/label"

// Define FormData type to include social media fields
type FormData = {
  socials: string[];
  tiktok: string;
  instagram: string;
  youtube: string;
  twitter: string;
}

interface InterestsAndSocialProps {
  socials: string[],
  tiktok: string;
  instagram: string;
  youtube: string;
  twitter: string;
  updateFields: (fields: Partial<FormData>) => void;
}

export function InterestsAndSocial({ 
  socials,
  tiktok, 
  youtube, 
  instagram, 
  twitter, 
  updateFields 
}: InterestsAndSocialProps) {
  return (
    <div className="grid w-full gap-6">
      <div className="space-y-3 text-center">
        <Label>Social Media Links</Label>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="instagram" className="w-20 pl-5">
              <svg className="w-5 h-5 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Label>
            <Input
              id="instagram"
              value={instagram}
              onChange={(e) => updateFields({ instagram: e.target.value })}
              placeholder="https://instagram.com/@username"
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="youtube" className="w-20 pl-5">
              <svg className="w-5 h-5 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Label>
            <Input
              id="youtube"
              value={youtube}
              onChange={(e) => updateFields({ youtube: e.target.value })}
              placeholder="https://youtube.com/@username"
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="tiktok" className="w-20 pl-5">
              <svg className="w-5 h-5 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </Label>
            <Input
              id="tiktok"
              value={tiktok}
              onChange={(e) => updateFields({ tiktok: e.target.value })}
              placeholder="https://tiktok.com/@username" 
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="twitter" className="w-20 pl-5">
              <svg className="w-5 h-5 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Label>
            <Input
              id="twitter" 
              value={twitter}
              onChange={(e) => updateFields({ twitter: e.target.value })}
              placeholder="https://x.com/@username"
            />
          </div>
        </div>
      </div>
    </div>
  )
}