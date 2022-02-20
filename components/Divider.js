import classNames from "classnames";

const Divider = ({ className }) => {
  return (
    <div
      className={classNames(
        "h-px bg-gradient-to-r from-transparent via-white/80 to-transparent",
        className
      )}
    />
  );
};

export default Divider;
