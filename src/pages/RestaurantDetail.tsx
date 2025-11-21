import { useParams } from "react-router-dom";
import { Star, MapPin, Clock, Phone, DollarSign, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const RestaurantDetail = () => {
  const { id } = useParams();

  // Mock data - will be replaced with API call to Spring Boot backend
  const restaurant = {
    id: 1,
    name: "Le Jardin Secret",
    cuisine: "Française Moderne",
    rating: 4.5,
    reviewCount: 124,
    address: "42 Rue de la Paix, 75008 Paris",
    phone: "+33 1 42 60 38 14",
    priceRange: "€€€",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    isOpen: true,
    openingHours: {
      lunch: "12:00 - 14:30",
      dinner: "19:00 - 22:30",
    },
    description:
      "Le Jardin Secret vous propose une cuisine française moderne dans un cadre élégant et raffiné. Notre chef étoilé sublime les produits de saison pour créer des plats d'exception.",
    amenities: ["Terrasse", "Menu végétarien", "Parking", "Accès handicapé"],
    reviews: [
      {
        id: 1,
        author: "Marie D.",
        rating: 5,
        date: "Il y a 2 jours",
        comment: "Excellente expérience ! Les plats sont délicieux et le service impeccable.",
      },
      {
        id: 2,
        author: "Jean P.",
        rating: 4,
        date: "Il y a 1 semaine",
        comment: "Très bon restaurant, le cadre est magnifique. Je recommande !",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">ReserveTable</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="shadow-elegant border-border/50">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {restaurant.name}
                    </h1>
                    <p className="text-xl text-muted-foreground">{restaurant.cuisine}</p>
                  </div>
                  <Badge variant={restaurant.isOpen ? "default" : "secondary"}>
                    {restaurant.isOpen ? "Ouvert" : "Fermé"}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold text-lg">{restaurant.rating}</span>
                    <span className="text-muted-foreground">({restaurant.reviewCount} avis)</span>
                  </div>
                  <span className="text-lg font-medium">{restaurant.priceRange}</span>
                </div>

                <Separator className="my-6" />

                <p className="text-foreground leading-relaxed mb-6">{restaurant.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-muted-foreground">{restaurant.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-muted-foreground">{restaurant.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-muted-foreground">
                        Déjeuner: {restaurant.openingHours.lunch}
                      </p>
                      <p className="text-muted-foreground">
                        Dîner: {restaurant.openingHours.dinner}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-medium mb-2">Équipements</p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Reviews */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Avis clients</h3>
                  <div className="space-y-4">
                    {restaurant.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-semibold">
                                {review.author.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{review.author}</p>
                                <p className="text-sm text-muted-foreground">{review.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-foreground">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reservation Card */}
              <div className="lg:w-96">
                <Card className="sticky top-24 shadow-elegant">
                  <CardHeader>
                    <CardTitle>Réserver une table</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Heure</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>12:00</option>
                        <option>12:30</option>
                        <option>13:00</option>
                        <option>13:30</option>
                        <option>19:00</option>
                        <option>19:30</option>
                        <option>20:00</option>
                        <option>20:30</option>
                        <option>21:00</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre de personnes</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>1 personne</option>
                        <option>2 personnes</option>
                        <option>3 personnes</option>
                        <option>4 personnes</option>
                        <option>5 personnes</option>
                        <option>6+ personnes</option>
                      </select>
                    </div>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity h-12">
                      Confirmer la réservation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantDetail;
