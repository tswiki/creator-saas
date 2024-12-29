import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

export function ExportButton() {
  const handleExport = () => {
    // This is a mock function. In a real application, you'd implement the actual export logic here.
    console.log("'Exporting collection...'")
    // For example, you might fetch the data and create a JSON file:
    // const data = fetchCollectionData();
    // const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'collection_export.json';
    // a.click();
  }

  return (
    <Button onClick={handleExport} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  )
}

