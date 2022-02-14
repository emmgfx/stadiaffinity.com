import Image from "next/image";

const Cover = ({
  image = "https://nddyfchsgrewkdbjnwcz.supabase.in/storage/v1/object/sign/covers/life-is-strange-remastered-collection-pc-juego-steam-cover.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb3ZlcnMvbGlmZS1pcy1zdHJhbmdlLXJlbWFzdGVyZWQtY29sbGVjdGlvbi1wYy1qdWVnby1zdGVhbS1jb3Zlci5qcGVnIiwiaWF0IjoxNjQ0NzY0MDUyLCJleHAiOjE5NjAxMjQwNTJ9.P-vF9ANTjpsYxF986BQrRF4OCRj_qEXkAAKCKR2G_DQ",
  name,
}) => {
  return (
    <div className="relative aspect-[3/4]">
      <Image className="rounded" src={image} alt={name || null} layout="fill" />
    </div>
  );
};

export default Cover;
