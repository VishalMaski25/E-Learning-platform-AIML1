#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import re
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import precision_score, recall_score, f1_score
import sys

# Uncomment these lines if you haven't downloaded the NLTK data yet
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')
# nltk.download('omw-1.4')


# In[2]:


# Load the dataset
data = pd.read_csv("E:/Documents/IIIt_Nagpur/FINAL-YEAR-PROJECT/Dataset/Coursera.csv")


# In[3]:


# Preprocessing the data
def formating_col(col_name):
    elt = []
    lemmatizer = WordNetLemmatizer()
    for i in range(data.shape[0]):
        # Remove punctuations
        a = re.sub(r'[^\w\s]', ' ', data[col_name][i])
        # Lowercase the text
        a = a.lower()
        # Lemmatize each word
        a = ' '.join([lemmatizer.lemmatize(word) for word in a.split()])
        elt.append(a)
    return elt

# Apply the formatting to the relevant columns
data['Course Description'] = formating_col(col_name='Course Description')
data['Skills'] = formating_col(col_name='Skills')
data['Course Name'] = formating_col(col_name='Course Name')
data['Difficulty Level'] = formating_col(col_name='Difficulty Level')


# In[4]:


# Combining tags from 'Skills' column
data['tags'] = data['Skills']

# Remove stopwords and format 'tags' column
def process_tags(tags):
    stop_words = set(stopwords.words('english'))
    processed_tags = []
    for i in range(data.shape[0]):
        elt = [word for word in tags[i].split() if word not in stop_words]
        processed_tags.append(' '.join(elt))
    return processed_tags

data['tags'] = process_tags(data['tags'])

# Selecting only the relevant columns
usefull_df = data[["Course Name", 'tags']]
usefull_df.columns = ['CourseName', 'Tags']


# In[5]:


# Vectorizing the tags using both TF-IDF and CountVectorizer
tfidf_vectorizer = TfidfVectorizer(max_features=3522, stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(usefull_df['Tags']).toarray()

count_vectorizer = CountVectorizer(max_features=3522, stop_words='english')
count_matrix = count_vectorizer.fit_transform(usefull_df['Tags']).toarray()

# Cosine similarity
cosine_sim_tfidf = cosine_similarity(tfidf_matrix)
cosine_sim_cv = cosine_similarity(count_matrix)


# In[6]:


# Jaccard similarity function
def jaccard_similarity(list1, list2):
    intersection = len(set(list1).intersection(set(list2)))
    union = len(set(list1).union(set(list2)))
    return intersection / union

def calculate_jaccard_similarity_matrix(tags_list):
    matrix_size = len(tags_list)
    jaccard_matrix = np.zeros((matrix_size, matrix_size))
    
    for i in range(matrix_size):
        for j in range(matrix_size):
            if i != j:
                jaccard_matrix[i, j] = jaccard_similarity(tags_list[i].split(), tags_list[j].split())
    return jaccard_matrix

# Creating Jaccard similarity matrix
jaccard_matrix = calculate_jaccard_similarity_matrix(usefull_df['Tags'])


# In[7]:


# Recommendation functions
def recommandation_cv(title):
    course = usefull_df[usefull_df['CourseName'].str.lower() == title.lower()]
    if len(course) == 0:
        print("This course does not exist.")
    else:
        course_index = course.index[0]
        distances = cosine_sim_cv[course_index]
        course_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]

        for i in course_list:
            print(usefull_df.iloc[i[0]].CourseName)

def recommandation_tfidf(title):
    course = usefull_df[usefull_df['CourseName'].str.lower() == title.lower()]
    if len(course) == 0:
        print("This course does not exist.")
    else:
        course_index = course.index[0]
        distances = cosine_sim_tfidf[course_index]
        course_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]

        for i in course_list:
            print(usefull_df.iloc[i[0]].CourseName)

def recommandation_jaccard(title):
    # Check for courses that contain the title as a substring (case insensitive)
    course = usefull_df[usefull_df['CourseName'].str.contains(title, case=False, na=False)]
    if course.empty:
        print("No exact match found. Here are similar courses:")
        # Display any courses that contain any word from the title
        title_words = title.lower().split()
        similar_courses = usefull_df[usefull_df['CourseName'].str.contains('|'.join(title_words), case=False, na=False)]
        if not similar_courses.empty:
            return similar_courses['CourseName'].tolist()  # Return similar courses if found
        else:
            print("This course does not exist.")
            return []
    else:
        course_index = course.index[0]
        distances = jaccard_matrix[course_index]
        course_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]
        
        return [usefull_df.iloc[i[0]].CourseName for i in course_list]


# In[8]:


# recommended_courses = recommandation_jaccard("silicon thin film solar cells")  # Adjusted input
# print(recommended_courses)


# In[9]:


# recommended_courses = recommandation_jaccard("silicon thin film solar cell")  # Notice the singular "cell"
# print(recommended_courses)


# In[10]:


# Precision, Recall, F1 Score Calculation
def calculate_metrics(recommended_courses, true_courses):
    y_true = np.isin(true_courses, recommended_courses).astype(int)
    y_pred = np.isin(recommended_courses, true_courses).astype(int)
    
    precision = precision_score(y_true, y_pred, average='binary')
    recall = recall_score(y_true, y_pred, average='binary')
    f1 = f1_score(y_true, y_pred, average='binary')
    
    return precision, recall, f1


# In[11]:


from sklearn.metrics import precision_score, recall_score, f1_score
import numpy as np

# Precision, Recall, F1 Score Calculation
def calculate_metrics(recommended_courses, true_courses):
    # Check if recommended courses are empty
    if not recommended_courses:
        print("No recommended courses to evaluate.")
        return 0.0, 0.0, 0.0

    # Create a set for true courses for quick lookup
    true_set = set(true_courses)

    # Create binary arrays for y_true and y_pred
    y_true = np.array([1 if course in true_set else 0 for course in recommended_courses])
    y_pred = np.array([1 if course in true_courses else 0 for course in recommended_courses])
    
    # Check if y_true or y_pred have no positive samples
    if np.sum(y_true) == 0 or np.sum(y_pred) == 0:
        print("No positive samples in true or predicted arrays.")
        return 0.0, 0.0, 0.0

    # Calculate metrics
    precision = precision_score(y_true, y_pred, average='binary', zero_division=0)
    recall = recall_score(y_true, y_pred, average='binary', zero_division=0)
    f1 = f1_score(y_true, y_pred, average='binary', zero_division=0)
    
    return precision, recall, f1

# Example usage
recommended_courses = recommandation_jaccard("silicon thin film solar cell")  # Get recommended courses
print(f"Recommended Courses: {recommended_courses}")  # Check the recommended courses
# true_courses = ["silicon thin film solar cell", "some other relevant course"]  # True courses
true_courses = ["silicon thin film solar cell", "advanced semiconductor materials", "solar energy technology", "solar energy system overview"]


# Calculate metrics
precision, recall, f1 = calculate_metrics(recommended_courses, true_courses)

# Print the metrics
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1 Score: {f1:.2f}")


# In[12]:


# recommended_courses = recommandation_jaccard("python")  # Adjusted input
# print(recommended_courses)


# In[13]:

if __name__ == '__main__':
    title = sys.argv[1]
    recommended_courses = recommandation_jaccard(title)
    print(recommended_courses)


# In[ ]:




