// import React from "react";
// import "./footer.css";
// import {
//   AiFillFacebook,
//   AiFillTwitterSquare,
//   AiFillInstagram,
// } from "react-icons/ai";

// const Footer = () => {
//   return (
//     <footer>
//       <div className="footer-content">
//         <p>
//           &copy; 2024 Your E-Learning Platform. All rights reserved. 
//         </p>
//         <div className="social-links">
//           <a href="">
//             <AiFillFacebook />
//           </a>
//           <a href="">
//             <AiFillTwitterSquare />
//           </a>
//           <a href="">
//             <AiFillInstagram />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white py-8">
      <div className="text-center">
        <p className="mb-4 text-gray-400">
          &copy; 2024 Your E-Learning Platform. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 text-xl">
          <a
            href="#"
            className="hover:text-[#0048b0] transition duration-300"
            aria-label="Facebook"
          >
            <AiFillFacebook />
          </a>
          <a
            href="#"
            className="hover:text-[#0048b0] transition duration-300"
            aria-label="Twitter"
          >
            <AiFillTwitterSquare />
          </a>
          <a
            href="#"
            className="hover:text-[#0048b0] transition duration-300"
            aria-label="Instagram"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
