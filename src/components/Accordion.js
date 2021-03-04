import React, { useState } from "react";

// Destructure items from props object passed by the parent
// use .map() array method to create and render array items
// as a list. map.() second argument is index.
// Every element inside list in JSX needs to have unique
// key property.
// Fragment is used because adding extra <div> here would
// mess up Semantic UI Accordion styling.
// React.Fragment acts as root element only to supply key
// React.Fragment is not rendered as HTML and is ignored.

const Accordion = ({ items }) => {
  // Array destructuring. When we call useState()
  // we get back array with two elements inside.
  // First element state value we want to keep track of.
  // Second element is setter element that sets value of
  // first element.
  // Function parameter is the default value of state
  // element.
  // When setter is called it will cause the component
  // to rer-ender itself and whole Accordion functional
  // component function to run from the start
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      <React.Fragment key={item.title}>
        {/* onClick property is wrapped inside arrow function.
          If written as {onTitleClick(index)} it gets called immediately when div is rendered.
          Wrapping function insied arrow function so it gets called only when div is clicked.  */}
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;
