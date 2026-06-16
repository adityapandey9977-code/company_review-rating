import api from "../api.js";
import { assetUrl } from "../api.js";
import { LikeIcon, ShareIcon } from "./Icons.jsx";
import StarRating from "./StarRating.jsx";

function ReviewList({ reviews, onLiked, companyName }) {
  const likeReview = async (reviewId) => {
    await api.patch(`/reviews/${reviewId}/like`);
    onLiked();
  };

  const shareReview = async (review) => {
    const text = `${companyName}: ${review.subject}`;

    if (navigator.share) {
      await navigator.share({ title: companyName, text, url: window.location.href });
    } else {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${window.location.href}`)}`;
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div>
      {reviews.map((review, index) => (
        <div className="review-item" key={review._id}>
          {review.reviewerPhoto ? (
            <img className="avatar avatar-photo" src={assetUrl(review.reviewerPhoto)} alt={review.fullName} />
          ) : (
            <div className={`avatar avatar-${index % 4}`}>{review.fullName.charAt(0).toUpperCase()}</div>
          )}
          <div className="review-body">
            <div className="review-top">
              <div>
                <h6>{review.fullName}</h6>
                <span>{new Date(review.createdAt).toLocaleString()}</span>
              </div>
              <StarRating value={review.rating} />
            </div>
            <strong className="review-subject">{review.subject}</strong>
            <p>{review.reviewText}</p>
            <div className="review-actions">
              <button onClick={() => likeReview(review._id)}>
                <LikeIcon />
                <span>Like ({review.likes})</span>
              </button>
              <button onClick={() => shareReview(review)}>
                <ShareIcon />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
