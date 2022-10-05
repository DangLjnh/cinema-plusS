import React from "react";
import propsType from "prop-types";
import styled from "styled-components";
const DateInputStyle = styled.div`
  .date {
    ::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }
`;
const DateInput = ({ className, onChange, value, title }) => {
  return (
    <DateInputStyle className={`w-full flex justify-between ${className}`}>
      <p className="text-sm text-neutral-400">{title}</p>
      <input
        type="date"
        name=""
        id=""
        onChange={onChange}
        value={value}
        className="text-white text-[15px] bg-neutral-600 px-2 py-1 date rounded-md"
      />
    </DateInputStyle>
  );
};
DateInput.propsType = {
  // className, onChange, value, title
  className: propsType.string,
  onChange: propsType.func.isRequired,
  value: propsType.string.isRequired,
  title: propsType.string,
};
export default DateInput;
