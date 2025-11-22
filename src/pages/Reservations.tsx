import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, MapPin, Phone, Mail, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface Reservation {
  id: number;
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone: string;
  date: string;
  time: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  specialRequests?: string;
}

const Reservations = () => {
  const navigate = useNavigate();
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Mock data - replace with actual API calls
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      restaurantName: "The Golden Spoon",
      restaurantAddress: "123 Main St, New York, NY 10001",
      restaurantPhone: "+1 234 567 8900",
      date: "2024-12-01",
      time: "19:00",
      guests: 4,
      status: "confirmed",
      specialRequests: "Window seat preferred",
    },
    {
      id: 2,
      restaurantName: "Ocean's Breeze",
      restaurantAddress: "456 Beach Ave, Miami, FL 33139",
      restaurantPhone: "+1 305 555 0123",
      date: "2024-12-15",
      time: "20:00",
      guests: 2,
      status: "pending",
    },
    {
      id: 3,
      restaurantName: "Bella Italia",
      restaurantAddress: "789 Italian Way, Boston, MA 02108",
      restaurantPhone: "+1 617 555 0456",
      date: "2024-11-15",
      time: "18:30",
      guests: 6,
      status: "completed",
    },
    {
      id: 4,
      restaurantName: "Sushi Master",
      restaurantAddress: "321 Tokyo St, San Francisco, CA 94102",
      restaurantPhone: "+1 415 555 0789",
      date: "2024-11-10",
      time: "19:30",
      guests: 3,
      status: "cancelled",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCancelReservation = async () => {
    if (!selectedReservation) return;
    
    setIsCancelling(true);
    try {
      // TODO: Replace with actual API call
      // await fetch(`http://localhost:8080/api/reservations/${selectedReservation.id}/cancel`, {
      //   method: 'POST',
      //   headers: { 
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });

      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReservations(reservations.map(r => 
        r.id === selectedReservation.id 
          ? { ...r, status: "cancelled" as const }
          : r
      ));
      
      toast({
        title: "Reservation Cancelled",
        description: "Your reservation has been cancelled successfully.",
      });
      
      setShowCancelDialog(false);
      setSelectedReservation(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const filterReservations = (status: string) => {
    if (status === "all") return reservations;
    if (status === "upcoming") {
      return reservations.filter(r => 
        r.status === "confirmed" || r.status === "pending"
      );
    }
    if (status === "past") {
      return reservations.filter(r => 
        r.status === "completed" || r.status === "cancelled"
      );
    }
    return reservations.filter(r => r.status === status);
  };

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{reservation.restaurantName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {reservation.restaurantAddress}
              </div>
            </div>
            <Badge className={getStatusColor(reservation.status)}>
              {reservation.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(reservation.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{reservation.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{reservation.restaurantPhone}</span>
            </div>
          </div>

          {reservation.specialRequests && (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Special Requests:</strong> {reservation.specialRequests}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/restaurant/${reservation.id}`)}
            >
              View Restaurant
            </Button>
            {(reservation.status === "confirmed" || reservation.status === "pending") && (
              <>
                <Button variant="outline" size="sm">
                  Modify
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    setSelectedReservation(reservation);
                    setShowCancelDialog(true);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
            {reservation.status === "completed" && (
              <Button variant="outline" size="sm">
                Write Review
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">My Reservations</h1>
            <p className="text-muted-foreground">Manage your restaurant bookings</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterReservations("all").length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reservations found</h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring restaurants and make your first reservation!
                    </p>
                    <Button onClick={() => navigate("/")}>
                      Browse Restaurants
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filterReservations("all").map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {filterReservations("upcoming").length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming reservations</h3>
                    <p className="text-muted-foreground mb-4">
                      Book a table at your favorite restaurant!
                    </p>
                    <Button onClick={() => navigate("/")}>
                      Browse Restaurants
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filterReservations("upcoming").map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {filterReservations("past").length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No past reservations</h3>
                    <p className="text-muted-foreground">
                      Your reservation history will appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filterReservations("past").map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {filterReservations("cancelled").length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No cancelled reservations</h3>
                    <p className="text-muted-foreground">
                      You haven't cancelled any reservations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filterReservations("cancelled").map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Reservation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your reservation at{" "}
              <strong>{selectedReservation?.restaurantName}</strong> on{" "}
              {selectedReservation && new Date(selectedReservation.date).toLocaleDateString()}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCancelDialog(false);
                setSelectedReservation(null);
              }}
              disabled={isCancelling}
            >
              Keep Reservation
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelReservation}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Cancel Reservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reservations;
