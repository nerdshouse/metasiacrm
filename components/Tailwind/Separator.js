const Separator = ({ className, vertical }) => {
  return (
    <div
      className={`${
        vertical ? "border-l-2 border-l-primary-100" : "border-b-2 border-b-primary-100"
      } ${className}`}
    ></div>
  );
};
export default Separator;
