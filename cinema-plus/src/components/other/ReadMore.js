const { useState } = require("react");

export const ReadMore = ({ children, numberText = 300, className = "" }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className={`text ${className}`}>
      {isReadMore ? text?.slice(0, numberText) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore && text?.length > numberText ? (
          <span className="italic font-semibold text-white transition-all cursor-pointer hover:opacity-80">
            {" "}
            ...read more
          </span>
        ) : (
          text?.length > numberText && (
            <span className="italic font-semibold text-white transition-all cursor-pointer hover:opacity-80">
              {" "}
              show less
            </span>
          )
        )}
      </span>
    </p>
  );
};
