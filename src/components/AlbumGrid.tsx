
import AlbumCard from "./AlbumCard";

const AlbumGrid = () => {
  const albums = [
    {
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      price: 89,
      condition: "Near Mint",
      year: 1973,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPremium: true
    },
    {
      title: "Led Zeppelin IV",
      artist: "Led Zeppelin",
      price: 45,
      condition: "Very Good",
      year: 1971,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop"
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
      bids: 12
    },
    {
      title: "Abbey Road",
      artist: "The Beatles",
      price: 120,
      condition: "Mint",
      year: 1969,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPremium: true
    },
    {
      title: "Back in Black",
      artist: "AC/DC",
      price: 35,
      condition: "Very Good",
      year: 1980,
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop"
    },
    {
      title: "The Wall",
      artist: "Pink Floyd",
      price: 55,
      condition: "Near Mint",
      year: 1979,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop"
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
      bids: 8
    },
    {
      title: "Rumours",
      artist: "Fleetwood Mac",
      price: 75,
      condition: "Near Mint",
      year: 1977,
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
      isPremium: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {albums.map((album, index) => (
        <AlbumCard key={index} {...album} />
      ))}
    </div>
  );
};

export default AlbumGrid;
