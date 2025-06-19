
import { User, Shield, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SellerInfoSectionProps {
  seller: {
    id: string;
    name: string;
    rating: number;
    totalSales: number;
    profileImage: string;
    joinedYear: number;
    location: string;
  };
}

const SellerInfoSection = ({ seller }: SellerInfoSectionProps) => {
  const navigate = useNavigate();

  const renderSellerImage = () => {
    if (seller.name === "RetroSpins") {
      return (
        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
          RS
        </div>
      );
    }
    return (
      <img 
        src={seller.profileImage} 
        alt={seller.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    );
  };

  return (
    <Card className="bg-slate-700 border-slate-600 p-4">
      <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
        <User className="h-4 w-4" />
        <span>Sold by</span>
      </h4>
      
      <div className="flex items-center space-x-3">
        {renderSellerImage()}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h5 className="text-white font-medium">{seller.name}</h5>
            <Shield className="h-4 w-4 text-blue-400" />
          </div>
          
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(seller.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
              />
            ))}
            <span className="text-xs text-slate-400">({seller.rating})</span>
          </div>
          
          <p className="text-xs text-slate-400 mt-1">{seller.totalSales} sales • {seller.location}</p>
        </div>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => navigate(`/seller/${seller.id}`)}
          className="border-slate-500 text-slate-500 hover:bg-slate-600"
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default SellerInfoSection;
