
import { Music, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConcertsSectionProps {
  artist: string;
}

const ConcertsSection = ({ artist }: ConcertsSectionProps) => {
  // Mock concert data - in a real app this would come from an API
  const suggestedConcerts = [
    {
      artist: artist,
      venue: "Madison Square Garden",
      date: "2024-07-15",
      city: "New York, NY",
      price: 89
    },
    {
      artist: artist,
      venue: "The Forum",
      date: "2024-08-22",
      city: "Los Angeles, CA", 
      price: 75
    },
    {
      artist: artist,
      venue: "Royal Albert Hall",
      date: "2024-09-10",
      city: "London, UK",
      price: 120
    }
  ];

  return (
    <div className="mt-6 pt-6 border-t border-slate-700">
      <div className="flex items-center space-x-2 mb-4">
        <Music className="h-5 w-5 text-purple-400" />
        <h4 className="text-lg font-semibold text-white">Upcoming {artist} Concerts</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestedConcerts.map((concert, index) => (
          <Card key={index} className="bg-slate-700 border-slate-600 p-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-white">{concert.venue}</h5>
              <p className="text-slate-300 text-sm">{concert.city}</p>
              <div className="flex items-center space-x-1 text-slate-400 text-xs">
                <Calendar className="h-3 w-3" />
                <span>{new Date(concert.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-green-400 font-semibold">${concert.price}</span>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                  Get Tickets
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConcertsSection;
