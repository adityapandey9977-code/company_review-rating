import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";
import AddReviewModal from "../components/AddReviewModal.jsx";
import CompanyLogo from "../components/CompanyLogo.jsx";
import { LocationIcon } from "../components/Icons.jsx";
import ReviewList from "../components/ReviewList.jsx";
import StarRating from "../components/StarRating.jsx";

function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState("date");
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchCompany = async () => {
    const response = await api.get(`/companies/${id}`);
    setCompany(response.data);
  };

  const fetchReviews = async () => {
    const response = await api.get(`/reviews/${id}`, { params: { sort } });
    setReviews(response.data);
  };

  const refreshPage = async () => {
    await fetchCompany();
    await fetchReviews();
  };

  useEffect(() => {
    refreshPage();
  }, [id, sort]);

  if (!company) {
    return (
      <main className="page-shell">
        <p className="muted-message text-center">Loading company...</p>
      </main>
    );
  }

  return (
    <main className="page-shell detail-page">
      <section className="container app-container">
        <div className="detail-card">
          <div className="detail-header">
            <CompanyLogo company={company} />
            <div className="company-info flex-grow-1">
              <h5>{company.name}</h5>
              <p className="location-line">
                <LocationIcon />
                {company.location}
              </p>
              <div className="rating-line">
                <strong>{company.averageRating || 0}</strong>
                <StarRating value={company.averageRating || 0} />
                <span>{company.reviewCount} Reviews</span>
              </div>
            </div>
            <div className="detail-side">
              <span>Founded on: {new Date(company.foundedOn).toLocaleDateString("en-GB")}</span>
              <button className="btn purple-button" onClick={() => setShowReviewModal(true)}>
                + Add Review
              </button>
            </div>
          </div>

          <div className="review-toolbar">
            <h6>Result Found: {reviews.length}</h6>
            <div className="average-rating">
              <strong>{company.averageRating || 0}</strong>
              <span>Average Rating</span>
            </div>
            <select className="form-select" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="date">Date</option>
              <option value="rating">Rating</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>

          <ReviewList reviews={reviews} onLiked={refreshPage} companyName={company.name} />
        </div>
      </section>

      <AddReviewModal
        show={showReviewModal}
        companyId={id}
        onClose={() => setShowReviewModal(false)}
        onSaved={refreshPage}
      />
    </main>
  );
}

export default CompanyDetail;
