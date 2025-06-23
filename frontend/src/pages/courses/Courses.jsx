

import React from "react";
import "./courses.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();

  console.log(courses);
  return (
    <div className="py-20 mb-100  text-center">
      <h2 className="text-2xl text-[#000000] mb-8" style={{fontWeight:"700"}}>Available Courses</h2>

      <div className="course-container flex flex-wrap justify-center gap-8">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;

