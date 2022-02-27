const TextGradient = ({ children }) => {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">
      {children}
    </span>
  );
};

export default TextGradient;
