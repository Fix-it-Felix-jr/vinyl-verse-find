
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import AlbumCard from "@/components/AlbumCard";
import AlbumInfoModal from "@/components/AlbumInfoModal";

const ArtistAlbums = () => {
  const navigate = useNavigate();
  const { artistName } = useParams();
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock albums for Arctic Echoes - in a real app this would be fetched based on artistName
  const artistAlbums = [
    {
      title: "Frozen Waves",
      artist: "Arctic Echoes",
      price: 45,
      condition: "Near Mint",
      year: 2023,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genre: "Indie Rock"
    },
    {
      title: "Northern Lights",
      artist: "Arctic Echoes",
      price: 35,
      condition: "Very Good",
      year: 2022,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      genre: "Indie Rock"
    },
    {
      title: "Ice Crystals EP",
      artist: "Arctic Echoes",
      price: 25,
      condition: "Good",
      year: 2021,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
      isAuction: true,
      bids: 6,
      genre: "Indie Rock"
    }
  ];

  const handleAlbumClick = (album: any) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {artistName || "Arctic Echoes"} Albums
          </h1>
          <p className="text-slate-400">
            Discover the complete discography from this amazing artist
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artistAlbums.map((album, index) => (
            <AlbumCard 
              key={`${album.title}-${album.artist}-${index}`} 
              {...album} 
              onClick={() => handleAlbumClick(album)}
            />
          ))}
        </div>
      </div>
      
      <AlbumInfoModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        album={selectedAlbum}
      />
    </div>
  );
};

export default ArtistAlbums;
