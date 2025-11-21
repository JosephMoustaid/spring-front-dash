import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const FilterSidebar = () => {
  const cuisineTypes = [
    "Française",
    "Italienne",
    "Japonaise",
    "Marocaine",
    "Mexicaine",
    "Indienne",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filtres</h3>
      </div>

      <Separator />

      <div>
        <Label className="text-base font-medium mb-4 block">Distance</Label>
        <Slider defaultValue={[5]} max={20} step={1} className="mb-2" />
        <p className="text-sm text-muted-foreground">Jusqu'à 5 km</p>
      </div>

      <Separator />

      <div>
        <Label className="text-base font-medium mb-4 block">Note minimum</Label>
        <Slider defaultValue={[3]} max={5} step={0.5} className="mb-2" />
        <p className="text-sm text-muted-foreground">3.0 étoiles et plus</p>
      </div>

      <Separator />

      <div>
        <Label className="text-base font-medium mb-4 block">Cuisine</Label>
        <div className="space-y-3">
          {cuisineTypes.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox id={cuisine} />
              <label
                htmlFor={cuisine}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {cuisine}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <Label className="text-base font-medium mb-4 block">Prix</Label>
        <div className="space-y-3">
          {["€", "€€", "€€€", "€€€€"].map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox id={price} />
              <label
                htmlFor={price}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {price}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
