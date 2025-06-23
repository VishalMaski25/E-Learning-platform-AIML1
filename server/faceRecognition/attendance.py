from flask import Flask, request, jsonify
import cv2
import face_recognition
import numpy as np
from datetime import datetime
from pymongo import MongoClient
import os
from io import BytesIO
from PIL import Image
from flask_cors import CORS  # Import Flask-CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# MongoDB connection
client = MongoClient("mongodb://localhost:27017/final-year-adarsh")
db = client['final-year-adarsh']
attendance_collection = db['attendances']

# Load known faces and encodings
def load_known_faces():
    known_faces_dir = "known_faces"
    known_encodings = []
    known_names = []

    for filename in os.listdir(known_faces_dir):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            path = os.path.join(known_faces_dir, filename)
            image = face_recognition.load_image_file(path)
            encoding = face_recognition.face_encodings(image)[0]
            known_encodings.append(encoding)
            known_names.append(os.path.splitext(filename)[0])

    return known_encodings, known_names

known_encodings, known_names = load_known_faces()

# Mark attendance in MongoDB
def mark_attendance(name):
    current_time = datetime.now()
    attendance_collection.insert_one({
        "name": name,
        "time": current_time
    })

@app.route('/mark_attendance', methods=['POST'])
def mark_attendance_endpoint():
    try:
        # Read image from request
        file = request.files['image']
        image = Image.open(BytesIO(file.read()))
        frame = np.array(image)

        # Convert to RGB for face_recognition
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Detect faces and encode
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for encoding in face_encodings:
            matches = face_recognition.compare_faces(known_encodings, encoding)
            name = "Unknown"

            if True in matches:
                matched_idx = matches.index(True)
                name = known_names[matched_idx]

                # Check if attendance already marked today
                today = datetime.combine(datetime.now().date(), datetime.min.time())
                if not attendance_collection.find_one({"name": name, "time": {"$gte": today}}):
                    mark_attendance(name)
                    return jsonify({"message": f"Attendance marked for {name}"}), 200

            return jsonify({"message": f"No new attendance required for {name}"}), 200

        return jsonify({"message": "No face detected or unrecognized face"}), 400
    except Exception as e:
        return jsonify({"message": "Error processing image"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1024)





# import cv2
# import face_recognition
# import os
# from datetime import datetime
# from pymongo import MongoClient

# # MongoDB connection
# client = MongoClient("mongodb://localhost:27017/final-year-adarsh")
# db = client['final-year-adarsh']
# attendance_collection = db['attendances']  # Matches the collection created by Mongoose for Attendance.js

# # Load known faces and encodings
# def load_known_faces():
#     known_faces_dir = "known_faces"
#     known_encodings = []
#     known_names = []

#     for filename in os.listdir(known_faces_dir):
#         if filename.endswith(".jpg") or filename.endswith(".png"):
#             path = os.path.join(known_faces_dir, filename)
#             image = face_recognition.load_image_file(path)
#             encoding = face_recognition.face_encodings(image)[0]
#             known_encodings.append(encoding)
#             known_names.append(os.path.splitext(filename)[0])

#     return known_encodings, known_names

# # Mark attendance in MongoDB
# def mark_attendance(name):
#     current_time = datetime.now()
#     attendance_collection.insert_one({
#         "name": name,
#         "time": current_time
#     })

# # Load known faces
# known_encodings, known_names = load_known_faces()

# # Start video capture
# video_capture = cv2.VideoCapture(0)
# print("Press 'q' to exit")

# # Flag to stop the loop after attendance is marked
# attendance_marked = False

# while True:
#     ret, frame = video_capture.read()
#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

#     face_locations = face_recognition.face_locations(rgb_frame)
#     face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

#     for encoding, face_location in zip(face_encodings, face_locations):
#         matches = face_recognition.compare_faces(known_encodings, encoding)
#         name = "Unknown"

#         if True in matches:
#             matched_idx = matches.index(True)
#             name = known_names[matched_idx]

#             # Only mark attendance if there's no existing record for today
#             if not attendance_collection.find_one({"name": name, "time": {"$gte": datetime.combine(datetime.now().date(), datetime.min.time())}}):
#                 mark_attendance(name)
#                 print(f"Attendance marked for {name}")
#                 attendance_marked = True  # Set the flag to true once attendance is marked

#         # Draw a box around the face and label it
#         top, right, bottom, left = face_location
#         cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
#         cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

#     # Display the resulting frame
#     cv2.imshow('Face Recognition Attendance', frame)

#     # Break the loop if attendance is marked or 'q' is pressed
#     if attendance_marked or (cv2.waitKey(1) & 0xFF == ord('q')):
#         break

# video_capture.release()
# cv2.destroyAllWindows()


