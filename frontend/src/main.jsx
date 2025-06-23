import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { CourseContextProvider } from "./context/CourseContext.jsx";
import './App.css';
// import { Provider } from "react-redux";
// import Store1 from "./redux/Store1.jsx";




export const server = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
      {/* <Provider store={Store1}> */}
         <App />
      {/* </Provider> */}
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
