import { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import AlbumInfoModal from "./AlbumInfoModal";
import { useFilters } from "@/contexts/FilterContext";

interface AlbumGridProps {
  searchQuery?: string;
}

const AlbumGrid = ({ searchQuery = "" }: AlbumGridProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allAlbums, setAllAlbums] = useState<any[]>([]);
  
  const {
    selectedGenres,
    selectedConditions,
    selectedDecades,
    priceRange,
    categoryFilter
  } = useFilters();

  const defaultAlbums = [
    {
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      price: 89,
      condition: "Near Mint",
      year: 1973,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPremium: true,
      genre: "Rock"
    },
    {
      title: "Led Zeppelin IV",
      artist: "Led Zeppelin",
      price: 45,
      condition: "Very Good",
      year: 1971,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      genre: "Rock"
    },
    {
      title: "Nevermind",
      artist: "Nirvana",
      price: 25,
      condition: "Good",
      year: 1991,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
      isAuction: true,
      bids: 12,
      genre: "Alternative"
    },
    {
      title: "Abbey Road",
      artist: "The Beatles",
      price: 120,
      condition: "Mint",
      year: 1969,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPremium: true,
      genre: "Rock"
    },
    {
      title: "Back in Black",
      artist: "AC/DC",
      price: 35,
      condition: "Very Good",
      year: 1980,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      genre: "Rock"
    },
    {
      title: "The Wall",
      artist: "Pink Floyd",
      price: 55,
      condition: "Near Mint",
      year: 1979,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
      genre: "Rock"
    },
    {
      title: "Master of Puppets",
      artist: "Metallica",
      price: 40,
      condition: "Good",
      year: 1986,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isAuction: true,
      bids: 8,
      genre: "Metal"
    },
    {
      title: "Rumours",
      artist: "Fleetwood Mac",
      price: 75,
      condition: "Near Mint",
      year: 1977,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      isPremium: true,
      genre: "Rock"
    }
  ];

  // Load albums on component mount
  useEffect(() => {
    const userAlbums = JSON.parse(localStorage.getItem('userAlbums') || '[]');
    setAllAlbums([...defaultAlbums, ...userAlbums]);
  }, []);

  // Filter albums based on selected filters AND search query
  const filteredAlbums = allAlbums.filter(album => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = album.title.toLowerCase().includes(query);
      const matchesArtist = album.artist.toLowerCase().includes(query);
      const matchesGenre = album.genre?.toLowerCase().includes(query);
      
      if (!matchesTitle && !matchesArtist && !matchesGenre) {
        return false;
      }
    }

    // Category filter
    if (categoryFilter === 'premium' && !album.isPremium) return false;
    if (categoryFilter === 'flea' && (album.isPremium || album.price > 50)) return false;

    // Genre filter
    if (selectedGenres.length > 0 && album.genre && !selectedGenres.includes(album.genre)) return false;

    // Condition filter
    if (selectedConditions.length > 0 && !selectedConditions.includes(album.condition)) return false;

    // Price range filter
    if (album.price < priceRange[0] || album.price > priceRange[1]) return false;

    // Decade filter
    if (selectedDecades.length > 0) {
      const decade = `${Math.floor(album.year / 10) * 10}s`;
      if (!selectedDecades.includes(decade)) return false;
    }

    return true;
  });

  const handleAlbumClick = (album: any) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {filteredAlbums.map((album, index) => (
          <AlbumCard 
            key={`${album.title}-${album.artist}-${index}`} 
            {...album} 
            onClick={() => handleAlbumClick(album)}
          />
        ))}
      </div>
      
      {filteredAlbums.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No albums match your current filters</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria</p>
        </div>
      )}
      
      <AlbumInfoModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        album={selectedAlbum}
      />
    </>
  );
};

export default AlbumGrid;
