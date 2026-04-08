import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <h2>EZTech Stream</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/subscriptions">Store</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>
      </ul>
    </nav>
  );
}

// THIS LINE IS REQUIRED:
export default Navbar;
