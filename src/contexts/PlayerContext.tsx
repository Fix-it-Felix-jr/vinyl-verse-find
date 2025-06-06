
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Album {
  title: string;
  artist: string;
  imageUrl: string;
}

interface PlayerContextType {
  currentAlbum: Album | null;
  setCurrentAlbum: (album: Album) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>({
    title: "Comfortably Numb",
    artist: "Pink Floyd",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
  });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayerContext.Provider value={{
      currentAlbum,
      setCurrentAlbum,
      isPlaying,
      setIsPlaying
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
