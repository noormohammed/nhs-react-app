import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Page = ({ title, children }) => {
  return (
    <div className="main">
      <Header title={title || "Document"} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
