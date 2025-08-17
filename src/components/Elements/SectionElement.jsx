import React from "react";

const SectionElement = ({ children, style, ...props }) => (
  <section
    style={{
      minHeight: 80,
      padding: "32px 0",
      width: "100%",
      background: style?.background || "#fff",
      ...style,
    }}
    {...props}
  >
    {children}
  </section>
);

export default SectionElement;
