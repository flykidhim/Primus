import Image from "next/image";
import Link from "next/link";
type Props = {
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
};
export default function NewsCard({ title, slug, excerpt, coverUrl }: Props) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group rounded-2xl border overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md"
    >
      {coverUrl && (
        <Image
          src={coverUrl}
          alt={title}
          width={800}
          height={480}
          className="h-40 sm:h-44 md:h-48 w-full object-cover group-hover:scale-[1.02] transition-transform"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold group-hover:text-primary">{title}</h3>
        {excerpt && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
