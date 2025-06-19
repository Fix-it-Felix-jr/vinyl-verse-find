
import { ShoppingCart, Heart, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface PurchaseSectionProps {
  album: {
    id?: string;
    title: string;
    artist: string;
    price: number;
    condition: string;
    year: number;
    imageUrl: string;
    isPremium?: boolean;
    isAuction?: boolean;
    bids?: number;
  };
  onBuyNow: () => void;
  onPlaceBid: () => void;
}

const PurchaseSection = ({ album, onBuyNow, onPlaceBid }: PurchaseSectionProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const albumId = album.id || `${album.title}-${album.artist}`.replace(/\s+/g, '-').toLowerCase();
    addToCart({
      id: albumId,
      title: album.title,
      artist: album.artist,
      price: album.price,
      condition: album.condition,
      year: album.year,
      imageUrl: album.imageUrl
    });
    
    toast({
      title: "Added to Cart",
      description: `${album.title} by ${album.artist} has been added to your cart.`,
    });
  };

  return (
    <div className="pt-4 border-t border-slate-700">
      {album.isAuction ? (
        <div className="space-y-2">
          <p className="text-2xl font-bold text-green-400">${album.price}</p>
          <p className="text-sm text-slate-400">{album.bids} bids</p>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={onPlaceBid}
          >
            <Gavel className="h-4 w-4 mr-2" />
            Place Bid
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className={`text-2xl font-bold ${album.isPremium ? 'text-yellow-400' : 'text-white'}`}>
            ${album.price}
          </p>
          <div className="flex space-x-2">
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={onBuyNow}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
            <Button 
              variant="outline" 
              onClick={handleAddToCart}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseSection;
