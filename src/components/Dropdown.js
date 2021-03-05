import React, { useEffect, useState, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  // Piece of state open gets boolean true or false
  const [open, setOpen] = useState(false);
  // useRef() allows to get a direct reference to DOM
  // HTML element
  const ref = useRef();

  // First time Dropdown is rendered add event listener to
  // DOM body element to listen for click anywhere in the
  // body element.
  // If clicked element (event.target) is our current
  // referenced element or contained within it.
  // That is our most parent element <div "ui form">.
  // Then return and do nothing and let Dropdown onClick
  // event handler close the dropdown.
  // If clicked element is not our referenced element or
  // contained inside it but clicked element is outside
  // Dropdown component and somewhere else in the body.
  // Then setOpen to false and close dropdown.
  // Also remove body event listener if Dropdown is removed
  // from the DOM so no longer rendered. Otherwise will get
  // error as event listener executes but there is no
  // ref.current as there is no Dropdown rendered on screen
  useEffect(() => {
    // Helper function given as callback to
    // body event listener
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    // Cleanup function will be called right before
    // useEffect() is called again and when Dropdown
    // component is removed from the DOM. So when it
    // is no longer rendered.
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  // Mapping over passed in options array items
  // to create a list item of each element.
  // Each item is given key property and styled.
  // null in React means do not render anything.
  // So if selected item equals rendered item then
  // do not render it and it will show as nothing
  // on the screen.
  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}>
        <div>{option.label}</div>
      </div>
    );
  });

  // Semantic UI Dropdown classes for styling
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          // onClick set state open to opposite of current
          // value. If open true add visible classes and
          // false add empty string in className string
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}>
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
