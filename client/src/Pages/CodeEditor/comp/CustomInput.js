import React from "react";
import { classnames } from "../Utils/general.js";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
         "custom-class"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;