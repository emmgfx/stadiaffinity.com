import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => {
  return (
    <div className={`container mx-auto px-3 ${className}`}>{children}</div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  className: PropTypes.string,
};

export default Container;
