import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PDF summarizer",
  description: "Generated by your own pdf now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <Providers>
        <Navbar/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
