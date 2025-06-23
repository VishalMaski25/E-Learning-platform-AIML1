import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

function RecommendUI() {
  const [title, setTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const response = await axios.post('http://127.0.0.1:3000/recommend', { title }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRecommendations(response.data.recommended_courses);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Course Recommendation System</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mb-6">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Enter Course Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., React"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {recommendations.length > 0 && (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Recommended Courses:</h2>
          <ul className="list-disc list-inside space-y-2">
            {recommendations.map((course, index) => (
              <li key={index} className="text-gray-600">
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecommendUI


// import React, { useState } from 'react';
// import axios from 'axios';
// import 'tailwindcss/tailwind.css';

// function RecommendUI() {
//   const [title, setTitle] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setRecommendations([]);

//     try {
//       const response = await axios.post('http://127.0.0.1:3000/recommend', { title }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setRecommendations(response.data.recommended_courses);
//     } catch (err) {
//       setError('Failed to fetch recommendations. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-extrabold text-blue-700 mb-6">Course Recommendation System</h1>

//       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 mb-6 border-t-4 border-blue-500">
//         <label htmlFor="title" className="block text-gray-700 font-semibold mb-3">
//           Enter Course Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="e.g., JavaScript"
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//           required
//         />
//         <button
//           type="submit"
//           className="mt-5 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//         >
//           {loading ? 'Loading...' : 'Get Recommendations'}
//         </button>
//       </form>

//       {error && <p className="text-red-600 font-semibold">{error}</p>}

//       {recommendations.length > 0 && (
//         <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 border-t-4 border-green-400">
//           <h2 className="text-2xl font-bold text-gray-700 mb-4">Recommended Courses:</h2>
//           <ul className="list-disc list-inside space-y-3">
//             {recommendations.map((course, index) => (
//               <li key={index} className="text-gray-600 text-lg">
//                 {course}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RecommendUI;


