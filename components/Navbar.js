import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>StreamList</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;