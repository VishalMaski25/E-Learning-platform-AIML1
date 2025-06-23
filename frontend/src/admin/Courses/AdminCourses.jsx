import React, { useState } from "react";
import Layout from "../Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => {
                return <CourseCard key={e._id} course={e} />;
              })
            ) : (
              <p>No Courses Yet</p>
            )}
          </div>
        </div>

<div className="w-full md:w-2/3 lg:w-1/2 mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Add Course</h2>
          {/* <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="createdBy" className="block text-sm font-medium text-gray-600">
                Created By
              </label>
              <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={""}>Select Category</option>
                {categories.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-600">
                Duration
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-600">
                Upload Image
              </label>
              <input
                type="file"
                required
                onChange={changeImageHandler}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {imagePrev && <img src={imagePrev} alt="Preview" className="mt-4 w-full h-auto rounded-lg shadow-md" />}
            </div>

            <button
              type="submit"
              disabled={btnLoading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {btnLoading ? "Please Wait..." : "Add"}
            </button>
          </form> */}
          <form onSubmit={submitHandler} className="space-y-4">
  <label htmlFor="text" className="block text-sm font-medium text-gray-700">Title</label>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    className="w-full p-2 border rounded-lg"
  />

  <label htmlFor="text" className="block text-sm font-medium text-gray-700">Description</label>
  <input
    type="text"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    className="w-full p-2 border rounded-lg"
  />

  <label htmlFor="text" className="block text-sm font-medium text-gray-700">Price</label>
  <input
    type="number"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    required
    className="w-full p-2 border rounded-lg"
  />

  <label htmlFor="text" className="block text-sm font-medium text-gray-700">Created By</label>
  <input
    type="text"
    value={createdBy}
    onChange={(e) => setCreatedBy(e.target.value)}
    required
    className="w-full p-2 border rounded-lg"
  />

  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full p-2 border rounded-lg"
  >
    <option value={""}>Select Category</option>
    {categories.map((e) => (
      <option value={e} key={e}>
        {e}
      </option>
    ))}
  </select>

  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
  <input
    type="number"
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
    required
    className="w-full p-2 border rounded-lg"
  />

  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Course Image</label>
  <input type="file" required onChange={changeImageHandler} className="w-full p-2 border rounded-lg" />
  {imagePrev && <img src={imagePrev} alt="Preview" width={300} className="mt-4 rounded-lg" />}

  <button
    type="submit"
    disabled={btnLoading}
    className="mt-3 w-full border-2 border-[#0048b0] text-white bg-[#0048b0] py-2 px-4 rounded-lg transition-all"
  >
    {btnLoading ? "Please Wait..." : "Add"}
  </button>
</form>

        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
