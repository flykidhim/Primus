import Image from "next/image";
type Props = {
  name: string;
  number: number;
  position: string;
  photoUrl?: string | null;
  sub?: string;
};
export default function PlayerCard({
  name,
  number,
  position,
  photoUrl,
  sub,
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md">
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          width={800}
          height={600}
          className="h-56 sm:h-60 w-full object-cover group-hover:scale-[1.02] transition-transform"
        />
      ) : (
        <div className="h-56 sm:h-60 w-full bg-gray-100" />
      )}
      <div className="absolute top-3 left-3">
        <span className="px-2 py-1 rounded-xl bg-black/70 text-white text-xs">
          #{number} • {position}
        </span>
      </div>
      <div className="p-4">
        <div className="text-base sm:text-lg font-semibold">{name}</div>
        {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}
