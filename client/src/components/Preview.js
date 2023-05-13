import React from "react";
import myVideo from "../../src/previewVideo.mp4";

const Preview = () => {
  return (
    <div className="container text-center">
      <h1 className="mt-3">Project Preview</h1>
      <p className="lead">Welcome to our project preview! Watch the video below to get a glimpse of what our project is all about.</p>

      <div className="d-flex justify-content-center">
        <video width="640" height="360" controls>
          <source src={myVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <p className="mt-3">We hope you enjoyed the preview of our project. Stay tuned for more updates!</p>
    </div>
  );
};

export default Preview;