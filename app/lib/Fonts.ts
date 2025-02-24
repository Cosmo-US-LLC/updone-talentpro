"use client"
import { Lato, Montserrat, Poppins } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});
export const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"]
});
export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});