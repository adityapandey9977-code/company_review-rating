import { useId } from "react";
import { StarIcon } from "./Icons.jsx";

function StarRating({ value = 0, onChange, size = "sm" }) {
  const roundedValue = Math.round(value);
  const labels = ["Very Bad", "Poor", "Average", "Satisfied", "Very Satisfied"];
  const isClickable = Boolean(onChange);
  const uid = useId();

  return (
    <div className={`star-row star-${size}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        if (isClickable) {
          return (
            <button
              key={star}
              type="button"
              className={`star-button ${star <= roundedValue ? "active" : ""}`}
              onClick={() => onChange(star)}
              aria-label={`${star} star`}
            >
              <StarIcon />
            </button>
          );
        }

        const fillPercent = Math.min(Math.max((value - (star - 1)) * 100, 0), 100);
        const gradId = `star-grad-${uid}-${star}`;

        return (
          <span key={star} className="star-button readonly">
            <svg viewBox="0 0 24 24" className="star-icon" aria-hidden="true">
              <defs>
                <linearGradient id={gradId} x1="0" x2="100%" y1="0" y2="0">
                  <stop offset={`${fillPercent}%`} stopColor="#f5a623" />
                  <stop offset={`${fillPercent}%`} stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <path
                d="m12 2.4 2.9 6 6.6.9-4.8 4.7 1.1 6.6-5.8-3.1-5.8 3.1 1.1-6.6-4.8-4.7 6.6-.9L12 2.4Z"
                fill={`url(#${gradId})`}
              />
            </svg>
          </span>
        );
      })}
      {isClickable && <span className="rating-label">{labels[roundedValue - 1] || "Select"}</span>}
    </div>
  );
}

export default StarRating;

