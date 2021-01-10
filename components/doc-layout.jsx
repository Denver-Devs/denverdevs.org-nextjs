import React from "react";

const DocLayout = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="prose dark:prose-dark">{children}</div>
      </div>
    </div>
  );
};

export default DocLayout;
