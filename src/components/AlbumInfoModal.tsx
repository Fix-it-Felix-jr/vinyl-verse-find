
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, MapPin, Heart, ShoppingCart } from "lucide-react";

interface AlbumInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: {
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
  } | null;
}

const AlbumInfoModal = ({ isOpen, onClose, album }: AlbumInfoModalProps) => {
  if (!album) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">{album.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={album.imageUrl} 
                alt={`${album.title} by ${album.artist}`}
                className="w-full rounded-lg"
              />
              {album.isPremium && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                  Premium
                </Badge>
              )}
              {album.isAuction && (
                <Badge className="absolute top-2 right-2 bg-green-500 text-white font-semibold">
                  Auction
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
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
                <MapPin className="h-4 w-4" />
                <span>Condition: {album.condition}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              {album.isAuction ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-400">${album.price}</p>
                  <p className="text-sm text-slate-400">{album.bids} bids</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Place Bid
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className={`text-2xl font-bold ${album.isPremium ? 'text-yellow-400' : 'text-white'}`}>
                    ${album.price}
                  </p>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-white mb-2">Description</h4>
              <p className="text-sm text-slate-400">
                Original pressing of this classic album in {album.condition.toLowerCase()} condition. 
                A must-have for any serious collector of {album.artist}'s work.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumInfoModal;
