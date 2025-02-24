"use client"
export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Redux provider for client components */}
       {children}
      </body>
    </html>
  );
}
