import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Image Modifier",
  description: "Ai-saas-platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables:{
        colorPrimary:'#624cf5'
      }
    }}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <BackgroundBeamsWithCollision> */}
        {children}
        {/* </BackgroundBeamsWithCollision> */}
        
      </body>
    </html>
    </ClerkProvider>
  );
}
