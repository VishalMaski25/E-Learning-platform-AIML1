import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-8 bg-[#f4f7fc]">

<div className="flex-1 flex justify-end">
  <div
    className="flex flex-col items-start"
    style={{
      justifyContent: "center", // Ensures vertical alignment
    }}
  >
    <p
  className="text-5xl font-semibold text-[#000000] mb-6"
  style={{
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: "84px",
    lineHeight: "1.1", // Adjust this value as needed
  }}
>
  Learn Without<br />Limits
</p>

    <p
      className="text-lg text-gray-700 mb-8 leading-relaxed text-left"
      style={{
        fontFamily:
          'OpenSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: "20px",
      }}
    >
      Start, switch, or advance your career with more than 7,000 courses,<br/>
      Professional Certificates, and degrees from world-class universities <br />
      and companies.
    </p>
    <button
      onClick={() => navigate("/courses")}
      className="bg-[#0048b0] text-white px-6 py-3 rounded-md text-lg hover:bg-[#003080] transition duration-300"
      style={{
        width:"238px",
        height:"72px",
        fontSize:"20px",
        fontWeight:"600"
      }}
    >
      Getting Started
    </button>
  </div>
</div>


        {/* Hero Image */}
        {/* Hero Image */}
<div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
  <div className="flex justify-center">
    <img
      src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=1&w=459&h=497&q=40"
      alt="Learning"
      className="w-full max-w-lg"
    />
  </div>
</div>

      </div>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Home;
