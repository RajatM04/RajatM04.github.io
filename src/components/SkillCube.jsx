import React from "react";
import ExtrudeCard from "./ExtrudeCard.jsx";

export default function SkillCube({ label, sub }) {
  return (
    <ExtrudeCard className="skillCube" tone="paper">
      <div className="skillTop">
        <div className="skillLabel">{label}</div>
        <div className="skillBadge" aria-hidden="true">
          ■
        </div>
      </div>
      <div className="skillSub">{sub}</div>
    </ExtrudeCard>
  );
}

