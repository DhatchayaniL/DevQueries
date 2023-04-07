// // import React from 'react'

// // const Button = () => {
// //   return (
// //     <div>
        
// //     </div>
// //   )
// // }

// // export default Button

// import React, { useEffect, useState } from "react";
// import CodeEditorWindow from "./CodeWindowEditor";
// import "./code.css"
// import axios from "axios";
// import { classnames } from "../Utils/general.js";
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

  
//   const HandleCompile = () => {
//     setProcessing(true);
//     const formData = {
//       language_id: language.id,
//       // encode source code in base64
//       source_code: btoa(code),
//       stdin: btoa(customInput),
//     };
//     const options = {
//       method: "POST",
//       url: process.env.REACT_APP_RAPID_API_URL,
//       params: { base64_encoded: "true", fields: "*" },
//       headers: {
//         "content-type": "application/json",
//         "Content-Type": "application/json",
//         "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//         "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//       },
//       data: formData,
//     };

//     useEffect(() => {
//       if (enterPress && ctrlPress) {
//         console.log("enterPress", enterPress);
//         console.log("ctrlPress", ctrlPress);
//         HandleCompile();
//       }
//     }, [ctrlPress, enterPress]);

//   const onChange = (action, data) => {
//     switch (action) {
//       case "code": {
//         setCode(data);
//         break;
//       }
//       default: {
//         console.warn("case not handled!", action, data);
//       }
//     }
//   };

//     axios
//       .request(options)
//       .then(function (response) {
//         console.log("res.data", response.data);
//         const token = response.data.token;
//         checkStatus(token);
//       })
//       .catch((err) => {
//         let error = err.response ? err.response.data : err;
//         // get error status
//          let status = err.response ? err.response.status : undefined;
//         console.log("status", status);
//         if (status === 429) {
//           console.log("too many requests", status);

//           showErrorToast(
//             `you know!`,
//             10000
//           );
//         }
//         setProcessing(false);
//         console.log("catch block...", error);
//       });
//   };

  

//   const checkStatus = async (token) => {
//     const options = {
//       method: "GET",
//       url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
//       params: { base64_encoded: "true", fields: "*" },
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
//   };

//   function handleThemeChange(th) {
//     const theme = th;
//     console.log("theme...", theme);

//     if (["light", "vs-dark"].includes(theme.value)) {
//       setTheme(theme);
//     } else {
//       defineTheme(theme.value).then((_) => setTheme(theme));
//     }
//   }
//   useEffect(() => {
//     defineTheme("oceanic-next").then((_) =>
//       setTheme({ value: "oceanic-next", label: "Oceanic Next" })
//     );
//   }, []);

//   const showSuccessToast = (msg) => {
//     toast.success(msg || `Compiled Successfully!`, {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };
//   const showErrorToast = (msg, timer) => {
//     toast.error(msg || `Something went wrong! Please try again.`, {
//       position: "top-right",
//       autoClose: timer ? timer : 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };

//   return (
//     <>

//       <ToastContainer
//   style={{
//     top: "1rem",
//     right: "1rem",
//     borderRadius: "0.375rem",
//     padding: "0.5rem 1rem",
//     fontSize: "1rem",
//     backgroundColor: "#fff",
//     color: "#000",
//     boxShadow: "0 0 1rem rgba(0, 0, 0, 0.2)",
//   }}
//   autoClose={2000}
//   hideProgressBar={false}
//   newestOnTop={false}
//   closeOnClick
//   rtl={false}
//   pauseOnFocusLoss
//   draggable
//   pauseOnHover
// />


//       <div className="start"></div>
//       <div className="dropdown">
//         <div className="pad">
//           <LanguagesDropdown onSelectChange={onSelectChange} />
//         </div>
//         <div className="pad">
//           <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
//         </div>
//       </div>
     
//       <div className="codewin">
//         <div className="codeelement">
//           <CodeEditorWindow
//             // code={code}
//             // setCode={setCode}
//             // onChange={onChange}
//             language={language?.value}
//             theme={theme.value}
//           />
//         </div>

//         <div className="right-container">
//           <OutputWindow outputDetails={outputDetails} />
//           <div className="flright-container">
//             <CustomInput
//               customInput={customInput}
//               setCustomInput={setCustomInput}
//             />
//             <button
//               onClick={HandleCompile}
//               disabled={!code}
//               className={classnames(
//                 "buttoncompile",
//                 !code ? "opacity-50" : ""
//               )}
//             >
//               {processing ? "Processing..." : "Compile and Execute"}
//             </button>
//           </div>
//           {outputDetails && <OutputDetails outputDetails={outputDetails} />}
//         </div>
//         </div>
//       <Footer />
//     </>
//   );
// };
// export default Landing;