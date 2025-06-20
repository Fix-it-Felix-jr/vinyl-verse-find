
import { ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PurchasedAlbumsShortcut = () => {
  const navigate = useNavigate();
  const userCollection = JSON.parse(localStorage.getItem('userCollection') || '[]');

  if (userCollection.length === 0) return null;

  return (
    <Card className="bg-slate-800 border-slate-700 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShoppingBag className="h-5 w-5 text-green-400" />
          <div>
            <h3 className="text-white font-semibold">Your Collection</h3>
            <p className="text-slate-400 text-sm">
              {userCollection.length} album{userCollection.length !== 1 ? 's' : ''} purchased
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/profile?tab=collection')}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Collection
        </Button>
      </div>
    </Card>
  );
};

export default PurchasedAlbumsShortcut;
