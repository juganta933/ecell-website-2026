export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] p-10 text-white">
      <h1 className="mb-4 text-4xl font-black md:text-6xl">404</h1>
      <p className="mb-8 text-lg text-gray-400">Blog post not found</p>
      <a
        href="/blogs"
        className="rounded-2xl border border-blue-500/20 bg-blue-500/10 px-8 py-4 text-sm font-black tracking-widest text-blue-400 uppercase transition-all hover:bg-blue-600 hover:text-white"
      >
        Back to Blogs
      </a>
    </div>
  );
}
