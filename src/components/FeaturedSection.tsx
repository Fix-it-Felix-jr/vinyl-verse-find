
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
  const navigate = useNavigate();

  const handleDiscoverAlbums = () => {
    navigate('/artist/Arctic Echoes');
  };

  const handleGetTickets = () => {
    window.open('https://www.ticketmaster.com/pink-floyd-experience-tickets/artist/12345', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Featured Artist */}
        <div className="flex-1">
          <Badge className="bg-purple-500 text-white mb-4">Featured Artist</Badge>
          <div className="flex items-start space-x-4">
            <img 
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=120&fit=crop" 
              alt="Featured Artist"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Arctic Echoes</h3>
              <p className="text-slate-300 text-sm mb-3">
                Emerging indie rock band from Portland. Their debut album "Frozen Waves" 
                captures raw emotion with ethereal soundscapes.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                onClick={handleDiscoverAlbums}
              >
                Discover Albums
              </Button>
            </div>
          </div>
        </div>

        {/* Upcoming Concert */}
        <div className="flex-1 border-l border-slate-700 pl-6">
          <Badge className="bg-blue-500 text-white mb-4">Upcoming Concert</Badge>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Pink Floyd Experience</h4>
            <div className="flex items-center space-x-2 text-slate-300 text-sm">
              <Calendar className="h-4 w-4" />
              <span>March 15, 2024 • 8:00 PM</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300 text-sm">
              <MapPin className="h-4 w-4" />
              <span>Madison Square Garden, NYC</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              onClick={handleGetTickets}
            >
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
