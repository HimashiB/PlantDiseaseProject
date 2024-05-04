from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import os
import threading

# Suppress TensorFlow informational messages
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Global variable to hold the model
model = None

# Confidence threshold set
CONFIDENCE_THRESHOLD = 0.75  #confidence threshold

# Function to load the model
def load_model_async():
    global model
    model = load_model('F:/Dissertation Project/React App/my-predict-app/model.h5')
    print("Model loaded.")

# Load the model in a separate thread to avoid blocking
threading.Thread(target=load_model_async).start()

class_names = {0: 'Early Blight', 1: 'Late Blight', 2: 'Healthy'}  

UPLOAD_FOLDER = 'F:/Dissertation Project/React App/my-predict-app/Uploaded Images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No image selected for uploading'}), 400

    filename = secure_filename(file.filename)
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(img_path)

    if model is None:
        return jsonify({'error': 'Model is not loaded yet. Please wait and try again.'}), 503

    img = image.load_img(img_path, target_size=(256, 256))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)
    confidence = np.max(prediction)

    os.remove(img_path)  #remove the file after prediction

    if confidence < CONFIDENCE_THRESHOLD:
        return jsonify({'result': 'Uncertain'}) 
    else:
        result = class_names.get(predicted_class[0], "Unknown class")
        return jsonify({'result': result, 'confidence': float(confidence)})

if __name__ == '__main__':
    app.run(debug=False)
