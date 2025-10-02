import React from "react";

const SkeletonCard: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow animate-pulse h-48">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
  </div>
);

export default SkeletonCard;
