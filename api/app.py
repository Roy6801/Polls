from db.Connector import Connection
from flask import Flask, request
from flask_cors import CORS


conn = Connection()
response = 0

app = Flask(__name__)
CORS(app)


@app.route("/VerifyToken", methods=["GET", "POST"])
def verifyToken():
    global conn, response
    if request.method == "POST":
        userData = request.json
        response = conn.token(userData)
    return {"response": response}


@app.route("/LoginUser", methods=["GET", "POST"])
def login():
    global conn, response
    if request.method == "POST":
        userData = request.json
        response = conn.verifyUser(userData)
    return {"response": response}


@app.route("/RegisterUser", methods=["GET", "POST"])
def register():
    global conn, response
    if request.method == "POST":
        userData = request.json
        response = conn.createUser(userData)
    return {"response": response}


@app.route("/CreatePoll", methods=["GET", "POST"])
def create():
    global conn, response
    if request.method == "POST":
        userData = request.json()
        response = conn.createPoll(userData)
    return {"response": response}


@app.route("/RegisterForPoll/<user>/<url>", methods=["GET", "POST"])
def registerForPoll(user, url):
    return user + " " + url


if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
