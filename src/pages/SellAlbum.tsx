
import { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const SellAlbum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    genre: "",
    condition: "",
    price: "",
    description: "",
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.artist || !formData.price || !formData.condition) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new album object
    const newAlbum = {
      title: formData.title,
      artist: formData.artist,
      price: parseInt(formData.price),
      condition: formData.condition,
      year: parseInt(formData.year) || 2024,
      rating: 4,
      imageUrl: imagePreview || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPremium: false,
      isAuction: false
    };

    // Store in localStorage for demo purposes
    const existingAlbums = JSON.parse(localStorage.getItem('userAlbums') || '[]');
    existingAlbums.push(newAlbum);
    localStorage.setItem('userAlbums', JSON.stringify(existingAlbums));

    toast({
      title: "Album Listed Successfully!",
      description: "Your album has been added to the marketplace.",
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
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

        <Card className="bg-slate-800 border-slate-700 p-6">
          <h1 className="text-2xl font-bold text-white mb-6">Sell Your Album</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <Label className="text-white">Album Cover</Label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative w-48 h-48 mx-auto">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-purple-400 hover:text-purple-300">Upload album cover</span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                    <p className="text-slate-400 text-sm mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-white">Album Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter album title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="artist" className="text-white">Artist *</Label>
                <Input
                  id="artist"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter artist name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year" className="text-white">Release Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g. 1973"
                />
              </div>
              <div>
                <Label htmlFor="genre" className="text-white">Genre</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g. Rock, Jazz, Blues"
                />
              </div>
            </div>

            {/* Condition and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Condition *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mint">Mint</SelectItem>
                    <SelectItem value="Near Mint">Near Mint</SelectItem>
                    <SelectItem value="Very Good">Very Good</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price" className="text-white">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Describe the album condition, any special features, etc."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                List Album for Sale
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SellAlbum;
