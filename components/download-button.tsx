'use client'

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DownloadButton() {
  const handleDownload = () => {
    try {
      // First try to open in new tab
      window.open('/resume1.pdf', '_blank');
      
      // Then try to download
      const link = document.createElement('a');
      link.href = '/resume1.pdf';
      link.download = 'Ananth_R_Kulkarni_Resume.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error handling PDF:', error);
      // Final fallback: direct link
      window.location.href = '/resume1.pdf';
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2 hover:bg-primary/10"
      onClick={handleDownload}
    >
      <Download className="w-4 h-4" />
      Download PDF
    </Button>
  );
} 