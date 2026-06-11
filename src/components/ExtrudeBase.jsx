import React from "react";

export default function ExtrudeBase({
  as: Element = "div",
  className = "",
  tone = "paper",
  interactive = false,
  children,
  ...props
}) {
  const classes = [
    "extrude",
    interactive ? "extrudeInteractive" : "",
    tone === "gray" ? "extrudeToneGray" : "extrudeTonePaper",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const Wrapper = interactive ? "span" : "div";

  return (
    <Element className={classes} {...props}>
      <Wrapper className="extrudeContent">{children}</Wrapper>
    </Element>
  );
}
