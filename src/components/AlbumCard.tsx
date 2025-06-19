
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface AlbumCardProps {
  album: {
    id: string;
    title: string;
    artist: string;
    price: number;
    imageUrl: string;
    year: number;
    condition: string;
    productType?: 'vinyl' | 'cd' | 'cassette';
    isPremium?: boolean;
    isAuction?: boolean;
    bids?: number;
  };
  onAlbumClick?: () => void;
}

const AlbumCard = ({ album, onAlbumClick }: AlbumCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const getProductTypeInfo = (type: string) => {
    switch (type) {
      case 'vinyl':
        return { label: 'Vinyl', color: 'bg-purple-600', icon: '💿' };
      case 'cd':
        return { label: 'CD', color: 'bg-blue-600', icon: '💽' };
      case 'cassette':
        return { label: 'Cassette', color: 'bg-orange-600', icon: '📼' };
      default:
        return { label: 'Vinyl', color: 'bg-purple-600', icon: '💿' };
    }
  };

  const productInfo = getProductTypeInfo(album.productType || 'vinyl');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: album.id,
      title: album.title,
      artist: album.artist,
      price: album.price,
      imageUrl: album.imageUrl,
      year: album.year,
      condition: album.condition
    });
    
    toast({
      title: "Added to Cart",
      description: `${album.title} by ${album.artist} has been added to your cart.`,
    });
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/album/${album.id}`);
  };

  const handleCardClick = () => {
    if (onAlbumClick) {
      onAlbumClick();
    }
  };

  return (
    <Card 
      className="bg-slate-800 border-slate-700 p-6 hover:bg-slate-700 transition-colors cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={album.imageUrl} 
          alt={`${album.title} by ${album.artist}`}
          className="w-full h-48 object-cover mb-4 rounded-md cursor-pointer"
          onClick={handleImageClick}
        />
        <Badge className={`absolute top-2 left-2 ${productInfo.color} text-white font-semibold text-xs`}>
          {productInfo.icon} {productInfo.label}
        </Badge>
        {album.isPremium && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
            Premium
          </Badge>
        )}
        {album.isAuction && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white font-semibold">
            Auction
          </Badge>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-white">{album.title}</h3>
          <p className="text-slate-400 text-sm">{album.artist}</p>
        </div>
        <div className="text-right">
          <span className="text-purple-400 font-bold">${album.price}</span>
          {album.isAuction && album.bids && (
            <p className="text-xs text-slate-400">{album.bids} bids</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-slate-400 text-xs mb-4">
        <span>{album.year}</span>
        <span>{album.condition}</span>
      </div>

      <Button 
        className="w-full bg-purple-600 hover:bg-purple-700"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add to Cart
      </Button>
    </Card>
  );
};

export default AlbumCard;
