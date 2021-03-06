import IconStarFilled from "../public/images/icons/star-filled.svg";

const GameItemPhantom = ({}) => {
  return (
    <article className="rounded overflow-hidden flex flex-col">
      <div className="relative aspect-[3/4] bg-white/10 flex items-center justify-center overflow-hidden"></div>
      <div className="px-4 py-6 bg-gradient-to-r from-gray-medium to-[#363740] flex-auto">
        <h3 className="font-medium mb-2">Loading...</h3>
        <div className="flex gap-0.5">
          <IconStarFilled />
          <IconStarFilled />
          <IconStarFilled />
          <IconStarFilled />
          <IconStarFilled />
          <span className="ml-2 text-[#95949B] text-sm">(0)</span>
        </div>
      </div>
    </article>
  );
};

export default GameItemPhantom;
