import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { title } from "@/components/primitives";
import Tables from "@/components/tables/table-component";
import { Fragment } from "react";

export default function BlogPage() {
  return (
    <Fragment>
      <Navbar />
      <section className="relative overflow-y-auto w-full h-full flex flex-col items-center gap-4 py-2 md:py-4">
        <div className="w-full px-4">
          <h1 className={title()}>Table</h1>
          <Tables />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}
