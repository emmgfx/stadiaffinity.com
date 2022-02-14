import Image from "next/image";

const Cover = ({ game }) => {
  return (
    <div className="relative aspect-[3/4]">
      <Image
        className="rounded object-cover"
        src={`https://nddyfchsgrewkdbjnwcz.supabase.in/storage/v1/object/public/covers/${game.id}.jpg`}
        alt={game.name || null}
        layout="fill"
      />
    </div>
  );
};

export default Cover;
