import React from "react";

const RangeInputFrom = ({ value, onChange, className, disabled = false }) => {
  return (
    <div>
      <p className="text-right font-medium">
        <span className="text-sm text-neutral-400">From</span> {value}{" "}
        <span className="text-sm text-neutral-400">min</span>
      </p>
      <input
        type="range"
        className={`range range-from w-full my-2 ${className}`}
        disabled={disabled}
        value={value || 200}
        list="tickmarks"
        step={"10"}
        min="0"
        max="200"
        onChange={onChange}
      />
    </div>
  );
};

export default RangeInputFrom;
