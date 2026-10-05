import { redirect } from "next/navigation";

export default async function LegacyBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/blog2/${encodeURIComponent(id)}`);
}
