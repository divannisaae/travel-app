import React, { type JSX } from "react";

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-5 h-5" }) => {
  const icons: Record<string, JSX.Element> = {
    User: <svg className={className} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>,
    Plus: <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M12 5v14m7-7H5" stroke="currentColor" /></svg>,
  };
  return icons[name] || <div className={className}>?</div>;
};

export default Icon;
