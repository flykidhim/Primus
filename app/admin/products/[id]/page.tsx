import { prisma } from "@/lib/prisma";
import Editor from "./ui/Editor";

export default async function ProductAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ await the params
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return <div className="p-4">Product not found</div>;
  }
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <Editor product={product} />
    </div>
  );
}
