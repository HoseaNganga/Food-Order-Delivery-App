import { Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/NavBar/NavBar";
import Footer from "@/Components/Footer/Footer";
import AppProvider from "@/Components/AppContext/AppProvider";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Blaze Bites",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} w-full min-h-screen text-xl `}>
        <AppProvider>
          <Toaster />
          <NavBar />
          <main className="p-8">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}