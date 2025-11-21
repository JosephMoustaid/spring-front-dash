import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import FilterSidebar from "@/components/FilterSidebar";
import heroImage from "@/assets/hero-restaurant.jpg";
import { ChefHat } from "lucide-react";

const Index = () => {
  // Mock data - will be replaced with API calls to Spring Boot backend
  const mockRestaurants = [
    {
      id: 1,
      name: "Le Jardin Secret",
      cuisine: "Française Moderne",
      rating: 4.5,
      reviewCount: 124,
      distance: "1.2 km",
      priceRange: "€€€",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      isOpen: true,
    },
    {
      id: 2,
      name: "Sushi Zen",
      cuisine: "Japonaise",
      rating: 4.8,
      reviewCount: 89,
      distance: "0.8 km",
      priceRange: "€€€€",
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
      isOpen: true,
    },
    {
      id: 3,
      name: "La Trattoria",
      cuisine: "Italienne",
      rating: 4.3,
      reviewCount: 156,
      distance: "2.1 km",
      priceRange: "€€",
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      isOpen: false,
    },
    {
      id: 4,
      name: "Tajine d'Or",
      cuisine: "Marocaine",
      rating: 4.6,
      reviewCount: 98,
      distance: "1.5 km",
      priceRange: "€€",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      isOpen: true,
    },
    {
      id: 5,
      name: "El Mariachi",
      cuisine: "Mexicaine",
      rating: 4.4,
      reviewCount: 112,
      distance: "3.2 km",
      priceRange: "€€",
      imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
      isOpen: true,
    },
    {
      id: 6,
      name: "Bombay Palace",
      cuisine: "Indienne",
      rating: 4.7,
      reviewCount: 145,
      distance: "1.8 km",
      priceRange: "€€€",
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
      isOpen: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">ReserveTable</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Découvrir
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Mes Réservations
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium">
              Connexion
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Restaurant ambiance"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              Découvrez les meilleurs restaurants
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Réservez votre table dans les restaurants près de chez vous
            </p>
          </div>
          <SearchBar onSearch={() => {}} />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Restaurant Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {mockRestaurants.length} restaurants trouvés
              </h2>
              <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Plus populaires</option>
                <option>Mieux notés</option>
                <option>Plus proches</option>
                <option>Prix croissant</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
