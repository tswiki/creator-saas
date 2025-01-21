"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/v0/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/v0/ui/popover";
import { Button } from "@/components/v0/ui/button";
import { Input } from "@/components/v0/ui/input";
import { Textarea } from "@/components/v0/ui/textarea";
import { Camera, Globe, MapPin, Mail, User, X } from "lucide-react";

interface ProfileProps {
  onClose?: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const [profile, setProfile] = useState({
    name: "",
    email: "", 
    bio: "",
    location: "",
    website: "",
    avatar: "/images/default-avatar.png",
    theme: "light",
    notifications: true,
    visibility: "public"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showThemePopover, setShowThemePopover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching profile data
    setTimeout(() => {
      setProfile({
        name: "John Doe",
        email: "john@example.com", 
        bio: "Frontend developer passionate about creating great user experiences",
        location: "San Francisco, CA",
        website: "https://johndoe.com",
        avatar: "/images/default-avatar.png",
        theme: "light",
        notifications: true,
        visibility: "public"
      });
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (theme: string) => {
    setProfile(prev => ({
      ...prev,
      theme
    }));
    setShowThemePopover(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      setIsModalOpen(false);
      if (onClose) onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button onClick={() => setIsEditing(true)} variant="default">
                  Edit Profile
                </Button>
                {onClose && (
                  <Button onClick={onClose} variant="outline">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </>
            ) : null}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <input 
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>

              {isEditing && (
                <div className="space-y-2">
                  <Popover open={showThemePopover} onOpenChange={setShowThemePopover}>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Customize Theme</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="space-y-2">
                        <button
                          className="w-full p-2 text-left hover:bg-gray-100 rounded"
                          onClick={() => handleThemeChange('light')}
                        >
                          Light Theme
                        </button>
                        <button
                          className="w-full p-2 text-left hover:bg-gray-100 rounded"
                          onClick={() => handleThemeChange('dark')}
                        >
                          Dark Theme
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <User className="w-4 h-4 inline mr-2" />
                  Name
                </label>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <Input
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Website
                </label>
                <Input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    if (onClose) onClose();
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
