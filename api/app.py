from db.Connector import Connection
from flask import Flask, request
from flask_cors import CORS


conn = Connection()
response = 0

app = Flask(__name__)
CORS(app)


@app.route("/home", methods=["GET"])
def home():
    return {"Note": "Howdy!!"}


@app.route("/LoginUser", methods=["GET", "POST"])
def login():
    global conn, response
    if request.method == "POST":
        userData = request.json
        response = conn.verifyUser(userData['userName'], userData['password'])
    return {"response": response}


@app.route("/RegisterUser", methods=["GET", "POST"])
def register():
    global conn, response
    if request.method == "POST":
        userData = request.json
        response = conn.createUser(userData['userName'], userData['password'], userData['firstName'],
                                   userData['lastName'], userData['email'], userData['mobileNo'])
    return {"response": response}


if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
