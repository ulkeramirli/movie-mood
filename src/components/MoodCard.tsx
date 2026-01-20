import Image from "next/image";
import Link from "next/link";

type Props = {
  emoji: string;
  title: string;
  slug: string;
};

export default function MoodCard({ emoji, title, slug }: Props) {
  return (
    <Link href={`/mood/${slug}`}>
      <div className="cursor-pointer rounded-2xl border bg-[#2e323b] border-gray-400 p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:bg-[#0000]">
        <div className="w-16 h-16 relative justify-center mx-auto mb-3">
        <Image src={emoji} alt={title}  className="object-contain" width={200} height={200} />
      </div>
        <p className="font-serif text-white text-lg ">{title}</p>
      </div>
    </Link>
  );
}
