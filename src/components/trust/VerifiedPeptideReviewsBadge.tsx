type Variant = "home" | "product";

export function VerifiedPeptideReviewsBadge({ variant = "home" }: { variant?: Variant }) {
  if (variant === "product") {
    return (
      <div className="cp-pdp-vpr">
        <span>
          <small>PRODUCT DOCUMENTATION</small>
          <strong>Batch records and analytical reports where available</strong>
        </span>
        <em>View details</em>
      </div>
    );
  }

  return (
    <div className="cp-vpr">
      <span>
        <small>Transparent research supply</small>
        <strong>Documentation-first catalog</strong>
      </span>
      <em>ALI USA</em>
    </div>
  );
}
