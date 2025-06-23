from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json
from flask_cors import CORS

# # Load your model and other necessary files
# with open("vectorizer_fited.pkl", 'rb') as file:
#     loaded_vectorizer = pickle.load(file)

# with open("description_fit_transformed.pkl", 'rb') as file:
#     loaded_description = pickle.load(file)

# with open("index_course_name.json", 'r') as file:
#     loaded_dictionary = json.load(file)


# Change this to an absolute or relative path
# with open("./mlModel/vectorizer_fited.pkl", 'rb') as file:
#     loaded_vectorizer = pickle.load(file)

# with open("./mlModel/description_fit_transformed.pkl", 'rb') as file:
#     loaded_description = pickle.load(file)

# with open("./mlModel/index_course_name.json", 'r') as file:
#     loaded_dictionary = json.load(file)

with open("C:/Users/visha/Desktop/Intership/E-Learning-platform/server/mlModel/vectorizer_fited.pkl", 'rb') as file:
    loaded_vectorizer = pickle.load(file)

with open("C:/Users/visha/Desktop/Intership/E-Learning-platform/server/mlModel/description_fit_transformed.pkl", 'rb') as file:
    loaded_description = pickle.load(file)

with open("C:/Users/visha/Desktop/Intership/E-Learning-platform/server/mlModel/index_course_name.json", 'r') as file:
    loaded_dictionary = json.load(file)



# Initialize the Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/recommend', methods=['POST'])
def recommend():
    # Get the input from the frontend (course title)
    data = request.json
    title = data.get('title')

    if not title:
        return jsonify({"error": "No course title provided!"}), 400

    # Use your ML model for recommendation
    title_vectorized = loaded_vectorizer.transform([title])
    similarities = cosine_similarity(title_vectorized, loaded_description)
    indices_similaires = np.argsort(similarities[0])[::-1][:10]
    recommended_courses = [loaded_dictionary[str(i)] for i in indices_similaires]

    # Return the recommended courses
    return jsonify({"recommended_courses": recommended_courses})

if __name__ == '__main__':
    app.run(debug=True, port=3000)
