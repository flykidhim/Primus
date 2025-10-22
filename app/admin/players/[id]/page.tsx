import { prisma } from "@/lib/prisma";
import Editor from "./ui/Editor";

export default async function PlayerAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅
  const player = await prisma.player.findUnique({ where: { id } });
  if (!player) {
    return <div className="p-4">Player not found</div>;
  }
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Edit Player</h1>
      <Editor player={player} />
    </div>
  );
}
