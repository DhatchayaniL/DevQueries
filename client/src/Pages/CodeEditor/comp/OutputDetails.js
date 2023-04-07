import React from "react";
import "./code.css"

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container">
      <p className="metrics-container-p">
        Status:{" "}
        <span className="outputstatus">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p>
        Memory:{" "}
        <span className="outputstatus">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="metrics-container-p">
        Time:{" "}
        <span className="outputstatus">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;