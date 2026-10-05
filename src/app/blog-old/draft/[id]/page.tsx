import type { Metadata } from "next";
import Navbar from "../../../../components/Landing/Navbar";
import Footer from "../../../../components/Landing/Footer";
import BackButton from "../../../../components/Blogs/BackButton";
import DraftBlogClient from "./DraftBlogClient";

export const metadata: Metadata = {
  title: "Draft Blog Preview",
  robots: { index: false, follow: false },
};

export default async function DraftBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <Navbar />
      <section className="pt-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="animate-[fadeIn_0.6s_ease-out_forwards] opacity-0">
            <BackButton />
          </div>
        </div>
      </section>
      <DraftBlogClient blogId={id} />
      <Footer />
    </main>
  );
}
