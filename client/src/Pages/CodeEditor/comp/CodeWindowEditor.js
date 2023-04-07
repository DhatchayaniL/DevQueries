import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./code.css"


const CodeEditorWindow = ({onChange, language, code, theme}) => {
    const [value, setValue] = useState(code || "");
    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    // const onChange = (action, data) => {
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


    return(
        <div className="code-editor">
            <Editor
            height="85vh"
            width={`100%`} 
            language = {language || "javascript"} 
            value={value} 
            theme={theme} 
            defaultValue="// Start coding" 
            onChange={handleEditorChange}/>
        </div>
    )
};

export default CodeEditorWindow;






















































































// import React, { useEffect, useRef } from 'react';
// // import CodeMirror from './../../codemirror/lib/codemirror';

// // import './../../codemirror/lib/codemirror.css';
// // import './../../codemirror/theme/dracula.css';
// // import './../../codemirror/mode/javascript/javascript';

// const CodeMirrorEditor = ({ code, onChange }) => {
//   const codeEditorRef = useRef(null);

//   useEffect(() => {
//     const codeMirrorEditor = CodeMirror.fromTextArea(codeEditorRef.current, {
//       mode: 'javascript',
//       theme: 'material',
//       lineNumbers: true,
//     });
//     codeMirrorEditor.on('change', onChange);
//     return () => {
//       codeMirrorEditor.off('change', onChange);
//     };
//   }, [onChange]);

//   return <textarea ref={codeEditorRef} defaultValue={code} />;
// };

// export default CodeMirrorEditor;

// import CodeMirror from '@uiw/react-codemirror';
// import 'codemirror/keymap/sublime';
// import 'codemirror/theme/dracula.css';
// const code = 'const a = 0;';
// <CodeMirror
// value={code}
// options={{
// theme: 'dracula',
// keyMap: 'sublime',
// mode: 'jsx',
// }}
// />

// export default CodeMirrorEditor;
