import { Link } from "@nextui-org/link";

export default function LoginLayout({
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
