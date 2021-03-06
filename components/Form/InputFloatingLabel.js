import { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const InputFloatingLabel = ({
  label,
  type = "text",
  value = "",
  onChange = null,
  disabled = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const floated = type === "date" || focused || value?.length > 0;

  return (
    <div className="relative">
      {label && (
        <label
          className={classNames(
            "absolute ease-out duration-200 pointer-events-none",
            {
              "pt-2 px-3 text-gray-light text-xs": floated,
              "py-4 px-3": !floated,
            }
          )}
        >
          {label}
        </label>
      )}
      <input
        className={classNames(
          "text-white bg-gray-medium border border-white rounded-sm w-full pt-6 pb-2 px-3 disabled:opacity-50",
          "focus:outline-none focus:border-secondary-500 focus:shadow-secondary-500/40 focus:shadow-[0_0_6px_3px]"
        )}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

InputFloatingLabel.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["text", "password", "email", "number", "date"]),
};

export default InputFloatingLabel;
