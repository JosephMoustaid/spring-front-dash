import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Phone, MapPin, Calendar, Heart, LogOut, Edit2, Save, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  avatar?: string;
}

interface Reservation {
  id: number;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled";
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: localStorage.getItem("userEmail") || "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, New York, NY 10001",
    joinDate: "January 2024",
    avatar: "",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  // Mock data - replace with actual API calls
  const [reservations] = useState<Reservation[]>([
    {
      id: 1,
      restaurantName: "The Golden Spoon",
      date: "2024-12-01",
      time: "19:00",
      guests: 4,
      status: "confirmed",
    },
    {
      id: 2,
      restaurantName: "Ocean's Breeze",
      date: "2024-12-15",
      time: "20:00",
      guests: 2,
      status: "pending",
    },
  ]);

  const [favorites] = useState([
    { id: 1, name: "The Golden Spoon", cuisine: "French", rating: 4.8 },
    { id: 2, name: "Sushi Master", cuisine: "Japanese", rating: 4.9 },
    { id: 3, name: "Bella Italia", cuisine: "Italian", rating: 4.7 },
  ]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Replace with actual API call
      // await fetch('http://localhost:8080/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(editedProfile)
      // });

      await new Promise(resolve => setTimeout(resolve, 500));
      setProfile(editedProfile);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/signin");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" className="gap-2">
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleCancel} variant="outline" size="sm" className="gap-2">
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button onClick={handleSave} size="sm" className="gap-2" disabled={isSaving}>
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">Member since {profile.joinDate}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={isEditing ? editedProfile.name : profile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedProfile.email : profile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedProfile.phone : profile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={isEditing ? editedProfile.address : profile.address}
                      onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>My Reservations</CardTitle>
                <CardDescription>View and manage your restaurant bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.length === 0 ? (
                    <Alert>
                      <Calendar className="h-4 w-4" />
                      <AlertDescription>
                        You don't have any reservations yet. Start exploring restaurants!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    reservations.map((reservation) => (
                      <Card key={reservation.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg">{reservation.restaurantName}</h4>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(reservation.date).toLocaleDateString()}
                                </span>
                                <span>Time: {reservation.time}</span>
                                <span>Guests: {reservation.guests}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(reservation.status)}>
                              {reservation.status}
                            </Badge>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            {reservation.status !== "cancelled" && (
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                Cancel
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Restaurants</CardTitle>
                <CardDescription>Your saved restaurants for quick access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favorites.length === 0 ? (
                    <Alert>
                      <Heart className="h-4 w-4" />
                      <AlertDescription>
                        You haven't added any favorites yet. Click the heart icon on restaurants to save them!
                      </AlertDescription>
                    </Alert>
                  ) : (
                    favorites.map((restaurant) => (
                      <Card key={restaurant.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-lg">{restaurant.name}</h4>
                              <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span className="font-medium">{restaurant.rating}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                              >
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Heart className="h-4 w-4 fill-current" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
