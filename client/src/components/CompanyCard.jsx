import { useNavigate } from "react-router-dom";
import CompanyLogo from "./CompanyLogo.jsx";
import { LocationIcon } from "./Icons.jsx";
import StarRating from "./StarRating.jsx";

function CompanyCard({ company, index }) {
  const navigate = useNavigate();
  const foundedDate = new Date(company.foundedOn).toLocaleDateString("en-GB");
  const average = company.averageRating;
  const reviewCount = company.reviewCount /* || (index === 0 ? 41 : 0) */;

  return (
    <div className="company-card">
      <div className="company-card-main">
        <CompanyLogo company={company} />
        <div className="company-info">
          <h5>{company.name}</h5>
          <p className="location-line">
            <LocationIcon />
            {company.location}
          </p>
          <div className="rating-line">
            <strong>{average.toFixed(1)}</strong>
            <StarRating value={average} />
            <span>{reviewCount} Reviews</span>
          </div>
        </div>
      </div>

      <div className="company-card-side">
        <span>Founded On : {foundedDate}</span>
        <button className="btn btn-dark detail-button" onClick={() => navigate(`/company/${company._id}`)}>
          Detail Review
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
