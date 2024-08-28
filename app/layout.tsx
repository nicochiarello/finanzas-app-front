import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen h-screen flex overflow-hidden ${montserrat.className}`}
      >
        <div className="max-w-[2200px] w-full mx-auto flex">
          <Sidebar />
          <main className="flex-1 bg-zinc-100 pl-[4rem] pr-4 pt-6 pb-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
