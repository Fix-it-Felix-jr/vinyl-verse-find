import { useState, useEffect } from "react";
import { ArrowLeft, Upload, X, Check, ChevronRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const SellAlbum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    genre: "",
    format: "",
    condition: "",
    price: "",
    description: "",
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(false);

  const steps = [
    { id: 1, title: "Album Details", description: "Basic information about your album" },
    { id: 2, title: "Condition & Pricing", description: "Set condition and price" },
    { id: 3, title: "Photos & Description", description: "Add images and details" },
    { id: 4, title: "Review & Publish", description: "Final review before listing" }
  ];

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('albumDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setFormData(draft.formData);
      setCurrentStep(draft.currentStep);
      setImagePreview(draft.imagePreview);
      setIsDraft(true);
      
      toast({
        title: "Draft Loaded",
        description: "Your previous draft has been loaded.",
      });
    }
  }, []);

  const saveDraft = () => {
    const draft = {
      formData,
      currentStep,
      imagePreview,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('albumDraft', JSON.stringify(draft));
    setIsDraft(true);
    
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved. You can continue later.",
    });
  };

  const clearDraft = () => {
    localStorage.removeItem('albumDraft');
    setIsDraft(false);
    
    // Reset form data
    setFormData({
      title: "",
      artist: "",
      year: "",
      genre: "",
      format: "",
      condition: "",
      price: "",
      description: "",
      image: null
    });
    setImagePreview(null);
    setCurrentStep(1);
    
    toast({
      title: "Draft Discarded",
      description: "Your draft has been removed and the form has been reset.",
    });
  };

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

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.artist && formData.format;
      case 2:
        return formData.condition && formData.price;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.artist || !formData.price || !formData.condition || !formData.format) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newAlbum = {
      title: formData.title,
      artist: formData.artist,
      price: parseInt(formData.price),
      condition: formData.condition,
      format: formData.format,
      year: parseInt(formData.year) || 2024,
      rating: 4,
      imageUrl: imagePreview || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      isPremium: false,
      isAuction: false,
      genre: formData.genre || "Unknown"
    };

    const existingAlbums = JSON.parse(localStorage.getItem('userAlbums') || '[]');
    existingAlbums.push(newAlbum);
    localStorage.setItem('userAlbums', JSON.stringify(existingAlbums));

    clearDraft();

    toast({
      title: "Album Listed Successfully!",
      description: "Your album has been added to the marketplace.",
    });

    navigate('/');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Tell us about your album</h3>
              <p className="text-slate-400 mb-6">Start with the basic information about the album you want to sell.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Album Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="e.g., The Dark Side of the Moon"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="artist" className="text-white">Artist *</Label>
                <Input
                  id="artist"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="e.g., Pink Floyd"
                  required
                />
              </div>

              <div>
                <Label className="text-white">Format *</Label>
                <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vinyl">Vinyl</SelectItem>
                    <SelectItem value="CD">CD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="year" className="text-white">Release Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                    placeholder="1973"
                  />
                </div>
                <div>
                  <Label htmlFor="genre" className="text-white">Genre</Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                    placeholder="Rock"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Condition & Pricing</h3>
              <p className="text-slate-400 mb-6">Help buyers understand the condition and set your price.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-white">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                    <SelectValue placeholder="Select the condition of your album" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Perfect">Perfect - Like brand new</SelectItem>
                    <SelectItem value="Like New">Like New - Excellent with minimal wear</SelectItem>
                    <SelectItem value="Very Good">Very Good - Some visible wear</SelectItem>
                    <SelectItem value="Good">Good - Noticeable wear but playable</SelectItem>
                    <SelectItem value="Fair">Fair - Significant wear</SelectItem>
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
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="Enter your asking price"
                  required
                />
                <p className="text-slate-500 text-sm mt-1">Research similar albums to set a competitive price</p>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Photos & Description</h3>
              <p className="text-slate-400 mb-6">Add photos and additional details to attract buyers.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-white">Album Cover Photo</Label>
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
              
              <div>
                <Label htmlFor="description" className="text-white">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="Describe any special features, pressing details, or condition notes..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Review Your Listing</h3>
              <p className="text-slate-400 mb-6">Double-check all details before publishing your album.</p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-4">
                {imagePreview && (
                  <img src={imagePreview} alt="Album cover" className="w-20 h-20 object-cover rounded" />
                )}
                <div>
                  <h4 className="text-white font-semibold">{formData.title}</h4>
                  <p className="text-slate-300">{formData.artist}</p>
                  {formData.year && <p className="text-slate-400 text-sm">{formData.year}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Format:</span>
                  <span className="text-white ml-2">{formData.format}</span>
                </div>
                <div>
                  <span className="text-slate-400">Condition:</span>
                  <span className="text-white ml-2">{formData.condition}</span>
                </div>
                <div>
                  <span className="text-slate-400">Price:</span>
                  <span className="text-green-400 ml-2 font-semibold">${formData.price}</span>
                </div>
                {formData.genre && (
                  <div>
                    <span className="text-slate-400">Genre:</span>
                    <span className="text-white ml-2">{formData.genre}</span>
                  </div>
                )}
              </div>
              
              {formData.description && (
                <div>
                  <p className="text-slate-400 text-sm mb-2">Description:</p>
                  <p className="text-slate-300 text-sm">{formData.description}</p>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Collection
            </Button>
            {isDraft && (
              <Badge className="bg-blue-600 text-white">Draft Loaded</Badge>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={saveDraft}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            
            {isDraft && (
              <Button 
                variant="outline" 
                onClick={clearDraft}
                className="border-red-600 text-red-400 hover:bg-red-900/20"
              >
                Discard Draft
              </Button>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > step.id 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : currentStep === step.id 
                        ? 'border-purple-500 text-purple-500' 
                        : 'border-slate-600 text-slate-400'
                  }`}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-white' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-slate-600 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700 p-6">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-slate-600 text-slate-200 hover:bg-slate-700"
              >
                Previous
              </Button>
              
              <div className="flex space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="border-slate-600 text-slate-200 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                
                {currentStep === 4 ? (
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!validateStep(currentStep)}
                  >
                    Publish Album
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Next Step
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SellAlbum;
