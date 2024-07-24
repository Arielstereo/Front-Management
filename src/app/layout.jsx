import { Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/CommingSoon";

const prompt = Prompt({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Front Management",
  description: "React and Next.js Project Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={prompt.className}>
        <Providers>
          <main>
            <Navigation />
            <div className="block xl:hidden">
              <ComingSoon />
            </div>
            <div className="hidden xl:block">{children}</div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
