// import React, { useEffect } from "react";
// import "./coursestudy.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { CourseData } from "../../context/CourseContext";
// import { server } from "../../main";

// const CourseStudy = ({ user }) => {
//   const params = useParams();

//   const { fetchCourse, course } = CourseData();
//   const navigate = useNavigate();

//   if (user && user.role !== "admin" && !user.subscription.includes(params.id))
//     return navigate("/");

//   useEffect(() => {
//     fetchCourse(params.id);
//   }, []);
//   return (
//     <>
//       {course && (
//         <div className="course-study-page">
//           <img src={`${server}/${course.image}`} alt="" width={350} />
//           <h2>{course.title}</h2>
//           <h4>{course.description}</h4>
//           <h5>by - {course.createdBy}</h5>
//           <h5>Duration - {course.duration} weeks</h5>
//           <Link to={`/lectures/${course._id}`}>
//             <h2>Lectures</h2>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default CourseStudy;


import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import "./coursestudy.css";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, [fetchCourse, params.id]);

  return (
    <>
      {course && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center h-auto min-h-[450px] transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="overflow-hidden rounded-lg mb-6 shadow-md">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            <p className="text-gray-500 text-sm mb-2">Instructor: {course.createdBy}</p>
            <p className="text-gray-500 text-sm mb-4">Duration: {course.duration} weeks</p>
            <Link
              to={`/lectures/${course._id}`}
              className="inline-block bg-[#0048b0] text-white py-2 px-4 rounded-lg mt-4 shadow-md hover:shadow-lg transition-all"
            >
              View Lectures
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
