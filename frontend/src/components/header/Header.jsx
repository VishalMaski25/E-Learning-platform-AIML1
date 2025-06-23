// import React from "react";
// import "./header.css";
// import { Link } from "react-router-dom";

// const Header = ({ isAuth }) => {
//   return (
//     <header>
//       <div className="logo">E-Learning</div>

//       <div className="link">
//         <Link to={"/"}>Home</Link>
//         <Link to={"/courses"}>Courses</Link>
//         <Link to={"/contact"}>Contact Us</Link>
//         <Link to={"/attendance"}>Attendance</Link>
//         <Link to={"/recommend"}>Course Recommendation</Link>
//         {isAuth ? (
//           <Link to={"/account"}>Account</Link>
//         ) : (
//           <Link to={"/login"}>Login</Link>
//         )}
//       </div>

//     </header>
//   );
// };

// export default Header;


import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuth }) => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-[#000000] text-white">
      <div className="text-2xl font-bold">E-Learning</div>

      <div className="flex space-x-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/courses" className="hover:underline">
          Courses
        </Link>
        <Link to="/attendance" className="hover:underline">
          Attendance
        </Link>
        <Link to="/recommend" className="hover:underline">
          Course Recommendation
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact Us
        </Link>
          {/* Add Quiz link */}
          <li style={{listStyle:"none"}}>
                    <a href="https://quiz-frontend-new1.vercel.app/" target="_blank" rel="noopener noreferrer">
                        Take a Quiz
                    </a>
          </li>
        
        {isAuth ? (
          <Link to="/account" className="hover:underline">
            Account
          </Link>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
