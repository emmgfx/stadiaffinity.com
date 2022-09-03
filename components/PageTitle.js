import classNames from "classnames";

const PageTitle = ({ children, tagName, className, ...props }) => {
  const Tag = tagName ?? "h1";
  return (
    <Tag
      {...props}
      className={classNames("text-2xl md:text-4xl font-semibold", className)}
    >
      {children}
    </Tag>
  );
};

export default PageTitle;
