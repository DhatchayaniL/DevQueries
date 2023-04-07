import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [questionImage, setQuestionImage] = useState(null); // New state for image
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody && questionTags) {
        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              questionTags,
              userPosted: User.result.name,
              questionImage, // Add image to the question object
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setQuestionImage(file); // Update image state on file upload
    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCancelImage = () => {
    setQuestionImage(null);
    setImagePreview(null);
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                className="questitle"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyDown={handleEnter}
              ></textarea>
            </label>
        <label htmlFor="ask-ques-image">
          <h4>Image</h4>
          <p>Upload an image related to your question (optional)</p>
          {questionImage ? (
            <>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="preview" className="preview-image" />
                  <button type="button" className="cancel-image-button" onClick={handleCancelImage}>
                    Cancel Image
                  </button>
                </>
              ) : (
                <p>Loading image preview...</p>
              )}
            </>
          ) : (
            <>
              <input
                type="file"
                id="ask-ques-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-input"
              />
              <p className="image-input-label">Accepted formats: JPEG, PNG, GIF. Max file size: 10MB.</p>
            </>
          )}
        </label>
        <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
            type="text"
            id="ask-ques-tags"
            onChange={(e) => {
              setQuestionTags(e.target.value);
            }}
            placeholder="e.g. R, vector, indexing"
            className="questags"
          />
        </label>
        <button type="submit" className="ask-ques-submit">
          Post
        </button>
      </div>
    </form>
  </div>
</div>
);
};

export default AskQuestion;



// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import "./AskQuestion.css";
// import { askQuestion } from "../../actions/question";

// const AskQuestion = () => {
//   const [questionTitle, setQuestionTitle] = useState("");
//   const [questionBody, setQuestionBody] = useState("");
//   const [questionTags, setQuestionTags] = useState("");
//   const [questionImage, setQuestionImage] = useState(null); // New state for image

//   const dispatch = useDispatch();
//   const User = useSelector((state) => state.currentUserReducer);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (User) {
//       if (questionTitle && questionBody && questionTags) {
//         dispatch(
//           askQuestion(
//             {
//               questionTitle,
//               questionBody,
//               questionTags,
//               userPosted: User.result.name,
//               questionImage, // Add image to the question object
//             },
//             navigate
//           )
//         );
//       } else alert("Please enter all the fields");
//     } else alert("Login to ask question");
//   };

//   const handleEnter = (e) => {
//     if (e.key === "Enter") {
//       setQuestionBody(questionBody + "\n");
//     }
//   };

//   const handleImageUpload = (e) => {
//     setQuestionImage(e.target.files[0]); // Update image state on file upload
//   };

//   return (
//     <div className="ask-question">
//       <div className="ask-ques-container">
//         <h1>Ask a public Question</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="ask-form-container">
//             <label htmlFor="ask-ques-title">
//               <h4>Title</h4>
//               <p>
//                 Be specific and imagine you're asking a question to another
//                 person
//               </p>
//               <input
//                 type="text"
//                 id="ask-ques-title"
//                 onChange={(e) => {
//                   setQuestionTitle(e.target.value);
//                 }}
//                 placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
//                 className="questitle"
//               />
//             </label>
//             <label htmlFor="ask-ques-body">
//               <h4>Body</h4>
//               <p>
//                 Include all the information someone would need to answer your
//                 question
//               </p>
//               <textarea
//                 name=""
//                 id="ask-ques-body"
//                 onChange={(e) => {
//                   setQuestionBody(e.target.value);
//                 }}
//                 cols="30"
//                 rows="10"
//                 onKeyDown={handleEnter}
//               ></textarea>
//             </label>
//             <label htmlFor="ask-ques-tags">
//               <h4>Tags</h4>
//               <p>Add up to 5 tags to describe what your question is about</p>
//               <input
//                 type="text"
//                 id="ask-ques-tags"
//                 onChange={(e) => {
//                   setQuestionTags(e.target.value.split(" "));
//                 }}
//                 placeholder="e.g. (xml typescript wordpress)"
//               />
//             </label>
//             <label htmlFor="ask-ques-image">
//               <h4>Image</h4>
//               <p>Upload an image related to your question (optional)</p>
//               <input
//                 type="file"
//                 id="ask-ques-image"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="image-input"/>
//                 </label>
//                 <button type="submit" className="ask-ques-submit">
//                 Post
//                 </button>
//                 </div>
//                 </form>
//                 </div>
//                 </div>
//                 );
//               };

// export default AskQuestion;
