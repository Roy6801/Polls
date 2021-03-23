from flask import Flask, request
from flask_cors import CORS

userName = "Roy6801"

app = Flask(__name__)
CORS(app)


@app.route("/home", methods=["GET"])
def home():
    return {"Note": "Howdy!!"}


@app.route("/registerUser", methods=["GET", "POST"])
def register():
    global userName
    if request.method == "POST":
        userData = request.json
        userName = userData['userName']
    return userName


if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
