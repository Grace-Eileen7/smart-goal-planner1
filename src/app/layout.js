import "./globals.css";

export const metadata = {
  title: "Smart Goal Planner",
  description: "Track and manage your financial goals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
