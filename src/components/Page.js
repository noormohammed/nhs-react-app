import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Footer from "./Footer";

/**
 * Page Component creates a page/view
 *
 * @component
 * @example
 * return (<Page title="Hello World!"><Children /></Page>)
 * @param {*} {title} any string
 */
const Page = ({ title, children }) => {
  return (
    <div className="main">
      <Header title={title || "Document"} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

/**
 * Props required to create Page Component
 */
Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Page;
