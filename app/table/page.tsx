
import { title } from "@/components/primitives";
import Tables from "@/components/tables/table-component";

export default function BlogPage() {
	return (
		<div className="w-full">
			<h1 className={title()}>Table</h1>
			<Tables />
		</div>
	);
}
