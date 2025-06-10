
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, Calendar, MapPin, Heart, ShoppingCart, Music, CreditCard, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });

  // Refs for auto-focus
  const cardNumberRef = useRef<HTMLInputElement>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  if (!album) return null;

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add space every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\D+/g, '');
    // Add slash after 2 digits
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({ ...prev, cardNumber: formatted }));
    
    // Auto-advance when 19 characters (16 digits + 3 spaces)
    if (formatted.replace(/\s/g, '').length === 16) {
      expiryDateRef.current?.focus();
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentDetails(prev => ({ ...prev, expiryDate: formatted }));
    
    // Auto-advance when 5 characters (MM/YY)
    if (formatted.length === 5) {
      cvvRef.current?.focus();
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D+/g, '').substring(0, 3);
    setPaymentDetails(prev => ({ ...prev, cvv: value }));
    
    // Auto-advance when 3 digits
    if (value.length === 3) {
      nameRef.current?.focus();
    }
  };

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = () => {
    toast({
      title: "Payment Processing",
      description: `Processing payment for ${album.title}...`,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Purchase Successful!",
        description: `Thank you for purchasing ${album.title} by ${album.artist}`,
      });
      setShowPaymentModal(false);
      onClose();
      setPaymentDetails({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        email: ''
      });
    }, 2000);
  };

  const handlePlaceBid = () => {
    setShowBidModal(true);
  };

  const handleSubmitBid = () => {
    const bid = parseFloat(bidAmount);
    if (!bid || bid <= album.price) {
      toast({
        title: "Invalid Bid",
        description: `Your bid must be higher than the current price of $${album.price}`,
        variant: "destructive"
      });
      return;
    }

    // Store bid in localStorage
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

    toast({
      title: "Bid Placed Successfully!",
      description: `Your bid of $${bid} for ${album.title} has been placed.`,
    });
    
    setShowBidModal(false);
    setBidAmount('');
    onClose();
  };

  // Mock concert data - in a real app this would come from an API
  const suggestedConcerts = [
    {
      artist: album.artist,
      venue: "Madison Square Garden",
      date: "2024-07-15",
      city: "New York, NY",
      price: 89
    },
    {
      artist: album.artist,
      venue: "The Forum",
      date: "2024-08-22",
      city: "Los Angeles, CA", 
      price: 75
    },
    {
      artist: album.artist,
      venue: "Royal Albert Hall",
      date: "2024-09-10",
      city: "London, UK",
      price: 120
    }
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">{album.title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handlePlaceBid}
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
                        onClick={handleBuyNow}
                      >
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

          {/* Suggested Concerts Section */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-5 w-5 text-purple-400" />
              <h4 className="text-lg font-semibold text-white">Upcoming {album.artist} Concerts</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedConcerts.map((concert, index) => (
                <Card key={index} className="bg-slate-700 border-slate-600 p-4">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-white">{concert.venue}</h5>
                    <p className="text-slate-300 text-sm">{concert.city}</p>
                    <div className="flex items-center space-x-1 text-slate-400 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(concert.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-green-400 font-semibold">${concert.price}</span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bid Modal */}
      <Dialog open={showBidModal} onOpenChange={setShowBidModal}>
        <DialogContent className="max-w-md bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center space-x-2">
              <Gavel className="h-5 w-5" />
              <span>Place Your Bid</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="text-white font-semibold">{album?.title}</h4>
              <p className="text-slate-300 text-sm">{album?.artist}</p>
              <p className="text-green-400 font-bold">Current Price: ${album?.price}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">Your Bid Amount</label>
              <Input
                type="number"
                placeholder={`Minimum: $${(album?.price || 0) + 1}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                step="0.01"
                min={(album?.price || 0) + 1}
              />
              <p className="text-xs text-slate-400 mt-1">
                Your bid must be at least $1 higher than the current price
              </p>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowBidModal(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitBid}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Place Bid
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Details Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Details</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="text-white font-semibold">{album.title}</h4>
              <p className="text-slate-300 text-sm">{album.artist}</p>
              <p className="text-purple-400 font-bold">${album.price}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Card Number</label>
                <Input
                  ref={cardNumberRef}
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  className="bg-slate-700 border-slate-600 text-white"
                  maxLength={19}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Expiry Date</label>
                  <Input
                    ref={expiryDateRef}
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={handleExpiryDateChange}
                    className="bg-slate-700 border-slate-600 text-white"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">CVV</label>
                  <Input
                    ref={cvvRef}
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={handleCvvChange}
                    className="bg-slate-700 border-slate-600 text-white"
                    maxLength={3}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">Cardholder Name</label>
                <Input
                  ref={nameRef}
                  placeholder="John Doe"
                  value={paymentDetails.name}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">Email</label>
                <Input
                  ref={emailRef}
                  placeholder="john@example.com"
                  value={paymentDetails.email}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePaymentSubmit}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Complete Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlbumInfoModal;
