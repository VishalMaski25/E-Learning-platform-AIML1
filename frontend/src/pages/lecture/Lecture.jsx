import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import { jsPDF } from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";


const Notes = () => {
  const [lines, setLines] = useState([]);
  const [noteName, setNoteName] = useState("");
  const [loadNoteName, setLoadNoteName] = useState("");
  const [eraserMode, setEraserMode] = useState(false);
  const [penColor, setPenColor] = useState("black");
  const [eraserSize, setEraserSize] = useState(10);
  const [fileName, setFileName] = useState("drawing");
  const isDrawing = useRef(false);
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      {
        points: [pos.x, pos.y],
        color: eraserMode ? "white" : penColor,
        size: eraserMode ? eraserSize : 3,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const downloadPDF = () => {
    const stage = stageRef.current;
    const dataURL = stage.toDataURL({ pixelRatio: 2 });
    const pdf = new jsPDF("landscape");
    pdf.addImage(dataURL, "PNG", 10, 10, 280, 150);
    pdf.save(`${fileName || "drawing"}.pdf`);
  };

   const saveNote = async () => {
    if (!noteName) {
      alert("Please enter a name for the drawing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/save-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, name: noteName }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert(`Note saved successfully! ID: ${data.id}`);
      } else if (response.status === 409) {
        const userChoice = window.confirm(
          `${data.message}\n\nDo you want to update the existing note?`
        );

        if (userChoice) {
          const updateResponse = await fetch("http://localhost:8000/update-note", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lines, name: noteName }),
          });

          const updateData = await updateResponse.json();

          if (updateResponse.ok) {
            alert(updateData.message);
          } else {
            alert(updateData.error || "Failed to update the note.");
          }
        } else {
          alert("Please rename your note to save it.");
        }
      } else {
        alert(data.error || "Failed to save note.");
      }
    } catch (error) {
      alert("Error saving note. Check console for details.");
      console.error("Save Note Error:", error);
    }
  };
  
    // Function to load a note by name
    const loadNote = async () => {
      if (!loadNoteName) {
        alert("Please enter a valid note name to load.");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:8000/note/${loadNoteName}`);
        const data = await response.json();
        if (response.ok) {
          setLines(data.lines);
        } else {
          alert(data.error || "Failed to load note.");
        }
      } catch (error) {
        alert("Error loading note. Check console for details.");
        console.error("Load Note Error:", error);
      }
    };

  return (
    <div className="p-4 space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEraserMode(false)}
            className={`px-4 py-2 rounded ${
              !eraserMode ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Pen
          </button>
          <button
            onClick={() => setEraserMode(true)}
            className={`px-4 py-2 rounded ${
              eraserMode ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Eraser
          </button>
        </div>

        {/* Pen/Eraser Config */}
        {eraserMode ? (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Eraser Size:</label>
            <input
              type="range"
              min="5"
              max="50"
              value={eraserSize}
              onChange={(e) => setEraserSize(parseInt(e.target.value, 10))}
              className="w-24"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Pen Color:</label>
            <select
              value={penColor}
              onChange={(e) => setPenColor(e.target.value)}
              className="p-2 border border-gray-300 rounded shadow-sm"
            >
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
        )}

        {/* Save/Load Options */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
              placeholder="Save Name"
              className="w-28 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={saveNote}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={loadNoteName}
              onChange={(e) => setLoadNoteName(e.target.value)}
              placeholder="Load Name"
              className="w-28 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={loadNote}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Load
            </button>
          </div>
        </div>
      </div>

      {/* Drawing Area */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Drawing Area</h2>
        <Stage
          ref={stageRef}
          width={window.innerWidth - 100}
          height={window.innerHeight - 300}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="border border-gray-300 shadow rounded"
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.size}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
        </Stage>
        <button
          onClick={downloadPDF}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

// export default Notes;


const Lectures = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // Ensure only subscribed users can access
  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    }
  }, [user, params.id, navigate]);

  // Fetch lectures
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        setLectures(data.lectures);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchProgress = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        setProgress(data.progress);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLectures();
    fetchProgress();
  }, [params.id]);

  // Select a lecture
  const selectLecture = async (id) => {
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="container mx-auto p-6 h-screen flex flex-col gap-6">
      {/* Video Player Section */}
      <div className="bg-white shadow-lg rounded p-6 flex flex-col">
        {lecture.video ? (
          <>
            <div className="w-full">
              <video
                src={`${server}/${lecture.video}`}
                controls
                className="w-full rounded-lg shadow-sm"
                onEnded={() => console.log("Lecture completed")}
              />
            </div>
            {/* <h1 className="text-2xl font-bold mt-4">{lecture.title}</h1>
            <p className="text-gray-600 mt-2">{lecture.description}</p> */}
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>Select a lecture to view.</p>
          </div>
        )}
      </div>
  
      {/* Available Lectures Section */}
      <div className="bg-white shadow-lg rounded p-6 flex flex-col overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Available Lectures</h2>
        <div className="space-y-4">
          {lectures.length ? (
            lectures.map((lec, index) => (
              <div
                key={lec._id}
                className={`flex items-center p-4 border rounded shadow-sm hover:bg-gray-100 cursor-pointer ${
                  progress.includes(lec._id) ? "border-green-500" : "border-gray-300"
                }`}
                onClick={() => selectLecture(lec._id)}
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${lec.videoId}/default.jpg`}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Lecture Info */}
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800">{lec.title}</h3>
                  <p className="text-sm text-gray-500">{lec.duration} mins</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No lectures available.</p>
          )}
        </div>
      </div>
    </div>
  </>


  );
};

// export default Lectures;


const Lecture = ({ user }) => {
  const [isLecturesLoaded, setIsLecturesLoaded] = useState(false);
  const [isNotesLoaded, setIsNotesLoaded] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lectures Section */}
      <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-300 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Lectures</h2>
        <div className="flex-grow overflow-y-auto">
          {isLecturesLoaded ? (
            <Lectures user={user} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Loading Lectures...</p>
            </div>
          )}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-center"
          onClick={() => setIsLecturesLoaded(true)}
        >
          Load Lectures
        </button>
      </div>

      {/* Notes Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        <div className="flex-grow overflow-y-auto">
          {isNotesLoaded ? (
            <Notes />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Loading Notes...</p>
            </div>
          )}
        </div>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 self-center"
          onClick={() => setIsNotesLoaded(true)}
        >
          Load Notes
        </button>
      </div>
    </div>
  );
};

export default Lecture;


