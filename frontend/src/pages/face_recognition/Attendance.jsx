import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Attendance = () => {
  const [capturing, setCapturing] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const captureAttendance = async (screenshot) => {
    try {
      const blob = await fetch(screenshot).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image", blob);

      const response = await axios.post(
        "http://localhost:1024/mark_attendance",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show success toast
      toast.success(response.data.message);
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.message || "Error marking attendance");
    }
  };

  const handleCapture = () => {
    setCapturing(true);
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      captureAttendance(screenshot);
    }
    setCapturing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
        Face Recognition Attendance
      </h1>

      <div className="shadow-lg rounded-xl overflow-hidden bg-white p-6 max-w-4xl">
        <Webcam
          audio={false}
          height={480}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg border border-gray-200"
          width={640}
          videoConstraints={videoConstraints}
        />
        <button
          onClick={handleCapture}
          disabled={capturing}
          className={`mt-6 px-8 py-3 font-semibold text-white rounded-lg ${
            capturing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105 transform transition"
          }`}
        >
          {capturing ? "Capturing..." : "Mark Attendance"}
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Attendance;




// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Attendance = () => {
//   const [capturing, setCapturing] = useState(false);
//   const webcamRef = useRef(null);

//   const videoConstraints = {
//     width: 640,
//     height: 480,
//     facingMode: "user",
//   };

//   const captureAttendance = async (screenshot) => {
//     try {
//       const blob = await fetch(screenshot).then((res) => res.blob());
//       const formData = new FormData();
//       formData.append("image", blob);

//       const response = await axios.post(
//         "http://localhost:8000/mark_attendance",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // Show success toast
//       toast.success(response.data.message);
//     } catch (error) {
//       // Show error toast
//       toast.error(error.response?.data?.message || "Error marking attendance");
//     }
//   };

//   const handleCapture = () => {
//     setCapturing(true);
//     const screenshot = webcamRef.current.getScreenshot();
//     if (screenshot) {
//       captureAttendance(screenshot);
//     }
//     setCapturing(false);
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Face Recognition Attendance</h1>
//       <Webcam
//         audio={false}
//         height={480}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={640}
//         videoConstraints={videoConstraints}
//       />
//       <br />
//       <button
//         onClick={handleCapture}
//         disabled={capturing}
//         style={{
//           margin: "10px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           cursor: capturing ? "not-allowed" : "pointer",
//         }}
//       >
//         {capturing ? "Capturing..." : "Mark Attendance"}
//       </button>
//       {/* Toast Container for displaying toasts */}
//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// };

// export default Attendance;




// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const Attendance = () => {
//   const [message, setMessage] = useState("");
//   const [capturing, setCapturing] = useState(false);

//   const webcamRef = useRef(null);

//   const videoConstraints = {
//     width: 640,
//     height: 480,
//     facingMode: "user",
//   };

//   const captureAttendance = async (screenshot) => {
//     try {
//       const blob = await fetch(screenshot).then((res) => res.blob());
//       const formData = new FormData();
//       formData.append("image", blob);

//       const response = await axios.post(
//         "http://localhost:8000/mark_attendance",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Error marking attendance"
//       );
//     }
//   };

//   const handleCapture = () => {
//     setCapturing(true);
//     const screenshot = webcamRef.current.getScreenshot();
//     if (screenshot) {
//       captureAttendance(screenshot);
//     }
//     setCapturing(false);
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Face Recognition Attendance</h1>
//       <Webcam
//         audio={false}
//         height={480}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={640}
//         videoConstraints={videoConstraints}
//       />
//       <br />
//       <button
//         onClick={handleCapture}
//         disabled={capturing}
//         style={{
//           margin: "10px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           cursor: capturing ? "not-allowed" : "pointer",
//         }}
//       >
//         {capturing ? "Capturing..." : "Mark Attendance"}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Attendance;
