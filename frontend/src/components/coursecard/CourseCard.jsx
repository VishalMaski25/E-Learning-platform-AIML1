// // import React from "react";
// // import "./courseCard.css";
// // import { server } from "../../main";
// // import { UserData } from "../../context/UserContext";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";
// // import axios from "axios";
// // import { CourseData } from "../../context/CourseContext";

// // const CourseCard = ({ course }) => {
// //   const navigate = useNavigate();
// //   const { user, isAuth } = UserData();

// //   const { fetchCourses } = CourseData();

// //   const deleteHandler = async (id) => {
// //     if (confirm("Are you sure you want to delete this course")) {
// //       try {
// //         const { data } = await axios.delete(`${server}/api/course/${id}`, {
// //           headers: {
// //             token: localStorage.getItem("token"),
// //           },
// //         });

// //         toast.success(data.message);
// //         fetchCourses();
// //       } catch (error) {
// //         toast.error(error.response.data.message);
// //       }
// //     }
// //   };
// //   return (
// //     <div className="course-card">
// //       <img src={`${server}/${course.image}`} alt="" className="course-image" />
// //       <h3>{course.title}</h3>
// //       <p>Instructor- {course.createdBy}</p>
// //       <p>Duration- {course.duration} weeks</p>
// //       <p>Price- ₹{course.price}</p>
// //       {isAuth ? (
// //         <>
// //           {user && user.role !== "admin" ? (
// //             <>
// //               {user.subscription.includes(course._id) ? (
// //                 <button
// //                   onClick={() => navigate(`/course/study/${course._id}`)}
// //                   className="common-btn"
// //                 >
// //                   Study
// //                 </button>
// //               ) : (
// //                 <button
// //                   onClick={() => navigate(`/course/${course._id}`)}
// //                   className="common-btn"
// //                 >
// //                   Get Started
// //                 </button>
// //               )}
// //             </>
// //           ) : (
// //             <button
// //               onClick={() => navigate(`/course/study/${course._id}`)}
// //               className="common-btn"
// //             >
// //               Study
// //             </button>
// //           )}
// //         </>
// //       ) : (
// //         <button onClick={() => navigate("/login")} className="common-btn">
// //           Get Started
// //         </button>
// //       )}

// //       <br />

// //       {user && user.role === "admin" && (
// //         <button
// //           onClick={() => deleteHandler(course._id)}
// //           className="common-btn"
// //           style={{ background: "red" }}
// //         >
// //           Delete
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default CourseCard;


// import React from "react";
// import { server } from "../../main";
// import { UserData } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { CourseData } from "../../context/CourseContext";

// const CourseCard = ({ course }) => {
//   const navigate = useNavigate();
//   const { user, isAuth } = UserData();
//   const { fetchCourses } = CourseData();

//   const deleteHandler = async (id) => {
//     if (confirm("Are you sure you want to delete this course?")) {
//       try {
//         const { data } = await axios.delete(`${server}/api/course/${id}`, {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         });

//         toast.success(data.message);
//         fetchCourses();
//       } catch (error) {
//         toast.error(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <div className="group bg-[#f0f4ff] shadow-[0px_10px_30px_rgba(0,0,0,0.2),0px_20px_40px_rgba(95,0,217,0.2)] p-5 rounded-xl text-center w-full max-w-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0px_15px_50px_rgba(0,0,0,0.3),0px_25px_60px_rgba(95,0,217,0.3)] overflow-hidden animate-slide-in-bottom">
//       {/* Course Image */}
//       <div className="overflow-hidden rounded-lg h-60 mb-3">
//         <img
//           src={`${server}/${course.image}`}
//           alt={course.title}
//           className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(95,0,217,0.4)]"
//         />
//       </div>

//       {/* Card Content */}
//       <h3 className="text-2xl font-bold text-[#000000] mb-3">{course.title}</h3>
//       <p className="text-sm text-gray-600 mb-2">Instructor: {course.createdBy}</p>
//       <p className="text-sm text-gray-600 mb-2">Duration: {course.duration} weeks</p>
//       <p className="text-sm text-gray-600 mb-2">Price: ₹{course.price}</p>

//       {/* Authenticated User Options */}
//       {isAuth ? (
//         <>
//           {user && user.role !== "admin" ? (
//             <>
//               {user.subscription.includes(course._id) ? (
//                 <button
//                   onClick={() => navigate(`/course/study/${course._id}`)}
//                   className="mt-3 w-60 border-2 border-[#0048b0]  text-white bg-[#0048b0] py-3 px-6 rounded-lg  transition-all"
//                 >
//                   Study
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => navigate(`/course/${course._id}`)}
//                   className="mt-3 w-60 border-2 border-[#0048b0]  text-[#0048b0] bg-white py-3 px-6 rounded-lg  transition-all"
//                 >
//                   Get Started
//                 </button>
//               )}
//             </>
//           ) : (
//             <button
//               onClick={() => navigate(`/course/study/${course._id}`)}
//               className="mt-3 w-60 border-2 border-[#0048b0]  text-white bg-[#0048b0] py-3 px-6 rounded-lg  transition-all"
//             >
//               Study
//             </button>
//           )}
//         </>
//       ) : (
//         <button
//           onClick={() => navigate("/login")}
//           className="mt-3 w-60 border-2 border-[#0048b0]  text-[#0048b0] bg-white py-3 px-6 rounded-lg  transition-all"
//         >
//           Get Started
//         </button>
//       )}

//       {/* Admin Delete Button */}
//       {user && user.role === "admin" && (
//         <button
//           onClick={() => deleteHandler(course._id)}
//           className="mt-3 w-60 border-2 border-[#0048b0]  text-[#0048b0] bg-white py-3 px-6 rounded-lg  transition-all"
//         >
//           Delete
//         </button>
//       )}
//     </div>
//   );
// };

// export default CourseCard;


import React from "react";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="group bg-[#f0f4ff] p-4 shadow-[0px_10px_30px_rgba(0,0,0,0.3)] rounded-xl text-center w-full max-w-xs transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.3)] overflow-hidden animate-slide-in-bottom">
  {/* Course Image */}
      <div className="overflow-hidden rounded-lg h-48 mb-3">
        <img
          src={`${server}/${course.image}`}
          alt={course.title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(95,0,217,0.4)]"
        />
      </div>

      {/* Card Content */}
      <h3 className="text-xl font-bold text-[#000000] mb-3">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-2">Instructor: {course.createdBy}</p>
      <p className="text-sm text-gray-600 mb-2">Duration: {course.duration} weeks</p>
      <p className="text-sm text-gray-600 mb-2">Price: ₹{course.price}</p>

      {/* Authenticated User Options */}
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="mt-3 w-52 border-2 border-[#0048b0] text-white bg-[#0048b0] py-2 px-4 rounded-lg transition-all"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="mt-3 w-52 border-2 border-[#0048b0] text-[#0048b0] bg-white py-2 px-4 rounded-lg transition-all"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="mt-3 w-52 border-2 border-[#0048b0] text-white bg-[#0048b0] py-2 px-4 rounded-lg transition-all"
            >
              Study
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="mt-3 w-52 border-2 border-[#0048b0] text-[#0048b0] bg-white py-2 px-4 rounded-lg transition-all"
        >
          Get Started
        </button>
      )}

      {/* Admin Delete Button */}
      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="mt-3 w-52 border-2 border-[#0048b0] text-[#0048b0] bg-white py-2 px-4 rounded-lg transition-all"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
