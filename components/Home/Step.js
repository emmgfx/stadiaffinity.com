const Step = ({ Icon, title, children }) => {
  return (
    <div className="relative px-6 py-12 text-center bg-[#242531] rounded mb-16 w-full max-w-3xl">
      <div className="absolute top-0 left-1/2 bg-primary-500 p-4 rounded-full -translate-x-1/2 -translate-y-1/2">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-bold mb-4">{title}</h4>
      {children}
    </div>
  );
};

export default Step;
