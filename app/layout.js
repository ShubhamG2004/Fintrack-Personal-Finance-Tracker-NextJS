import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://fintrack.app"),
  title: {
    default: "FinTrack",
    template: "%s | FinTrack",
  },
  description:
    "FinTrack is an AI-powered personal finance platform for budgeting, expense tracking, and financial insights.",
  keywords: [
    "personal finance",
    "budget tracker",
    "expense tracking",
    "AI finance",
    "financial insights",
  ],
  openGraph: {
    title: "FinTrack",
    description:
      "Track spending, manage budgets, and get AI-powered financial insights.",
    url: "https://fintrack.app",
    siteName: "FinTrack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinTrack",
    description:
      "Track spending, manage budgets, and get AI-powered financial insights.",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}