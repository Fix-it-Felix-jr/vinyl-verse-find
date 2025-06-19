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
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Refs for auto-focus
  const cardNumberRef = useRef<HTMLInputElement>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const validateCardNumber = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (cleanNumber.length === 0) return 'Card number is required';
    if (cleanNumber.length < 16) return 'Card number must be 16 digits';
    if (!/^\d+$/.test(cleanNumber)) return 'Card number must contain only digits';
    return '';
  };

  const validateExpiryDate = (expiryDate: string) => {
    if (expiryDate.length === 0) return 'Expiry date is required';
    if (expiryDate.length < 5) return 'Enter expiry date in MM/YY format';
    
    const [month, year] = expiryDate.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt('20' + year, 10);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (monthNum < 1 || monthNum > 12) return 'Invalid month';
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return 'Card has expired';
    }
    return '';
  };

  const validateCVV = (cvv: string) => {
    if (cvv.length === 0) return 'CVV is required';
    if (cvv.length < 3) return 'CVV must be 3 digits';
    if (!/^\d+$/.test(cvv)) return 'CVV must contain only digits';
    return '';
  };

  const validateName = (name: string) => {
    if (name.trim().length === 0) return 'Cardholder name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (email: string) => {
    if (email.length === 0) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

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
    setErrors(prev => ({ ...prev, cardNumber: validateCardNumber(formatted) }));
    
    if (formatted.replace(/\s/g, '').length === 16) {
      expiryDateRef.current?.focus();
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentDetails(prev => ({ ...prev, expiryDate: formatted }));
    setErrors(prev => ({ ...prev, expiryDate: validateExpiryDate(formatted) }));
    
    if (formatted.length === 5) {
      cvvRef.current?.focus();
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D+/g, '').substring(0, 3);
    setPaymentDetails(prev => ({ ...prev, cvv: value }));
    setErrors(prev => ({ ...prev, cvv: validateCVV(value) }));
    
    if (value.length === 3) {
      nameRef.current?.focus();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPaymentDetails(prev => ({ ...prev, name: value }));
    setErrors(prev => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPaymentDetails(prev => ({ ...prev, email: value }));
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const isFormValid = () => {
    return Object.values(errors).every(error => error === '') &&
           Object.values(paymentDetails).every(value => value.trim() !== '');
  };

  const handlePaymentSubmit = () => {
    if (!album || !isFormValid()) return;

    setIsProcessing(true);
    
    // Simulate payment processing with potential errors
    const simulatePaymentError = Math.random() < 0.3; // 30% chance of error
    
    setTimeout(() => {
      if (simulatePaymentError) {
        setIsProcessing(false);
        toast({
          title: "Payment Failed",
          description: "Your card was declined. Please check your payment details and try again.",
          variant: "destructive"
        });
      } else {
        setIsProcessing(false);
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
        setErrors({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          name: '',
          email: ''
        });
      }
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
                className={`bg-slate-700 border-slate-600 text-white ${errors.cardNumber ? 'border-red-500' : ''}`}
                maxLength={19}
              />
              {errors.cardNumber && (
                <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Expiry Date</label>
                <Input
                  ref={expiryDateRef}
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleExpiryDateChange}
                  className={`bg-slate-700 border-slate-600 text-white ${errors.expiryDate ? 'border-red-500' : ''}`}
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <p className="text-red-400 text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">CVV</label>
                <Input
                  ref={cvvRef}
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={handleCvvChange}
                  className={`bg-slate-700 border-slate-600 text-white ${errors.cvv ? 'border-red-500' : ''}`}
                  maxLength={3}
                />
                {errors.cvv && (
                  <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">Cardholder Name</label>
              <Input
                ref={nameRef}
                placeholder="John Doe"
                value={paymentDetails.name}
                onChange={handleNameChange}
                className={`bg-slate-700 border-slate-600 text-white ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email</label>
              <Input
                ref={emailRef}
                placeholder="john@example.com"
                value={paymentDetails.email}
                onChange={handleEmailChange}
                className={`bg-slate-700 border-slate-600 text-white ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-500 hover:bg-slate-700"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePaymentSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={!isFormValid() || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Complete Payment'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
