// import React from "react";
// import { MdDashboard } from "react-icons/md";
// import "./account.css";
// import { IoMdLogOut } from "react-icons/io";
// import { UserData } from "../../context/UserContext";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Account = ({ user }) => {
//   const { setIsAuth, setUser } = UserData();

//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     localStorage.clear();
//     setUser([]);
//     setIsAuth(false);
//     toast.success("Logged Out");
//     navigate("/login");
//   };
//   return (
//     <div>
//       {user && (
//         <div className="profile">
//           <h2>My Profile</h2>
//           <div className="profile-info">
//             <p>
//               <strong>Name - {user.name}</strong>
//             </p>

//             <p>
//               <strong>Email - {user.email}</strong>
//             </p>

//             <button
//               onClick={() => navigate(`/${user._id}/dashboard`)}
//               className="common-btn"
//             >
//               <MdDashboard />
//               Dashboard
//             </button>

//             <br />

//             {user.role === "admin" && (
//               <button
//                 onClick={() => navigate(`/admin/dashboard`)}
//                 className="common-btn"
//               >
//                 <MdDashboard />
//                 Admin Dashboard
//               </button>
//             )}

//             <br />

//             <button
//               onClick={logoutHandler}
//               className="common-btn"
//               style={{ background: "red" }}
//             >
//               <IoMdLogOut />
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Account;



import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>
          <div className="profile-info space-y-4">
            <p className="text-lg font-medium text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>

            <p className="text-lg font-medium text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>

            {/* Dashboard Button */}
            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="w-60 mt-3 border-2 border-[#0048b0] text-white bg-[#0048b0] py-3 px-6 rounded-lg hover:bg-[#003c8f] transition-all"
            >
              <MdDashboard className="inline-block mr-2" />
              Dashboard
            </button>

            {/* Admin Dashboard Button */}
            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="w-60 mt-3 border-2 border-[#0048b0] text-white bg-[#0048b0] py-3 px-6 rounded-lg hover:bg-[#003c8f] transition-all"
              >
                <MdDashboard className="inline-block mr-2" />
                Admin Dashboard
              </button>
            )}

            {/* Logout Button */}
            <button
              onClick={logoutHandler}
              className="w-60 mt-3 border-2 border-red-600 text-red-600 bg-white py-3 px-6 rounded-lg hover:bg-red-100 transition-all"
            >
              <IoMdLogOut className="inline-block mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
