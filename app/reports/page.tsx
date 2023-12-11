import { Navbar } from "@/components/navbar";
import { title } from "@/components/primitives";
import { Fragment } from "react";

export default function AboutPage() {
  return (
    <Fragment>
      <Navbar />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>About</h1>
        </div>
      </section>
    </Fragment>
  );
}
