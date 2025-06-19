
import { Search, User, ShoppingCart, Disc, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Dispatch, SetStateAction } from "react";
import NotificationPanel from "./NotificationPanel";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: Dispatch<SetStateAction<string>>;
}

const Header = ({ searchQuery = "", onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  // Get user bids count
  const getUserBidsCount = () => {
    const bids = JSON.parse(localStorage.getItem('userBids') || '[]');
    return bids.filter((bid: any) => bid.status === 'active').length;
  };

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Disc className="h-8 w-8 text-purple-500" />
          <h1 
            className="text-2xl font-bold text-white cursor-pointer" 
            onClick={() => navigate('/')}
          >
            RetroSpin
          </h1>
        </div>
        
        <div className="flex-1 flex justify-center max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search albums, artists..."
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:ring-purple-500 focus:border-purple-500 w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-white hover:bg-slate-800 relative"
            onClick={() => navigate('/profile?tab=auctions')}
            title="My Bids"
          >
            <Gavel className="h-5 w-5" />
            {getUserBidsCount() > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center p-0">
                {getUserBidsCount()}
              </Badge>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={() => navigate('/cart')}
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center p-0">
                  {getTotalItems()}
                </Badge>
              )}
            </div>
          </Button>
          
          <div className="relative">
            <NotificationPanel />
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={() => navigate('/profile')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
