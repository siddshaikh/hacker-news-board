import React from "react";
import "./JobPosting.css";

const JobPosting = ({ url, title, by, time }) => {
  const foramattedTime = new Date(time * 1000).toLocaleString();
  return (
    <div className="post" role="listitem">
      <h2 className="post__title">
        <a
          className={url ? "" : "inactive__link"}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </h2>
      <span className="post_meta__data">
        By {by} - {foramattedTime}
      </span>
    </div>
  );
};

export default JobPosting;
