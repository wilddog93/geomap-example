import { Link } from "@nextui-org/link";

export default function LoginPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 py-2 md:py-4">
      <div className="w-full">
        Login Page
      </div>
    </section>
  );
}
