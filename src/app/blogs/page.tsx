import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "../../components/Landing/Navbar";
import Background from "../../components/Landing/Background";
import BlogsClient from "../../components/Blogs/BlogsClient";

const Footer = dynamic(() => import("../../components/Landing/Footer"), {
  loading: () => (
    <footer className="h-[400px] border-t border-white/5 bg-black" />
  ),
});

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read insights, stories, and guides from the entrepreneurial ecosystem at NIT Silchar. The Startup Chronicles by E-Cell.",
  openGraph: {
    title: "Blogs | E-Cell NIT Silchar",
    description:
      "Read insights, stories, and guides from the entrepreneurial ecosystem at NIT Silchar.",
    type: "website",
    images: [
      {
        url: "/api/og?title=Blogs | E-Cell NIT Silchar&description=Read insights, stories, and guides from the entrepreneurial ecosystem at NIT Silchar.",
        width: 1200,
        height: 630,
        alt: "E-Cell NIT Silchar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | E-Cell NIT Silchar",
    description:
      "Read insights, stories, and guides from the entrepreneurial ecosystem at NIT Silchar.",
    images: [
      "/api/og?title=Blogs | E-Cell NIT Silchar&description=Read insights, stories, and guides from the entrepreneurial ecosystem at NIT Silchar.",
    ],
  },
};

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] font-sans text-white selection:bg-blue-500/30">
      <Background />
      <Navbar />
      <BlogsClient />
      <Footer />
    </main>
  );
}
