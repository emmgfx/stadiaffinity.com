const Metascore = ({ score }) => {
  let bg = "#CCC";
  if (score) bg = "#f00";
  if (score >= 40) bg = "#fc3";
  if (score >= 70) bg = "#6c3";
  return (
    <div
      className="flex items-center justify-center text-white w-11 h-11 font-bold text-xl rounded"
      style={{ backgroundColor: bg }}
    >
      {score || "NA"}
    </div>
  );
};

export default Metascore;
