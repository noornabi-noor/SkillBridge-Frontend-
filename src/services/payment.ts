
export interface StripeSessionResponse {
  url: string;
}

/**
 * Creates a Stripe Checkout Session for a specific booking.
 * 
 * @param bookingId - The ID of the booking to pay for.
 * @returns A promise that resolves to the Stripe session response containing the redirect URL.
 */
export async function createCheckoutSession(bookingId: string): Promise<StripeSessionResponse> {
  try {
    const res = await fetch(`/api/payments/create-checkout-session`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create checkout session");
    }

    return res.json();
  } catch (error: any) {
    console.error("Stripe Session Error:", error);
    throw new Error(error.message || "An unexpected error occurred while initiating payment.");
  }
}
export async function verifyPayment(sessionId: string, bookingId: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`/api/payments/verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, bookingId }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to verify payment");
    }

    return res.json();
  } catch (error: any) {
    console.error("Verify Payment Error:", error);
    throw new Error(error.message || "An unexpected error occurred while verifying payment.");
  }
}
