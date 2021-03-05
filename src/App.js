import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";

const items = [
  {
    title: "What is React?",
    content: "React is a front end javascript framework",
  },
  {
    title: "Why use React?",
    content: "React is a favorite javascript library among engineers",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components",
  },
];

const options = [
  { label: "The Color Red", value: "red" },
  { label: "The Color Green", value: "green" },
  { label: "A Shade of Blue", value: "blue" },
];

export default () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div className="ui container">
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}
      <button onClick={() => setShowDropdown(!showDropdown)}>
        Toggle Dropdown
      </button>
      {/* Inside curly braces to add Javascript in JSX
      using ternary operator if showDropdown is true then
      render Dropdown JSX and if false render nothing */}
      {showDropdown ? (
        <Dropdown
          selected={selected}
          // setSelected is acting as event handler or
          // callback. By convention it is name
          // onSomethingChange
          onSelectedChange={setSelected}
          options={options}
        />
      ) : null}
    </div>
  );
};
