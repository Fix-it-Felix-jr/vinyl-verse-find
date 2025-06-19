
import { ShoppingCart, Heart, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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
  const [isInWishlist, setIsInWishlist] = useState(false);

  const albumId = album.id || `${album.title}-${album.artist}`.replace(/\s+/g, '-').toLowerCase();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some((item: any) => item.id === albumId));
  }, [albumId]);

  const handleAddToCart = () => {
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

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item: any) => item.id !== albumId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast({
        title: "Removed from Wishlist",
        description: `${album.title} by ${album.artist} has been removed from your wishlist.`,
      });
    } else {
      const newItem = {
        id: albumId,
        title: album.title,
        artist: album.artist,
        price: album.price,
        condition: album.condition,
        year: album.year,
        imageUrl: album.imageUrl
      };
      wishlist.push(newItem);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast({
        title: "Added to Wishlist",
        description: `${album.title} by ${album.artist} has been added to your wishlist.`,
      });
    }
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
              className="border-slate-600 text-slate-500 hover:bg-slate-700"
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`border-slate-600 hover:bg-slate-700 ${isInWishlist ? 'text-red-400' : 'text-slate-500'}`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseSection;
