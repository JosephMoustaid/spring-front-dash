import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  distance: string;
  priceRange: string;
  imageUrl: string;
  isOpen: boolean;
}

const RestaurantCard = ({
  id,
  name,
  cuisine,
  rating,
  reviewCount,
  distance,
  priceRange,
  imageUrl,
  isOpen,
}: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group overflow-hidden border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={isOpen ? "default" : "secondary"} className="bg-background/90 backdrop-blur-sm">
            {isOpen ? "Ouvert" : "Fermé"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span className="text-sm font-medium text-muted-foreground">{priceRange}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{cuisine}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium text-foreground">{rating}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
        </div>
        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
          Réserver
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
