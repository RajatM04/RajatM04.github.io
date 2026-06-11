import React from "react";
import ExtrudeBase from "./ExtrudeBase.jsx";

export default function ExtrudeButton({
  as = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const v =
    variant === "secondary"
      ? "btnSecondary"
      : variant === "ghost"
        ? "btnGhost"
        : "btnPrimary";

  const s = size === "sm" ? "btnSm" : "btnMd";

  const safeProps =
    as === "button" && props.type == null ? { ...props, type: "button" } : props;

  return (
    <ExtrudeBase
      as={as}
      interactive
      className={["btn", v, s, className].filter(Boolean).join(" ")}
      {...safeProps}
    />
  );
}
