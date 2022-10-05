const { useState } = require("react");

export default function useScrollDropDownDetail(classActive) {
  const [active, setActive] = useState(false);
  const handleToogleDropdown = (e) => {
    const header = e.target.parentNode.parentNode;
    const content = e.target.parentNode.nextElementSibling;
    header.style.height = `${header.scrollHeight}px`;
    content?.classList.add(classActive);
    // headers?.classList.remove(classActive);
    header?.classList.toggle(classActive);
    setActive(true);
    if (!header.classList.contains(classActive)) {
      // headers?.classList.remove(classActive);
      content?.classList.remove(classActive);
      header.style.height = `116px`;
      setActive(false);
    }
  };
  return {
    active,
    handleToogleDropdown,
  };
}
