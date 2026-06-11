import React from "react";
import ExtrudeCard from "./ExtrudeCard.jsx";

export default function SkillPill({ label, ...props }) {
  return (
    <ExtrudeCard className="skillPill" tone="paper" {...props}>
      <span className="skillPillLabel">{label}</span>
    </ExtrudeCard>
  );
}
