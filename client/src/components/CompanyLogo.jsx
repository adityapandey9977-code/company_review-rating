import { assetUrl } from "../api.js";

function GraffersidLogo() {
  return (
    <svg className="company-logo logo-svg" viewBox="0 0 72 72" aria-hidden="true">
      <rect width="72" height="72" rx="2" fill="#07183f" />
      <path
        d="M44.5 24.5A16 16 0 1 0 46 47l-8-8h20v20l-6.3-6.3A25 25 0 1 1 58 36H45.5a9.5 9.5 0 1 0-1 4.2H35V31h25v7H44.5Z"
        fill="#fff"
      />
    </svg>
  );
}

function CodeTechLogo() {
  return (
    <svg className="company-logo logo-svg" viewBox="0 0 72 72" aria-hidden="true">
      <rect width="72" height="72" rx="2" fill="#168400" />
      <text x="36" y="43" fill="#fff" fontSize="22" fontWeight="800" textAnchor="middle">
        &lt;CT&gt;
      </text>
    </svg>
  );
}

function InnogentLogo() {
  return (
    <svg className="company-logo logo-svg" viewBox="0 0 72 72" aria-hidden="true">
      <rect width="72" height="72" rx="2" fill="#ff7818" />
      <circle cx="36" cy="32" r="11" fill="#fff" />
      <path d="M30 45h12M31 51h10M36 12v7M19 19l5 5M53 19l-5 5M14 36h7M51 36h7" stroke="#fff" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

function PixelLogo() {
  return (
    <svg className="company-logo logo-svg" viewBox="0 0 72 72" aria-hidden="true">
      <rect width="72" height="72" rx="2" fill="#053bd6" />
      <path d="M31 14v44M31 16h12a14 14 0 0 1 0 28H31" fill="none" stroke="#fff" strokeWidth="5" />
      <path d="M20 20c9 0 18 8 18 18S29 56 20 56V20Z" fill="none" stroke="#fff" strokeWidth="4" />
    </svg>
  );
}

function GenericLogo({ company }) {
  const initials = company.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return <div className="company-logo logo-fallback">{initials}</div>;
}

function CompanyLogo({ company }) {
  const normalizedName = company.name.toLowerCase();

  if (company.logo) {
    return <img className="company-logo" src={assetUrl(company.logo)} alt={`${company.name} logo`} />;
  }

  if (normalizedName.includes("graffersid")) return <GraffersidLogo />;
  if (normalizedName.includes("code tech")) return <CodeTechLogo />;
  if (normalizedName.includes("innogent")) return <InnogentLogo />;
  if (normalizedName.includes("pixel")) return <PixelLogo />;

  return <GenericLogo company={company} />;
}

export default CompanyLogo;
