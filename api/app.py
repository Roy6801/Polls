from db.Connector import Connection
from flask import Flask, request
from flask_cors import CORS

userName = "Roy6801"
conn = Connection()
app = Flask(__name__)
CORS(app)


@app.route("/home", methods=["GET"])
def home():
    return {"Note": "Howdy!!"}


@app.route("/LoginUser", methods=["GET", "POST"])
def login():
    global userName
    if request.method == "POST":
        userData = request.json
        userName = userData
    return userName


@app.route("/RegisterUser", methods=["GET", "POST"])
def register():
    global userName
    if request.method == "POST":
        userData = request.json
        userName = userData
    return userName


if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
