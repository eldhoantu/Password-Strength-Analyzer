from flask import Flask, request, jsonify
from flask_cors import CORS
from password_checker import analyze_password
from password_generator import generate_password

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {
        "message": "Password Strength Analyzer API Running"
    }

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    password = data.get("password", "")

    result = analyze_password(password)

    return jsonify(result)


@app.route("/generate")
def generate():

    password = generate_password()

    return jsonify({
        "generated_password": password
    })
if __name__ == "__main__":
 app.run(debug=True)