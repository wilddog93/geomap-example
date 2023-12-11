import { Link } from "@nextui-org/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 py-2 md:py-4">
      <div className="w-full px-4">{children}</div>
      {/* <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer> */}
    </section>
  );
}
