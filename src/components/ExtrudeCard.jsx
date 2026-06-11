import React from "react";
import ExtrudeBase from "./ExtrudeBase.jsx";

export default function ExtrudeCard({
  as: Element = "div",
  className = "",
  tone = "paper",
  ...props
}) {
  const interactive = Element === "a" || Element === "button";

  return (
    <ExtrudeBase
      as={Element}
      tone={tone}
      interactive={interactive}
      className={["card", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

