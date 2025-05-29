import { Star, Calendar, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AlbumCardProps {
  title: string;
  artist: string;
  price: number;
  condition: string;
  year: number;
  rating: number;
  imageUrl: string;
  isPremium?: boolean;
  isAuction?: boolean;
  bids?: number;
  onClick?: () => void;
}

const AlbumCard = ({ 
  title, 
  artist, 
  price, 
  condition, 
  year, 
  rating, 
  imageUrl, 
  isPremium = false,
  isAuction = false,
  bids = 0,
  onClick
}: AlbumCardProps) => {
  return (
    <div 
      className="group relative bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-750 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700 hover:border-purple-500/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`${title} by ${artist}`}
          className="w-full h-48 object-cover group-hover:brightness-110 transition-all"
        />
        {isPremium && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
            Premium
          </Badge>
        )}
        {isAuction && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white font-semibold">
            Auction
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Eye className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm truncate">{artist}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
              />
            ))}
            <span className="text-xs text-slate-400 ml-1">({rating}/5)</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-400 text-xs">
            <Calendar className="h-3 w-3" />
            <span>{year}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {isAuction ? (
              <div>
                <p className="text-green-400 font-semibold">${price}</p>
                <p className="text-xs text-slate-400">{bids} bids</p>
              </div>
            ) : (
              <p className={`font-semibold ${isPremium ? 'text-yellow-400' : 'text-white'}`}>
                ${price}
              </p>
            )}
          </div>
          <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
            {condition}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
