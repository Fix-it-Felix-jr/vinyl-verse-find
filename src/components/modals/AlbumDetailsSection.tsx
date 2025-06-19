
import { Star, Calendar, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AlbumDetailsSectionProps {
  album: {
    title: string;
    artist: string;
    rating: number;
    year: number;
    condition: string;
    imageUrl: string;
    isPremium?: boolean;
    isAuction?: boolean;
    productType?: 'vinyl' | 'cd' | 'cassette';
  };
}

const AlbumDetailsSection = ({ album }: AlbumDetailsSectionProps) => {
  const getProductTypeInfo = (type: string) => {
    switch (type) {
      case 'vinyl':
        return { label: 'Vinyl Record', color: 'bg-purple-600', icon: '💿' };
      case 'cd':
        return { label: 'Compact Disc', color: 'bg-blue-600', icon: '💽' };
      case 'cassette':
        return { label: 'Cassette Tape', color: 'bg-orange-600', icon: '📼' };
      default:
        return { label: 'Vinyl Record', color: 'bg-purple-600', icon: '💿' };
    }
  };

  const productInfo = getProductTypeInfo(album.productType || 'vinyl');

  return (
    <div className="space-y-4">
      <div className="relative">
        <img 
          src={album.imageUrl} 
          alt={`${album.title} by ${album.artist}`}
          className="w-full rounded-lg"
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
      
      <div>
        <h3 className="text-lg font-semibold text-white">{album.artist}</h3>
        <div className="flex items-center space-x-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < album.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
            />
          ))}
          <span className="text-sm text-slate-400 ml-2">({album.rating}/5)</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-slate-300">
          <Calendar className="h-4 w-4" />
          <span>Released: {album.year}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <Package className="h-4 w-4" />
          <span>Condition: {album.condition}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-700">
        <h4 className="text-sm font-semibold text-white mb-2">Description</h4>
        <p className="text-sm text-slate-400">
          Original {productInfo.label.toLowerCase()} of this classic album in {album.condition.toLowerCase()} condition. 
          A must-have for any serious collector of {album.artist}'s work.
        </p>
      </div>
    </div>
  );
};

export default AlbumDetailsSection;
