import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import Dashbord from "./pages/dashbord/Dashbord";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import AdminDashbord from "./admin/Dashboard/AdminDashbord";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Contact from "./pages/contact/Contact";
import StatsPlusContact from "./pages/contact/StatsPlusContact";
import Attendance from "./pages/face_recognition/Attendance";
import RecommendUI from "./pages/recommendation_ui/RecommendUI";
// ----------------------------------------------------------------
// import "./stylesheets/theme.css";
// import "./stylesheets/alignments.css";
// import "./stylesheets/textelements.css";
// import "./stylesheets/custom-components.css";
// import "./stylesheets/form-elements.css";
// import "./stylesheets/layout.css";
// import Exams from "./pages/admin/Exams";
// import AddEditExam from "./pages/admin/Exams/AddEditExam";
// import Loader from "./components/Loader";
// import { useSelector } from "react-redux";
// import WriteExam from "./pages/user/WriteExam";
// import UserReports from "./pages/user/UserReports";
// import AdminReports from "./pages/admin/AdminReports";
// import Home1 from "./pages/common/Home/Home1";
// import ProtectedRoute from "./components/ProtectedRoute";



const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <>
      <div >
        {loading ? (
          <Loading />
        ) : (
          <BrowserRouter>
            <Header isAuth={isAuth} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<StatsPlusContact></StatsPlusContact>} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/account"
                element={isAuth ? <Account user={user} /> : <Login />}
              />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route
                path="/register"
                element={isAuth ? <Home /> : <Register />}
              />
              <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
              <Route
                path="/forgot"
                element={isAuth ? <Home /> : <ForgotPassword />}
              />
              <Route
                path="/reset-password/:token"
                element={isAuth ? <Home /> : <ResetPassword />}
              />
              <Route
                path="/course/:id"
                element={isAuth ? <CourseDescription user={user} /> : <Login />}
              />
              <Route
                path="/payment-success/:id"
                element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
              />
              <Route
                path="/:id/dashboard"
                element={isAuth ? <Dashbord user={user} /> : <Login />}
              />
              <Route
                path="/course/study/:id"
                element={isAuth ? <CourseStudy user={user} /> : <Login />}
              />

              <Route
                path="/lectures/:id"
                element={isAuth ? <Lecture user={user} /> : <Login />}
              />

              <Route
                path="/admin/dashboard"
                element={isAuth ? <AdminDashbord user={user} /> : <Login />}
              />

              <Route
                path="/admin/course"
                element={isAuth ? <AdminCourses user={user} /> : <Login />}
              />
              <Route
                path="/admin/users"
                element={isAuth ? <AdminUsers user={user} /> : <Login />}
              />
              <Route
                path="/attendance"
                element={<Attendance></Attendance>}
              />
              <Route
                path="/recommend"
                element={<RecommendUI></RecommendUI>}
              />
              {/* ------------------------------------------------------- */}
              
              {/* User Routes */}
          {/* <Route
            path="/"
            element={
              // <ProtectedRoute>
                <Home1/>
              // </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/user/write-exam/:id"
            element={
              // <ProtectedRoute>
                <WriteExam />
              // </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/user/reports"
            element={
              // <ProtectedRoute>
                <UserReports />
              // </ProtectedRoute>
            }
          /> */}
          {/* Admin Routes */}
          {/* <Route
            path="/admin/exams"
            element={
              // <ProtectedRoute>
                <Exams />
              // </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/admin/exams/add"
            element={
              // <ProtectedRoute>
                <AddEditExam />
              // </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="/admin/exams/edit/:id"
            element={
              // <ProtectedRoute>
                <AddEditExam />
              // </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="/admin/reports"
            element={
              // <ProtectedRoute>
                <AdminReports />
              // </ProtectedRoute>
            }
          /> */}

            </Routes>
            <Footer />
          </BrowserRouter>
        )}
      </div>  </>
  );
};
export default App;


// const App = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-200">
//       <div className="p-6 max-w-sm bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Tailwind CSS Test</h1>
//         <p className="text-gray-600">
//           If you see this styled correctly, Tailwind is working!
//         </p>
//         <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
//           Click Me
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;

