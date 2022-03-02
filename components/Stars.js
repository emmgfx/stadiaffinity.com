import IconStarFilled from "../public/images/icons/star-filled.svg";
import IconStarEmpty from "../public/images/icons/star-empty.svg";
import IconStarHalf from "../public/images/icons/star-half.svg";

const Stars = ({ amount, size = 11 }) => {
  const rating = Math.round(amount / 0.5) * 0.5; // Rounded to 0.5
  const starsFilled = -Math.round(-rating); // Rounded half down
  const useHalf = rating - starsFilled !== 0;
  const starsEmpty = 5 - starsFilled - (useHalf ? 1 : 0);
  return (
    <>
      {[...Array(starsFilled).keys()].map((v, i) => (
        <IconStarFilled key={i} width={size} height={size} />
      ))}
      {useHalf && <IconStarHalf width={size} height={size} />}
      {[...Array(starsEmpty).keys()].map((v, i) => (
        <IconStarEmpty key={i} width={size} height={size} />
      ))}
    </>
  );
};

export default Stars;
