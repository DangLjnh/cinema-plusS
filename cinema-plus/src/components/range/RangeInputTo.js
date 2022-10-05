import React from "react";
import propsType from "prop-types";
import styled from "styled-components";
const RangeInputStyle = styled.div``;
const RangeInputTo = ({ value, onChange, className, disabled = false }) => {
  return (
    <RangeInputStyle className={`${className}`}>
      <p className="text-right font-medium">
        <span className="text-sm text-neutral-400">To</span> {value}{" "}
        <span className="text-sm text-neutral-400">min</span>
      </p>
      <input
        type="range"
        className="range range-to w-full my-2"
        value={value || 200}
        list="tickmarks"
        step={"10"}
        min="20"
        max="200"
        onChange={onChange}
      />
    </RangeInputStyle>
  );
};
RangeInputTo.propsType = {
  className: propsType.string,
  onChange: propsType.func.isRequired,
  value: propsType.number.isRequired,
};
export default RangeInputTo;
