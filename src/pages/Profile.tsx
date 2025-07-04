import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Heart, ShoppingBag, Star, Calendar, Gavel, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import EditProfile from "@/components/EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'collection' | 'wishlist' | 'selling' | 'auctions'>(
    (tabParam as any) || 'collection'
  );
  const [userListedAlbums, setUserListedAlbums] = useState<any[]>([]);
  const [userBids, setUserBids] = useState<any[]>([]);
  const [userCollection, setUserCollection] = useState<any[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    bio: "Vinyl enthusiast since 2020",
    avatar: ""
  });

  // Load profile data on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    
    const userAlbums = JSON.parse(localStorage.getItem('userAlbums') || '[]');
    setUserListedAlbums(userAlbums);
    
    const bids = JSON.parse(localStorage.getItem('userBids') || '[]');
    setUserBids(bids);

    const collection = JSON.parse(localStorage.getItem('userCollection') || '[]');
    setUserCollection(collection);
  }, []);

  const handleSaveProfile = (newData: any) => {
    setProfileData(newData);
    // Save to localStorage or send to backend
    localStorage.setItem('userProfile', JSON.stringify(newData));
  };

  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

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
            Back to Collection
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="bg-slate-800 border-slate-700 p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{profileData.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{profileData.name}</h1>
              <p className="text-slate-400 mb-4">{profileData.bio}</p>
              <div className="flex items-center space-x-4 text-sm text-slate-300">
                <div className="flex items-center space-x-1">
                  <ShoppingBag className="h-4 w-4" />
                  <span>{userCollection.length} Albums Owned</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{wishlist.length} Wishlist Items</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>4.8 Seller Rating</span>
                </div>
              </div>
            </div>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'collection', label: 'My Collection' },
            { id: 'wishlist', label: 'Wishlist' },
            { id: 'selling', label: 'Currently Selling' },
            { id: 'auctions', label: 'My Bids' }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id as any)}
              className={activeTab === tab.id ? 'bg-purple-600 hover:bg-purple-700' : 'text-slate-400 hover:text-white hover:bg-slate-700'}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'collection' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCollection.map((album, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 overflow-hidden">
                <img src={album.imageUrl} alt={album.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-white">{album.title}</h3>
                  <p className="text-slate-400 text-sm">{album.artist}</p>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                      {album.condition}
                    </Badge>
                    <span className="text-green-400 font-semibold">${album.price}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-400 mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    Purchased {new Date(album.purchaseDate).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
            {userCollection.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-400">No albums in your collection yet</p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/')}>
                  Browse Albums
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((album: any, index: number) => (
              <Card key={index} className="bg-slate-800 border-slate-700 overflow-hidden">
                <img src={album.imageUrl} alt={album.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-white">{album.title}</h3>
                  <p className="text-slate-400 text-sm">{album.artist}</p>
                  <div className="mt-2">
                    <span className="text-yellow-400 font-semibold">Target: ${album.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'selling' && (
          <div>
            {userListedAlbums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListedAlbums.map((album, index) => (
                  <Card key={index} className="bg-slate-800 border-slate-700 overflow-hidden">
                    <img src={album.imageUrl} alt={album.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-white">{album.title}</h3>
                      <p className="text-slate-400 text-sm">{album.artist}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {album.condition}
                        </Badge>
                        <span className="text-green-400 font-semibold">${album.price}</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-400 mt-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        Listed {album.year && `• ${album.year}`}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No albums currently listed for sale</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => navigate('/sell')}>
                  Start Selling
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'auctions' && (
          <div>
            {userBids.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBids.map((bid, index) => (
                  <Card key={index} className="bg-slate-800 border-slate-700 overflow-hidden">
                    <img src={bid.albumImageUrl} alt={bid.albumTitle} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-white">{bid.albumTitle}</h3>
                      <p className="text-slate-400 text-sm">{bid.albumArtist}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-400">Your Bid</span>
                          <span className="text-green-400 font-semibold">${bid.bidAmount}</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-xs text-slate-400">Current Price</span>
                          <span className="text-white font-semibold">${bid.currentPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <Badge 
                          variant="outline" 
                          className={`text-xs border-slate-600 ${
                            bid.status === 'active' ? 'text-green-300 border-green-500' : 
                            bid.status === 'won' ? 'text-blue-300 border-blue-500' : 
                            'text-red-300 border-red-500'
                          }`}
                        >
                          <Gavel className="h-3 w-3 mr-1" />
                          {bid.status === 'active' ? 'Active' : bid.status === 'won' ? 'Won' : 'Lost'}
                        </Badge>
                        <div className="flex items-center text-xs text-slate-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(bid.bidDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Gavel className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 mb-2">No active bids</p>
                <p className="text-slate-500 text-sm">Start bidding on auction items to see them here</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => navigate('/')}>
                  Browse Auctions
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <EditProfile
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />
    </div>
  );
};

export default Profile;
