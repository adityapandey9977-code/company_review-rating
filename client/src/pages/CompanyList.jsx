import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api.js";
import AddCompanyModal from "../components/AddCompanyModal.jsx";
import CompanyCard from "../components/CompanyCard.jsx";
import { LocationIcon } from "../components/Icons.jsx";

function CompanyList() {
  const [searchParams] = useSearchParams();
  const [companies, setCompanies] = useState([]);
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("name");
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";

  const fetchCompanies = async () => {
    setLoading(true);
    const response = await api.get("/companies", {
      params: {
        search,
        city: city.split(",")[0],
        sort
      }
    });
    setCompanies(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, [search, sort]);

  const handleFindCompany = () => {
    fetchCompanies();
  };

  return (
    <main className="page-shell">
      <section className="container app-container">
        <div className="filter-bar">
          <div className="city-field">
            <label>Select City</label>
            <div className="input-icon-wrap">
              <input
                className="form-control"
                value={city}
                placeholder="Enter city "
                onChange={(event) => setCity(event.target.value)}
              />
              <LocationIcon />
            </div>
          </div>

          <button className="btn purple-button" onClick={handleFindCompany}>
            Find Company
          </button>
          <button className="btn purple-button" onClick={() => setShowAddCompany(true)}>
            +Add Company
          </button>

          <div className="sort-field">
            <label>Sort</label>
            <select className="form-select" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="name">Name</option>
              <option value="average">Average</option>
              <option value="rating">Rating</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        <div className="result-divider" />
        <p className="result-count">Result Found: {companies.length}</p>

        {loading ? (
          <p className="muted-message">Loading companies...</p>
        ) : (
          <div className="company-list">
            {companies.map((company, index) => (
              <CompanyCard key={company._id} company={company} index={index} />
            ))}
          </div>
        )}
      </section>

      <AddCompanyModal
        show={showAddCompany}
        onClose={() => setShowAddCompany(false)}
        onSaved={fetchCompanies}
      />
    </main>
  );
}

export default CompanyList;
