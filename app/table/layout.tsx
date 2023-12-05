export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="w-full flex flex-col items-center justify-center gap-4 py-2 md:py-4">
			<div className="inline-block justify-center">
				{children}
			</div>
		</section>
	);
}
