import os
import re
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for frontend

# Set up your admin PIN (this should be kept secure in production)
ADMIN_PIN = "Nullified@ImaGeS"

# Folder where images are stored
IMAGE_FOLDER = "public/assets/Images"
os.makedirs(IMAGE_FOLDER, exist_ok=True)

# Allowed image extensions
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp", "bmp"}


# Helper function to check allowed file extensions
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# Helper function to generate unique filenames
def generate_new_filename():
    files = os.listdir(IMAGE_FOLDER)
    highest_number = 0
    for file in files:
        match = re.match(r"Image \((\d+)\)\.jpg", file)
        if match:
            number = int(match.group(1))
            highest_number = max(highest_number, number)
    new_filename = f"Image ({highest_number + 1}).jpg"
    return new_filename


# Route to get all images in the image directory
@app.route("/api/images", methods=["GET"])
def get_images():
    try:
        # Get the list of all jpg images in the images folder
        files = [f for f in os.listdir(IMAGE_FOLDER) if f.endswith(".jpg")]
        return jsonify(files), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# Route to upload a new image
@app.route("/api/upload", methods=["POST"])
def upload_image():
    pin = request.json.get("pin")
    if pin != ADMIN_PIN:
        return jsonify({"message": "Incorrect PIN"}), 403

    if "image" not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"message": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = generate_new_filename()
        file_path = os.path.join(IMAGE_FOLDER, filename)
        file.save(file_path)
        return (
            jsonify({"message": "Image uploaded successfully", "file": filename}),
            200,
        )
    else:
        return (
            jsonify(
                {
                    "message": "Invalid file format. Only JPG, JPEG, PNG, WEBP, BMP images are allowed."
                }
            ),
            400,
        )


# Route to delete an image
@app.route("/api/delete/<filename>", methods=["DELETE"])
def delete_image(filename):
    pin = request.json.get("pin")
    if pin != ADMIN_PIN:
        return jsonify({"message": "Incorrect PIN"}), 403

    file_path = os.path.join(IMAGE_FOLDER, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({"message": "Image deleted successfully"}), 200
    else:
        return jsonify({"message": "Image not found"}), 404


# Route to serve the image (so the frontend can display it)
@app.route("/assets/Images/<filename>")
def serve_image(filename):
    try:
        return send_from_directory(IMAGE_FOLDER, filename)
    except Exception as e:
        return jsonify({"message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000)
