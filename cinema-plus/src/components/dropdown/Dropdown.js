import React from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider>
      <div className="relative inline-block w-full" {...props}>
        {children}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
