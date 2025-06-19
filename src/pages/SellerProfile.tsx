
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Calendar, Shield, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import AlbumCard from "@/components/AlbumCard";

const SellerProfile = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState<any>(null);
  const [sellerAlbums, setSellerAlbums] = useState<any[]>([]);

  const mockSellers = {
    seller1: {
      id: "seller1",
      name: "VinylVault Records",
      rating: 4.8,
      totalSales: 156,
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      joinedYear: 2019,
      location: "New York, NY",
      bio: "Passionate vinyl collector and dealer with over 20 years of experience. Specializing in rare pressings and audiophile quality records.",
      verified: true,
      responseTime: "Within 2 hours",
      shippingFrom: "New York, United States"
    },
    seller2: {
      id: "seller2",
      name: "RetroSpins",
      rating: 4.6,
      totalSales: 89,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face",
      joinedYear: 2020,
      location: "Los Angeles, CA",
      bio: "Love finding and sharing great music from all eras. Every record has a story!",
      verified: false,
      responseTime: "Within 1 day",
      shippingFrom: "California, United States"
    }
  };

  const mockAlbums = [
    {
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      price: 89,
      condition: "Like New",
      year: 1973,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPremium: true,
      genre: "Rock",
      sellerId: "seller1"
    },
    {
      title: "The Wall",
      artist: "Pink Floyd",
      price: 55,
      condition: "Like New",
      year: 1979,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
      genre: "Rock",
      sellerId: "seller1"
    }
  ];

  useEffect(() => {
    if (sellerId && mockSellers[sellerId as keyof typeof mockSellers]) {
      setSeller(mockSellers[sellerId as keyof typeof mockSellers]);
      setSellerAlbums(mockAlbums.filter(album => album.sellerId === sellerId));
    }
  }, [sellerId]);

  if (!seller) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <p className="text-white text-center">Seller not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 p-6 sticky top-6">
              <div className="text-center space-y-4">
                <img 
                  src={seller.profileImage} 
                  alt={seller.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                
                <div>
                  <div className="flex items-center justify-center space-x-2">
                    <h1 className="text-xl font-bold text-white">{seller.name}</h1>
                    {seller.verified && (
                      <Shield className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(seller.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                      />
                    ))}
                    <span className="text-sm text-slate-400 ml-2">({seller.rating})</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{seller.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Joined {seller.joinedYear}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Package className="h-4 w-4" />
                    <span className="text-sm">{seller.totalSales} sales</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-700 space-y-2">
                  <Badge className="w-full justify-center bg-green-600">
                    Responds {seller.responseTime}
                  </Badge>
                  <p className="text-xs text-slate-400">Ships from {seller.shippingFrom}</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800 border-slate-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">About</h2>
              <p className="text-slate-300">{seller.bio}</p>
            </Card>
            
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Items for Sale ({sellerAlbums.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sellerAlbums.map((album, index) => (
                  <AlbumCard key={index} {...album} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
