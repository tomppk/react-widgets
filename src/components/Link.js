import React from "react";

// 1. Props className and href to pass on to <a> tag
// children to receive nested components or text
// from parent element Header.
// 2. onClick helper function receives click event
// prevents default <a> tag browser behavior and does not
// do full page reload.
// Browsers built-in function window.history.pushState used
// to manually change url to href props value passed from
// parent.
// 3. navEvent uses browser built-in object and
// function to create an event that other components can
// detect. Route component has event listener to listen to
// this PopStateEvent.
// 4. If user held down cmd on MacOs(metaKey) or ctrl on
// windows (ctrlKey) then return early and do not prevent
// default behavior. The page will open to a new tab and
// is allowed to completely reload and refresh.
const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", href);

    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} href={href} className={className}>
      {children}
    </a>
  );
};

export default Link;
