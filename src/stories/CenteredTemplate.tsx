import React from "react";

interface CenteredTemplateProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const CenteredTemplate: React.FC<CenteredTemplateProps> = ({
  children,
  style,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      minWidth: "100vw",
      ...style,
    }}
  >
    {children}
  </div>
);

export default CenteredTemplate;
