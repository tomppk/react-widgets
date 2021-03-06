// In JSX when a component has other components nested
// inside it they are provided as props.children
// See App.js Route has other components nested inside
// children is a special props name for this situation
const Route = ({ path, children }) => {
  return window.location.pathname === path ? children : null;
};

export default Route;
