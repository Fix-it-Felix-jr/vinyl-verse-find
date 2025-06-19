
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AlbumGrid from "@/components/AlbumGrid";
import PlayerBar from "@/components/PlayerBar";
import FeaturedSection from "@/components/FeaturedSection";
import FloatingButtons from "@/components/FloatingButtons";
import ChatSystem from "@/components/ChatSystem";
import OnboardingTutorial from "@/components/OnboardingTutorial";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <FeaturedSection />
          <AlbumGrid searchQuery={searchQuery} />
        </main>
      </div>
      
      <PlayerBar />
      <FloatingButtons />
      <ChatSystem />
      <OnboardingTutorial />
    </div>
  );
};

export default Index;
