import React from "react";

const ColumnElement = ({ children, style, ...props }) => (
  <div
    style={{
      minHeight: 40,
      minWidth: 60,
      flex: style?.flex || 1,
      padding: style?.padding || "0 16px",
      ...style,
      display: "flex",
      flexDirection: "column",
    }}
    {...props}
  >
    {children}
  </div>
);

export default ColumnElement;
