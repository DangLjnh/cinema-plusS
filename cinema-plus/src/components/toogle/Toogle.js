import React from "react";
import PropTypes from "prop-types";

const Toogle = ({ register, check, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        name="hot"
        {...register("hot")}
        checked={check}
        onChange={onChange}
        className="hidden-input"
      />
      <div
        className={`inline-block w-[90px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          check ? "bg-[#7877fa]" : "bg-gray-300"
        }`}
      >
        <span
          className={`transition-all w-[34px] h-[34px] bg-white rounded-full inline-block ${
            check ? "translate-x-[47px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

Toogle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toogle;
