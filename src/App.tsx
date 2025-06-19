
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FilterProvider } from "@/contexts/FilterContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import SellAlbum from "./pages/SellAlbum";
import Profile from "./pages/Profile";
import SellerProfile from "./pages/SellerProfile";
import ArtistAlbums from "./pages/ArtistAlbums";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <FilterProvider>
        <PlayerProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sell" element={<SellAlbum />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seller/:sellerId" element={<SellerProfile />} />
                <Route path="/artist/:artistId" element={<ArtistAlbums />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </CartProvider>
        </PlayerProvider>
      </FilterProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
