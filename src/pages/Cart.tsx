import { useState } from "react";
import { ArrowLeft, Plus, Minus, X, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });

  const userCollection = JSON.parse(localStorage.getItem('userCollection') || '[]');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const match = v.match(/\d{4,16}/g);
    const match_found = match && match[0] || '';
    const parts = [];
    for (let i = 0, len = match_found.length; i < len; i += 4) {
      parts.push(match_found.substring(i, i + 4));
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
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentDetails(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D+/g, '').substring(0, 3);
    setPaymentDetails(prev => ({ ...prev, cvv: value }));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some albums to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    setShowCheckoutModal(true);
  };

  const addToCollection = (items: any[]) => {
    const collection = JSON.parse(localStorage.getItem('userCollection') || '[]');
    const newItems = items.map(item => ({
      id: item.id,
      title: item.title,
      artist: item.artist,
      price: item.price,
      condition: item.condition,
      year: item.year,
      imageUrl: item.imageUrl,
      purchaseDate: new Date().toISOString().split('T')[0]
    }));
    collection.push(...newItems);
    localStorage.setItem('userCollection', JSON.stringify(collection));
  };

  const handlePaymentSubmit = () => {
    toast({
      title: "Processing Payment",
      description: `Processing payment for ${getTotalItems()} items...`,
    });
    
    setTimeout(() => {
      addToCollection(items);
      toast({
        title: "Purchase Successful!",
        description: `Thank you for your purchase of ${getTotalItems()} albums!`,
      });
      clearCart();
      setShowCheckoutModal(false);
      setPaymentDetails({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
        email: ''
      });
      navigate('/');
    }, 2000);
  };

  if (items.length === 0 && userCollection.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collection
            </Button>
          </div>

          <Card className="bg-slate-800 border-slate-700 p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-slate-400 mb-6">Start browsing our collection to add albums to your cart.</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Browse Albums
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        
        <div className="container mx-auto px-4 py-6 max-w-4xl pb-24">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-white hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Collection
              </Button>
              <h1 className="text-2xl font-semibold text-white">Shopping Cart ({getTotalItems()} items)</h1>
            </div>
            
            {items.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="border-red-600 text-red-400 hover:bg-red-900/20"
              >
                Clear Cart
              </Button>
            )}
          </div>

          {items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-slate-800 border-slate-700 p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.imageUrl} 
                        alt={`${item.title} by ${item.artist}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-slate-300 text-sm">{item.artist}</p>
                        <p className="text-slate-400 text-xs">{item.year} • {item.condition}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 w-8 h-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 w-8 h-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className="text-white font-semibold min-w-[60px]">${(item.price * item.quantity).toFixed(2)}</p>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:bg-red-900/20 w-8 h-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <Card className="bg-slate-800 border-slate-700 p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-slate-300">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-slate-700 pt-3">
                      <div className="flex justify-between text-white font-semibold text-lg">
                        <span>Total</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {userCollection.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Package className="h-6 w-6 text-green-400" />
                <h2 className="text-2xl font-semibold text-white">Your Purchased Albums ({userCollection.length})</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCollection.map((item: any) => (
                  <Card key={item.id} className="bg-slate-800 border-slate-700 p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.imageUrl} 
                        alt={`${item.title} by ${item.artist}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{item.title}</h3>
                        <p className="text-slate-300 text-sm truncate">{item.artist}</p>
                        <p className="text-slate-400 text-xs">{item.year} • {item.condition}</p>
                        <p className="text-green-400 text-xs">Purchased: {item.purchaseDate}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-white font-semibold">${item.price}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <DialogContent className="max-w-md bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Checkout</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <h4 className="text-white font-semibold">Order Summary</h4>
              <p className="text-slate-300 text-sm">{getTotalItems()} items</p>
              <p className="text-purple-400 font-bold">${getTotalPrice().toFixed(2)}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Card Number</label>
                <Input
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
                  placeholder="John Doe"
                  value={paymentDetails.name}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">Email</label>
                <Input
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
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1 border-slate-600 text-slate-500 hover:bg-slate-700"
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

export default Cart;
