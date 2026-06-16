import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon, StarIcon } from "./Icons.jsx";

function AppNavbar() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="navbar navbar-expand bg-white app-navbar">
      <div className="container app-container">
        <button className="navbar-brand brand-button" onClick={() => navigate("/")}>
          <span className="brand-mark">
            <StarIcon />
          </span>
          <span className="brand-text">
            Review&amp;<strong>RATE</strong>
          </span>
        </button>

        <form className="nav-search" onSubmit={handleSubmit}>
          <input
            className="form-control form-control-sm"
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button className="search-icon" type="submit" aria-label="Search">
            <SearchIcon />
          </button>
        </form>

        <div className="nav-links">
          <button type="button">SignUp</button>
          <button type="button">Login</button>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
