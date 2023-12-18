export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full h-full flex-grow text-default-500">
      {children}
    </main>
  );
}
