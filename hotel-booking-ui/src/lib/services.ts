import { Room, RatePlan, Reservation, BookingSearchParams } from '@/types';
import { MOCK_ROOMS, MOCK_RATE_PLANS, MOCK_RESERVATIONS } from './mock-data';

// Internal memory store for reservations created during current session
const sessionReservations: Reservation[] = [...MOCK_RESERVATIONS];

/**
 * Fetch all available room types
 */
export async function getRooms(): Promise<Room[]> {
  // Simulate small network delay for realistic frontend behavior
  await new Promise((res) => setTimeout(res, 80));
  return MOCK_ROOMS;
}

/**
 * Fetch a single room by its slug
 */
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  await new Promise((res) => setTimeout(res, 60));
  const room = MOCK_ROOMS.find((r) => r.slug === slug);
  return room || null;
}

/**
 * Fetch a single room by its ID
 */
export async function getRoomById(id: string): Promise<Room | null> {
  await new Promise((res) => setTimeout(res, 60));
  const room = MOCK_ROOMS.find((r) => r.id === id);
  return room || null;
}

/**
 * Fetch all available rate plans
 */
export async function getRatePlans(): Promise<RatePlan[]> {
  await new Promise((res) => setTimeout(res, 50));
  return MOCK_RATE_PLANS;
}

/**
 * Check room availability for given dates & guest count
 */
export async function checkAvailability(params: BookingSearchParams): Promise<{
  availableRooms: Room[];
  nightCount: number;
}> {
  await new Promise((res) => setTimeout(res, 120));

  const guests = params.guests || 2;
  // Filter rooms that can accommodate the guest count
  const available = MOCK_ROOMS.filter((room) => room.maxOccupancy >= guests);

  let nightCount = 1;
  if (params.checkIn && params.checkOut) {
    const start = new Date(params.checkIn).getTime();
    const end = new Date(params.checkOut).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      nightCount = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    }
  }

  return {
    availableRooms: available.length > 0 ? available : MOCK_ROOMS,
    nightCount,
  };
}

/**
 * Create a new reservation
 */
export async function createReservation(
  data: Omit<Reservation, 'id' | 'bookingCode' | 'createdAt' | 'status'>
): Promise<Reservation> {
  await new Promise((res) => setTimeout(res, 300));

  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const newBookingCode = `TR-${randomDigits}`;
  const room = MOCK_ROOMS.find((r) => r.id === data.roomId);

  const newReservation: Reservation = {
    ...data,
    id: `res-${Date.now()}`,
    bookingCode: newBookingCode,
    room,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  sessionReservations.unshift(newReservation);
  return newReservation;
}

/**
 * Look up a reservation by booking code + email or phone
 */
export async function getReservationByCode(
  bookingCode: string,
  emailOrPhone: string
): Promise<Reservation | null> {
  await new Promise((res) => setTimeout(res, 200));

  const cleanedCode = bookingCode.trim().toUpperCase();
  const cleanedContact = emailOrPhone.trim().toLowerCase();

  const found = sessionReservations.find((res) => {
    const matchesCode = res.bookingCode.toUpperCase() === cleanedCode;
    const matchesEmail = res.guestEmail.toLowerCase() === cleanedContact;
    const matchesPhone = res.guestPhone.replace(/\D/g, '').includes(cleanedContact.replace(/\D/g, ''));
    return matchesCode && (matchesEmail || matchesPhone);
  });

  return found || null;
}
