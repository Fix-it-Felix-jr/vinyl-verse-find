
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import AlbumDetailsSection from "./modals/AlbumDetailsSection";
import SellerInfoSection from "./modals/SellerInfoSection";
import PurchaseSection from "./modals/PurchaseSection";
import ConcertsSection from "./modals/ConcertsSection";
import BidModal from "./modals/BidModal";
import PaymentModal from "./modals/PaymentModal";

interface AlbumInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: {
    id?: string;
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
    seller?: {
      id: string;
      name: string;
      rating: number;
      totalSales: number;
      profileImage: string;
      joinedYear: number;
      location: string;
    };
  } | null;
}

const AlbumInfoModal = ({ isOpen, onClose, album }: AlbumInfoModalProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);

  if (!album) return null;

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const handlePlaceBid = () => {
    setShowBidModal(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">{album.title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <AlbumDetailsSection album={album} />
              {album.seller && <SellerInfoSection seller={album.seller} />}
            </div>
            
            <div className="space-y-4">
              <PurchaseSection 
                album={album} 
                onBuyNow={handleBuyNow}
                onPlaceBid={handlePlaceBid}
              />
            </div>
          </div>

          <ConcertsSection artist={album.artist} />
        </DialogContent>
      </Dialog>

      <BidModal 
        isOpen={showBidModal} 
        onClose={() => setShowBidModal(false)} 
        album={album}
      />

      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        album={album}
      />
    </>
  );
};

export default AlbumInfoModal;
