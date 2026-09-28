export interface Room {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  maxOccupancy: number;
  sizeSqm: number;
  bedType: string;
  view: string;
  basePrice: number;
  photos: string[];
  amenities: string[];
  featured?: boolean;
}

export interface RatePlan {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  includedBenefits: string[];
}

export interface Reservation {
  id: string;
  bookingCode: string;
  roomId: string;
  room?: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomsCount: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  ratePlanId: string;
  ratePlanName: string;
  totalAmount: number;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  source: 'direct' | 'booking_com' | 'whatsapp';
  createdAt: string;
}

export interface BookingSearchParams {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}
