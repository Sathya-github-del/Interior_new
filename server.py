import os
import re
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from flask_mail import Mail, Message

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for frontend

# Folder where images are stored
IMAGE_FOLDER = "public/assets/Images"
os.makedirs(IMAGE_FOLDER, exist_ok=True)

# Allowed image extensions
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp", "bmp"}

# Admin PIN (this should be kept secure in production)
ADMIN_PIN = '12345'

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
    pin = request.form.get("pin")  # Retrieve PIN from the form data
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
        return jsonify({"message": "Image uploaded successfully", "file": filename}), 200
    else:
        return jsonify({"message": "Invalid file format. Only JPG, JPEG, PNG, WEBP, BMP images are allowed."}), 400


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

################

# Configure Flask-Mail
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = (
    "info.radheysmartinteriors@gmail.com"  # Your email address
)
app.config["MAIL_PASSWORD"] = (
    "cjor mqpe pcrv emqr"  # Your email password or app password
)
app.config["MAIL_DEFAULT_SENDER"] = "info.radheysmartinteriors@gmail.com"

mail = Mail(app)


# Endpoint to handle form submission
@app.route("/submit", methods=["POST"])
def submit_form():
    try:
        data = request.get_json()

        # Extract form data from request
        first_name = data["firstName"]
        last_name = data["lastName"]
        phone_number = data["phoneNumber"]
        email = data["email"]
        city_name = data["cityName"]
        office = data["office"]
        message = data["message"]

        # Construct email body for the admin (HTML format)
        admin_email_body = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                }}
                .container {{
                    width: 600px;
                    margin: 0 auto;
                    border: 1px solid #ccc;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    text-align: center;
                    margin-bottom: 20px;
                }}
                .header img {{
                    max-width: 100px;
                }}
                .header h1 {{
                    font-size: 24px;
                    color: #333;
                }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                }}
                table, th, td {{
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }}
                th {{
                    background-color: #f2f2f2;
                    color: #333;
                }}
                td {{
                    background-color: #fff;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://i.ibb.co/y5zLDTc/logo.png" alt="RADHEY SMART INTERIORS">
                    <h1>RADHEY SMART INTERIORS</h1>
                </div>

                <h2>New Form Submission</h2>
                <table>
                    <tr><th>First Name</th><td>{first_name}</td></tr>
                    <tr><th>Last Name</th><td>{last_name}</td></tr>
                    <tr><th>Phone Number</th><td>{phone_number}</td></tr>
                    <tr><th>Email</th><td>{email}</td></tr>
                    <tr><th>City Name</th><td>{city_name}</td></tr>
                    <tr><th>Office</th><td>{office}</td></tr>
                    <tr><th>Message</th><td>{message}</td></tr>
                </table>

                <div class="footer">
                    <p>New Form Received!</p>
                </div>
            </div>
        </body>
        </html>
        """

        # Construct email body for the customer (HTML format)
        customer_email_body = f"""
        <html>
        <body>
            <h2>Thank You for Your Submission</h2>
            <p>Dear {first_name} {last_name},</p>
            <p>Thank you for reaching out to Radhey Smart Interiors. We have received your message and will get back to you soon. Here are the details you submitted:</p>
            <table style="border: 1px solid #ddd; border-collapse: collapse;">
                <tr style="border: 1px solid #ddd;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">First Name</th>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">{first_name}</td>
                </tr>
                <tr style="border: 1px solid #ddd;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Last Name</th>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">{last_name}</td>
                </tr>
                <tr style="border: 1px solid #ddd;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Phone Number</th>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">{phone_number}</td>
                </tr>
                <tr style="border: 1px solid #ddd;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Email</th>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">{email}</td>
                </tr>
                <tr style="border: 1px solid #ddd;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">City Name</th>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">{city_name}</td>
                </tr>
                <tr style="border: 1px solid #ddd;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Office</th>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">{office}</td>
                </tr>
                <tr style="border: 1px solid #ddd;">
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2; color: #333;">Message</th>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #fff;">{message}</td>
                </tr>
            </table>
            <p>Best regards,</p>
            <p>Radhey Smart Interiors</p>
        </body>
        </html>
        """

        # Send email to the admin
        admin_msg = Message(
            subject="New Form Submission",
            recipients=["info.radheysmartinteriors@gmail.com"],  # Admin's email
            html=admin_email_body,
            reply_to=email,
        )
        mail.send(admin_msg)

        # Send email to the customer
        customer_msg = Message(
            subject="Thank you for contacting Radhey Smart Interiors, We will get back to you soon.",
            recipients=[email],  # Send to customer's email
            html=customer_email_body,
        )
        mail.send(customer_msg)

        # Respond with a success message
        return jsonify({"message": "Form submitted successfully!"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "There was an error with your submission."}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
