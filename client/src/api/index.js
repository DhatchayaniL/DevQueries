import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000',});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("Profile")).token
      }`;
    }
    return req;
  });
  
  export const logIn = (authData) => API.post("/api/v1/user/login", authData);
  export const signUp = (authData) => API.post("/api/v1/user/signup", authData);
  
  export const postQuestion = (questionData) =>
    API.post("/api/v1/questions/Ask", questionData);
  export const getAllQuestions = () => API.get("/api/v1/questions/get");
  export const deleteQuestion = (id) => API.delete(`/api/v1/questions/delete/${id}`);
  export const voteQuestion = (id, value) =>
    API.patch(`/api/v1/questions/vote/${id}`, { value });
  
  export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
    API.patch(`/api/v1/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
  export const deleteAnswer = (id, answerId, noOfAnswers) =>
    API.patch(`/api/v1/answer/delete/${id}`, { answerId, noOfAnswers });
  
  export const getAllUsers = () => API.get("/api/v1/user/getAllUsers");
  export const updateProfile = (id, updateData) =>
    API.patch(`/api/v1/user/update/${id}`, updateData);