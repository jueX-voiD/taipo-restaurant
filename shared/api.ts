/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Reservation form payload sent to POST /api/reservation
 */
export interface ReservationRequest {
  partySize: string;
  date: string;
  bookingTime: string;
  name: string;
  phone: string;
  email?: string;
  specialRequests?: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
}
