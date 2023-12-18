import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";

export default function BlogLayout({
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
