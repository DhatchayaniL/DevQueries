import React from "react";
import "./code.css"

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      return (
        <pre className="output-window-content-error">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="output-window-content-success">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="output-window-content-success">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="output-window-content-error">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
      <div className="output-window-title">
      <h1 className="output-window">
        Output
      </h1>
      <div className="output-window-container">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </div>
  );
};

export default OutputWindow;