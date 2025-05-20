
'use client';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { HouseName } from '@/lib/constants';

interface ShareButtonProps {
  houseName: HouseName;
}

const ShareButton: FC<ShareButtonProps> = ({ houseName }) => {
  const { toast } = useToast();
  const [canShare, setCanShare] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanShare(!!navigator.share);
      setPageUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Hogwarts House Sorter',
      text: `I've been sorted into ${houseName}! Discover your Hogwarts house.`,
      url: pageUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({ title: "Shared successfully!", description: "Your magical destiny is now known to others." });
      } else {
        // Fallback if navigator.share doesn't exist (e.g., desktop browser without native share)
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({ title: "Link Copied!", description: "Share your house with the world (or just your owl post)." });
      }
    } catch (shareErr) {
      // This catch block is entered if:
      // 1. navigator.share exists but fails (e.g., permission denied, user cancellation).
      // 2. navigator.share does not exist, AND the clipboard.writeText in the 'else' block fails.

      // Attempt clipboard fallback specifically if navigator.share was the part that failed.
      // We can infer this because if navigator.share didn't exist, the error would likely
      // be from the clipboard.writeText in the 'else' block above, or this catch block wouldn't be hit
      // in the first place for the shareErr itself.
      // A more explicit way could be to check if `shareErr` is a "AbortError" or "NotAllowedError"
      // but for simplicity, we'll try clipboard again.

      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        // If clipboard fallback succeeds after a share attempt failed, toast a specific message.
        // We avoid console.error for shareErr here if clipboard works, to reduce console noise.
        toast({ title: "Link Copied!", description: "Sharing via native share failed, but the link is on your clipboard." });
      } catch (copyErr) {
        // Both Web Share API (if it was attempted and failed) and clipboard fallback failed.
        console.error('Error sharing via Web Share API (if attempted):', shareErr);
        console.error('Error copying to clipboard after share attempt failed:', copyErr);
        toast({ variant: "destructive", title: "Sharing Failed", description: "Could not share or copy the link." });
      }
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" className="shadow-md hover:shadow-lg transition-shadow border-primary/50 text-primary hover:bg-primary/10">
      {canShare ? <Share2 className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
      {canShare ? 'Share Your House' : 'Copy Share Link'}
    </Button>
  );
};

export default ShareButton;
