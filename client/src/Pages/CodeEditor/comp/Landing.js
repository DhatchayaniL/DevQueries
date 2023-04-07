import React, { useCallback, useEffect, useState } from "react";
import CodeWindowEditor from "./CodeWindowEditor";
import axios from "axios";
import { classnames } from "../Utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useCallback } from "react";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import Footer from "./Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
// import queryString from 'query-string';

// const queryString = require('query-string');
const javascriptDefault = `//Start coding...`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const handleCompile = useCallback(() => {
    setProcessing(true);
    const formData = new FormData();
    formData.append("language_id", language.id);
    formData.append("source_code", btoa(code));
    formData.append("stdin", btoa(customInput));

    // const options = {
    //   method: "POST",
    //   url: process.env.REACT_APP_RAPID_API_URL,
    //   params: { base64_encoded: "true", fields: "*" },
    //   headers: {
    //     "content-type": "application/json",
    //     "Content-Type": "application/json",
    //     "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
    //     "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    //   },
    //   data: formData,
    // };

    axios
      // .request(options)
      .post("https://judge0-ce.p.rapidapi.com/submissions", formData, {
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key":
            "83761a3689mshc4776c737db81aap1d9186jsn1599908d15a9",
        },
      })
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        console.log(err);
        let error = err.response ? err.response.data : err;
        let status = err.response ? err.response.status : undefined;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        if (err instanceof TypeError) {
          console.error(err.stack);
        } else {
          console.error(err.message, error);
        }
      });
  }, [setProcessing, language, code, customInput]);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress, handleCompile]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const checkStatus = async (token) => {
    // const options = {
    //   method: "GET",
    //   url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
    //   params: { base64_encoded: "true", fields: "*" },
    //   headers: {
    //     "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
    //     "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    //   },
    // };

    try {
      let response = await axios.get(
        "https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10",
        { params: { base64_encoded: "true", fields: "*" } },
        {
          headers: {
            "X-RapidAPI-Key":
              "83761a3689mshc4776c737db81aap1d9186jsn1599908d15a9",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
      console.log(response);
      // let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        className={toast}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="start"></div>
      <div className="dropdown">
        <div className="pad">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="pad">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="codewin">
        <div className="codeelement">
          <CodeWindowEditor
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme?.value}
          />
        </div>

        <div className="right-container">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flright-container">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames("buttoncompile", !code ? "opacity-50" : "")}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Landing;

// import React, { useCallback, useEffect, useState } from "react";
// import CodeWindowEditor from "./CodeWindowEditor";
// import axios from "axios";
// import { classnames } from "../Utils/general";
// import { languageOptions } from "../constants/languageOptions";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { defineTheme } from "../lib/defineTheme";
// import useKeyPress from "../hooks/useKeyPress";
// import Footer from "./Footer";
// import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
// import OutputDetails from "./OutputDetails";
// import ThemeDropdown from "./ThemeDropdown";
// import LanguagesDropdown from "./LanguageDropdown";

// const javascriptDefault = `//Start coding...`;

// const Landing = () => {
//   const [code, setCode] = useState(javascriptDefault);
//   const [customInput, setCustomInput] = useState("");
//   const [outputDetails, setOutputDetails] = useState(null);
//   const [processing, setProcessing] = useState(null);
//   const [theme, setTheme] = useState("cobalt");
//   const [language, setLanguage] = useState(languageOptions[0]);

//   const enterPress = useKeyPress("Enter");
//   const ctrlPress = useKeyPress("Control");

//   const onSelectChange = (sl) => {
//     console.log("selected Option...", sl);
//     setLanguage(sl);
//   };

//   const checkStatus = useCallback(async (token) => {
//     const options = {
//       method: "GET",
//       url:  process.env.REACT_APP_RAPID_API_URL + "/" + token,
//       params: { base64_encoded: "true", fields: "*"},
//       headers: {
//         "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//         "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//       },
//     };

//     try {
//       let response = await axios.request(options);
//       let statusId = response.data.status?.id;

//       // Processed - we have a result
//       if (statusId === 1 || statusId === 2) {
//         // still processing
//         setTimeout(() => {
//           checkStatus(token);
//         }, 2000);
//         return;
//       } else {
//         setProcessing(false);
//         setOutputDetails(response.data);
//         showSuccessToast(`Compiled Successfully!`);
//         console.log("response.data", response.data);
//         return;
//       }
//     } catch (err) {
//       console.log("err", err);
//       setProcessing(false);
//       showErrorToast();
//     }
//   }, []);

//   const handleCompile = useCallback(() => {
//     setProcessing(true);
//     const formData = new FormData();
//     formData.append("language_id", language.id);
//     formData.append("source_code", btoa(code));
//     formData.append("stdin", btoa(customInput));

//     const options = {
//       method: "POST",
//       url: process.env.REACT_APP_RAPID_API_URL,
//       params: {base64_encoded: "true", fields: "*"},
//       headers: {
//         "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//         "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//         "Content-Type": "application/x-www-form-urlencoded",
//         },
//         data: formData,
//         };
//         axios
//   .request(options)
//   .then((response) => {
//     console.log("handleCompile response", response);
//     const token = response.data.token;
//     checkStatus(token);
//   })
//   .catch((err) => {
//     console.log("handleCompile err", err);
//     setProcessing(false);
//     showErrorToast();
//   });
// }, [checkStatus, code, customInput, language]);

// useEffect(() => {
// if (enterPress && ctrlPress) {
// handleCompile();
// }
// }, [enterPress, ctrlPress, handleCompile]);

// const showSuccessToast = useCallback((msg) => {
// toast.success(msg, {
// position: "top-right",
// autoClose: 3000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// });
// }, []);

// const showErrorToast = useCallback(() => {
// toast.error("Something went wrong!", {
// position: "top-right",
// autoClose: 3000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// });
// }, []);

// return (
// <div className="min-h-screen flex flex-col">
// <div className="flex-grow bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
// <div className="bg-gray-800 px-4 py-5 rounded-md sm:p-6">
// <div className="mb-3">
// <LanguagesDropdown
//            languageOptions={languageOptions}
//            onSelectChange={onSelectChange}
//            selectedValue={language}
//          />
// </div>
// <div className="mb-3">
// <ThemeDropdown
//            selectedValue={theme}
//            onSelectChange={setTheme}
//            themes={defineTheme}
//          />
// </div>
// <div className="mb-3">
// <CodeWindowEditor
//            code={code}
//            setCode={setCode}
//            theme={theme}
//            language={language}
//          />
// </div>
// <div className="mb-3">
// <CustomInput
//            customInput={customInput}
//            setCustomInput={setCustomInput}
//          />
// </div>
// <div className="mb-3">
// <button
// className={classnames(
// "font-medium inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
// { "opacity-50 cursor-not-allowed": processing }
// )}
// onClick={handleCompile}
// disabled={processing}
// >
// {processing ? "Compiling..." : "Compile (ctrl + enter)"}
// </button>
// </div>
// {outputDetails && (
// <>
// <OutputWindow outputDetails={OutputDetails} />
// <OutputDetails outputDetails={outputDetails} />
// </>
// )}
// </div>
// </div>
// <Footer />
// <ToastContainer />
// </div>
// );
// };

// export default Landing;
