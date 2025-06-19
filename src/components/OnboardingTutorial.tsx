
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ShoppingCart, Plus, Search, X } from "lucide-react";

const OnboardingTutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const completeTutorial = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsOpen(false);
  };

  const skipTutorial = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsOpen(false);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const tutorialSteps = [
    {
      title: "Welcome to RetroSpin! 🎵",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">RS</span>
          </div>
          <p className="text-slate-300">
            Your ultimate destination for buying and selling vinyl records and CDs. 
            Let's show you around!
          </p>
        </div>
      )
    },
    {
      title: "Discover Amazing Albums 🔍",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded-lg flex items-center space-x-3">
            <Search className="h-8 w-8 text-purple-400" />
            <div>
              <h4 className="text-white font-semibold">Search & Filter</h4>
              <p className="text-slate-300 text-sm">
                Use the search bar and filters to find exactly what you're looking for
              </p>
            </div>
          </div>
          <p className="text-slate-300">
            Browse thousands of albums from verified sellers. Filter by genre, condition, 
            price range, and more to find your perfect match.
          </p>
        </div>
      )
    },
    {
      title: "Buy with Confidence 💳",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded-lg flex items-center space-x-3">
            <ShoppingCart className="h-8 w-8 text-green-400" />
            <div>
              <h4 className="text-white font-semibold">Secure Purchasing</h4>
              <p className="text-slate-300 text-sm">
                Buy now or place bids on auction items
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-yellow-500/20 p-3 rounded border border-yellow-500/30">
              <strong className="text-yellow-400">Premium Albums</strong>
              <p className="text-slate-300">High-quality, rare collectibles</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded border border-green-500/30">
              <strong className="text-green-400">Flea Market</strong>
              <p className="text-slate-300">Budget-friendly finds under $50</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Sell Your Collection 💰",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-700 p-4 rounded-lg flex items-center space-x-3">
            <Plus className="h-8 w-8 text-blue-400" />
            <div>
              <h4 className="text-white font-semibold">Easy Listing Process</h4>
              <p className="text-slate-300 text-sm">
                List your albums in just 4 simple steps
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <span className="text-slate-300">Album Details</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <span className="text-slate-300">Condition & Pricing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              <span className="text-slate-300">Photos & Description</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
              <span className="text-slate-300">Review & Publish</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            💡 Tip: You can save drafts and come back later to complete your listing!
          </p>
        </div>
      )
    },
    {
      title: "You're All Set! 🎉",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl">🎵</div>
          <p className="text-slate-300">
            You're ready to start your vinyl journey! Explore the marketplace, 
            connect with other music lovers, and build your perfect collection.
          </p>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-sm text-slate-400">
              Need help? Look for the AI assist button in the bottom right corner 
              for instant support and recommendations.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400">
              {currentStep + 1} of {tutorialSteps.length}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={skipTutorial}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-slate-750 border-slate-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {tutorialSteps[currentStep].title}
          </h2>
          {tutorialSteps[currentStep].content}
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              onClick={skipTutorial}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              Skip Tutorial
            </Button>
            <Button 
              onClick={nextStep}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < tutorialSteps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;
