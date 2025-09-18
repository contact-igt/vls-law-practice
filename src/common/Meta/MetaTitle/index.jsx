import Head from "next/head";
import React from "react";

export const MetaTitle = ({ title, description, keywords }) => {
  const defaultTitle =
    "Decoding of Practice – Real Law Begins Here - VLS LAW ACADEMY";
  const defaultDescription =
    "Build the courtroom skills law school never taught you. From filing to arguing – master it all in just 10 months";
  const defaultKeywords =
    "Law school gives you theory. We give you real courtroom practice. Whether you aim to become a judge, a practicing advocate, or a corporate lawyer — this course gives you the hands-on legal skills you need to start your career with clarity and confidence";

  return (
    <Head>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
    </Head>
  );
};
