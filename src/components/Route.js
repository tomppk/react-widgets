import { useEffect, useState } from "react";

// In JSX when a component has other components nested
// inside it they are provided as props.children
// See App.js Route has other components nested inside
// children is a special props name for this situation
// useEffect used as lifecycle method to initialize event
// listener when component is rendered.
// Event listener added to browser window property and
// listens for 'popstate' event created by Link component
// When event occurs then calls onLocationChange callback.
// If Route component no longer rendered return cleanup
// function to remove event listener to prevent error
// undefined.
// useState adds piece of state to track current URL.
// Every time URL updates currentPath state updates to
// this URL and Route component re-renders itself and
// checks whether to render children or null with this
// path value.
const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;
};

export default Route;
