import { Gavel } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: {
    title: string;
    artist: string;
    price: number;
    imageUrl: string;
  } | null;
}
const BidModal = ({
  isOpen,
  onClose,
  album
}: BidModalProps) => {
  const {
    toast
  } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const handleSubmitBid = () => {
    if (!album) return;
    const bid = parseFloat(bidAmount);

    // Enhanced validation
    if (!bid || isNaN(bid)) {
      toast({
        title: "Invalid Bid",
        description: "Please enter a valid number",
        variant: "destructive"
      });
      return;
    }
    if (bid > 99999) {
      toast({
        title: "Bid Too High",
        description: "Maximum bid amount is $99,999",
        variant: "destructive"
      });
      return;
    }
    if (bid <= album.price) {
      toast({
        title: "Invalid Bid",
        description: `Your bid must be higher than the current price of $${album.price}`,
        variant: "destructive"
      });
      return;
    }

    // Store bid in localStorage and update notifications
    const existingBids = JSON.parse(localStorage.getItem('userBids') || '[]');
    const newBid = {
      id: Date.now(),
      albumTitle: album.title,
      albumArtist: album.artist,
      albumImageUrl: album.imageUrl,
      currentPrice: album.price,
      bidAmount: bid,
      bidDate: new Date().toISOString(),
      status: 'active'
    };
    existingBids.push(newBid);
    localStorage.setItem('userBids', JSON.stringify(existingBids));

    // Update the album's current price to reflect the new bid
    const userAlbums = JSON.parse(localStorage.getItem('userAlbums') || '[]');
    const albumIndex = userAlbums.findIndex((a: any) => a.title === album.title && a.artist === album.artist);
    if (albumIndex !== -1) {
      userAlbums[albumIndex].price = bid;
      localStorage.setItem('userAlbums', JSON.stringify(userAlbums));
    }

    // Add notification
    const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const bidNotification = {
      id: Date.now(),
      type: 'bid',
      title: `Bid Placed - ${album.title}`,
      message: `Your bid of $${bid} has been placed successfully`,
      time: 'now',
      read: false
    };
    existingNotifications.unshift(bidNotification);
    localStorage.setItem('notifications', JSON.stringify(existingNotifications));
    toast({
      title: "Bid Placed Successfully!",
      description: `Your bid of $${bid} for ${album.title} has been placed.`
    });
    onClose();
    setBidAmount('');
  };
  if (!album) return null;
  const minBid = album.price + 1;
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl flex items-center space-x-2">
            <Gavel className="h-5 w-5" />
            <span>Place Your Bid</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h4 className="text-white font-semibold">{album.title}</h4>
            <p className="text-slate-300 text-sm">{album.artist}</p>
            <p className="text-green-400 font-bold">Current Price: ${album.price}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-500">Your Bid Amount</label>
            <Input type="number" placeholder={`Minimum: $${minBid}`} value={bidAmount} onChange={e => setBidAmount(e.target.value)} className="bg-slate-700 border-slate-600 text-white" step="0.01" min={minBid} max={99999} />
            <p className="text-xs text-slate-400 mt-1">
              Minimum bid: ${minBid} • Maximum bid: $99,999
            </p>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 border-slate-600 hover:bg-slate-700 text-slate-50">
              Cancel
            </Button>
            <Button onClick={handleSubmitBid} className="flex-1 bg-green-600 hover:bg-green-700">
              Place Bid
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default BidModal;