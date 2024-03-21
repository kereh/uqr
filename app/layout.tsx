import type { Metadata } from "next";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "@/components/ui/toaster";
import Theme from "@/components/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "QRCode Generator",
  description: "Simple QRCode Generator",
  authors: [{ name: "Ronaldo Kereh", url: "https://github.com/kereh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="container p-4">
        <Theme attribute="class" defaultTheme="dark">
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
