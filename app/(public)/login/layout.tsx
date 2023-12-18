import { useAuth } from "@/stores/auth";
import { Link } from "@nextui-org/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const isLogin = true

    // if (isLogin) {
    //   redirect(`/login`);
    // }

  return (
    <main className="relative w-full h-full flex-grow text-default-500">
      {children}
    </main>
  );
}
