import { loadStripe } from "@stripe/stripe-js";

// Ensure that the environment variable is not undefined
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_ACCESS_TOKEN;

if (!stripePublishableKey) {
  throw new Error('Stripe publishable key is not defined in the environment variables.');
}

export const stripePromise = loadStripe(stripePublishableKey);
