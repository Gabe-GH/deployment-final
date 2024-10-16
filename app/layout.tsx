import "./globals.css";
import { metadata } from "./config/metadata";

import { dm_sans } from "./fonts";

import Navbar from "@/app/components/navbar";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
