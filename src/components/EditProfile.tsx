
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Upload } from "lucide-react";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: {
    name: string;
    bio: string;
    avatar: string;
  };
}

const EditProfile = ({ isOpen, onClose, onSave, initialData }: EditProfileProps) => {
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-slate-800 border-slate-700 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                {formData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Upload className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </div>

          <div>
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white mt-1"
            />
          </div>

          <div>
            <Label htmlFor="bio" className="text-white">Bio</Label>
            <Input
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white mt-1"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
