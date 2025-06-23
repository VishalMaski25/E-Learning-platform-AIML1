// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../Utils/Layout";
// import axios from "axios";
// import { server } from "../../main";
// import "./dashboard.css";

// const AdminDashbord = ({ user }) => {
//   const navigate = useNavigate();

//   if (user && user.role !== "admin") return navigate("/");

//   const [stats, setStats] = useState([]);

//   async function fetchStats() {
//     try {
//       const { data } = await axios.get(`${server}/api/stats`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       setStats(data.stats);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchStats();
//   }, []);
//   return (
//     <div>
//       <Layout>
//         <div className="main-content">
//           <div className="box">
//             <p>Total Courses</p>
//             <p>{stats.totalCoures}</p>
//           </div>
//           <div className="box">
//             <p>Total Lectures</p>
//             <p>{stats.totalLectures}</p>
//           </div>
//           <div className="box">
//             <p>Total Users</p>
//             <p>{stats.totalUsers}</p>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default AdminDashbord;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen text-black w-screen">
      <Layout>
        <div className="py-8 max-w-7xl mx-auto text-center ">
          <h1 className="text-4xl font-bold text-[#000000] mb-12">Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {/* Card 1 - Total Courses */}
            <div className="bg-[#0048b0] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:bg-gray-800 transition-all transform hover:-translate-y-1">
              <p className="text-lg font-semibold mb-3">Total Courses</p>
              <p className="text-4xl font-bold">{stats.totalCoures}</p>
            </div>
            {/* Card 2 - Total Lectures */}
            <div className="bg-[#0048b0] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:bg-gray-800 transition-all transform hover:-translate-y-1">
              <p className="text-lg font-semibold mb-3">Total Lectures</p>
              <p className="text-4xl font-bold">{stats.totalLectures}</p>
            </div>
            {/* Card 3 - Total Users */}
            <div className="bg-[#0048b0] text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:bg-gray-800 transition-all transform hover:-translate-y-1">
              <p className="text-lg font-semibold mb-3">Total Users</p>
              <p className="text-4xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
