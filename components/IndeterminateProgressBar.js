const IndeterminateProgressBar = () => {
  return (
    <div className="fixed z-20 w-full h-0.5 bg-secondary-950 overflow-hidden">
      <div className="w-full h-full bg-secondary-500 animate-[indeterminate_1s_linear_infinite] origin-[0%_50%]"></div>
    </div>
  );
};

export default IndeterminateProgressBar;
