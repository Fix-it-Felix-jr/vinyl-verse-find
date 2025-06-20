
import { Info, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";

const ImageUploadGuidance = () => {
  return (
    <Card className="bg-slate-700 border-slate-600 p-4 mb-4">
      <div className="flex items-start space-x-3">
        <Camera className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Info className="h-4 w-4 mr-1" />
            Image Guidelines
          </h4>
          <div className="text-sm text-slate-300 space-y-1">
            <p><strong>Aspect Ratio:</strong> Square (1:1) or 4:3 ratio recommended</p>
            <p><strong>Resolution:</strong> Minimum 500x500px, prefer 1000x1000px or higher</p>
            <p><strong>Format:</strong> JPG, PNG, or WebP</p>
            <p><strong>Quality:</strong> Clear, well-lit photos showing album condition</p>
            <p><strong>Tips:</strong> Include front cover, back cover, and any visible wear</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImageUploadGuidance;
