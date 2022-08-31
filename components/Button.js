import { forwardRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = forwardRef(function Button(
  {
    tagName = "button",
    variant = "white",
    minWidth = false,
    children,
    className,
    ...props
  },
  ref
) {
  const Tag = props.href ? "a" : tagName;
  // Using function instead of arrow function because of:
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
  return (
    <Tag
      {...props}
      ref={ref}
      className={classNames(
        "py-4 px-6 rounded-sm inline-flex justify-center items-center gap-2 disabled:opacity-50",
        className,
        {
          "bg-white text-gray-medium": variant === "white",
          "bg-primary-500 text-white": variant === "orange",
          "bg-transparent text-white outline outline-2 outline-white outline-offset-[-2px]":
            variant === "white-outline",
          "w-64 max-w-full": minWidth,
        }
      )}
    >
      {children}
    </Tag>
  );
});

Button.propTypes = {
  tagName: PropTypes.oneOf(["button", "a"]),
  variant: PropTypes.oneOf(["white", "orange", "white-outline"]),
  minWidth: PropTypes.bool,
};

export default Button;
