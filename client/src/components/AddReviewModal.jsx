import { useState } from "react";
import api from "../api.js";
import StarRating from "./StarRating.jsx";

const emptyForm = {
  fullName: "",
  subject: "",
  reviewText: "",
  reviewerPhoto: null,
  rating: 4
};

function AddReviewModal({ show, companyId, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("companyId", companyId);
    data.append("fullName", form.fullName);
    data.append("subject", form.subject);
    data.append("reviewText", form.reviewText);
    data.append("rating", form.rating);
    if (form.reviewerPhoto) {
      data.append("reviewerPhoto", form.reviewerPhoto);
    }

    await api.post("/reviews", data);
    setSaving(false);
    setForm(emptyForm);
    onSaved();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="app-modal review-modal">
        <span className="modal-blob blob-one" />
        <span className="modal-blob blob-two" />
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-content-inner">
          <h3>Add Review</h3>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              className="form-control"
              placeholder="Enter"
              value={form.fullName}
              onChange={(event) => updateForm("fullName", event.target.value)}
              required
            />

            <label>Add your photo</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(event) => updateForm("reviewerPhoto", event.target.files[0])}
              required
            />

            <label>Subject</label>
            <input
              className="form-control"
              placeholder="Enter"
              value={form.subject}
              onChange={(event) => updateForm("subject", event.target.value)}
              required
            />

            <label>Enter your Review:</label>
            <textarea
              className="form-control"
              placeholder="Description"
              rows="5"
              value={form.reviewText}
              onChange={(event) => updateForm("reviewText", event.target.value)}
              required
            />

            <h4>Rating</h4>
            <StarRating value={form.rating} onChange={(rating) => updateForm("rating", rating)} size="lg" />

            <button className="btn purple-button modal-save" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReviewModal;
