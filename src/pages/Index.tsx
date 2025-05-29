
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AlbumGrid from "@/components/AlbumGrid";
import PlayerBar from "@/components/PlayerBar";
import FloatingButtons from "@/components/FloatingButtons";
import FeaturedSection from "@/components/FeaturedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 pb-24">
          <div className="p-6">
            <FeaturedSection />
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Discover Albums</h2>
              <p className="text-slate-400">Find your next favorite record from our curated collection</p>
            </div>
            
            <AlbumGrid />
          </div>
        </main>
      </div>
      
      <PlayerBar />
      <FloatingButtons />
    </div>
  );
};

export default Index;
