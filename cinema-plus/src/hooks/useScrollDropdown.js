const { useState } = require("react");

export default function useScrollDropDown(classActive) {
  const [active, setActive] = useState(false);
  const handleToogleDropdown = (e) => {
    const content = e.target.nextElementSibling;
    content.style.height = `${content.scrollHeight}px`;
    content?.classList.toggle(classActive);
    setActive(true);
    if (!content.classList.contains(classActive)) {
      content.style.height = `0px`;
      setActive(false);
    }
  };
  return {
    active,
    handleToogleDropdown,
  };
}
