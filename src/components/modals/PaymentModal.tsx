
import { CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: {
    title: string;
    artist: string;
    price: number;
  } | null;
}

const PaymentModal = ({ isOpen, onClose, album }: PaymentModalProps) => {
  const { toast } = useToast();
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

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
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
    const v = value.replace(/\D+/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({ ...prev, cardNumber: formatted }));
    
    if (formatted.replace(/\s/g, '').length === 16) {
      expiryDateRef.current?.focus();
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentDetails(prev => ({ ...prev, expiryDate: formatted }));
    
    if (formatted.length === 5) {
      cvvRef.current?.focus();
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D+/g, '').substring(0, 3);
    setPaymentDetails(prev => ({ ...prev, cvv: value }));
    
    if (value.length === 3) {
      nameRef.current?.focus();
    }
  };

  const handlePaymentSubmit = () => {
    if (!album) return;

    toast({
      title: "Payment Processing",
      description: `Processing payment for ${album.title}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Purchase Successful!",
        description: `Thank you for purchasing ${album.title} by ${album.artist}`,
      });
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

  if (!album) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onClick={onClose}
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
  );
};

export default PaymentModal;
