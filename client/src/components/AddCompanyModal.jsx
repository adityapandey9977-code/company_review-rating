import { useState } from "react";
import api from "../api.js";
import { CalendarIcon, LocationIcon } from "./Icons.jsx";

const emptyForm = {
  name: "",
  location: "",
  foundedOn: "",
  city: "",
  logo: null
};

function AddCompanyModal({ show, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("location", form.location);
    data.append("foundedOn", form.foundedOn);
    data.append("city", form.city);
    if (form.logo) {
      data.append("logo", form.logo);
    }

    await api.post("/companies", data);
    setSaving(false);
    setForm(emptyForm);
    onSaved();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="app-modal add-company-modal">
        <span className="modal-blob blob-one" />
        <span className="modal-blob blob-two" />
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-content-inner">
          <h3>Add Company</h3>

          <form onSubmit={handleSubmit}>
            <label>Company name</label>
            <input
              className="form-control"
              placeholder="Enter..."
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              required
            />

            <label>Add company logo</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(event) => updateForm("logo", event.target.files[0])}
              required
            />

            <label>Location</label>
            <div className="input-icon-wrap">
              <input
                className="form-control"
                placeholder="Select Location..."
                value={form.location}
                onChange={(event) => updateForm("location", event.target.value)}
                required
              />
              <LocationIcon />
            </div>

            <label>Founded on</label>
            <div className="input-icon-wrap">
              <input
                className="form-control"
                type="date"
                value={form.foundedOn}
                onChange={(event) => updateForm("foundedOn", event.target.value)}
                required
              />
              <CalendarIcon />
            </div>

            <label>City</label>
            <input
              className="form-control"
              placeholder="City"
              value={form.city}
              onChange={(event) => updateForm("city", event.target.value)}
              required
            />

            <button className="btn purple-button modal-save" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCompanyModal;
