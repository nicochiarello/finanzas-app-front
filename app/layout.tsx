import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#6366f1" />
        {children}
      </body>
    </html>
  );
}
