import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3 bg-card p-4 rounded-2xl shadow-elegant border border-border/50">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un restaurant, cuisine..."
            className="pl-10 h-12 border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Localisation"
            className="pl-10 h-12 border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <Button className="h-12 px-8 bg-gradient-primary hover:opacity-90 transition-opacity">
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
