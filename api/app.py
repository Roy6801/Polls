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
        userData = request.json
        response = conn.createPoll(userData)
    return {"response": response}


@app.route("/PollInfo/<url>", methods=["GET"])
def PollInfo(url):
    global conn, response
    response = conn.getPollInfo(url)
    return response


@app.route("/UserPresent", methods=["GET", "POST"])
def userPresent():
    global conn, response
    if request.method == "POST":
        userData = request.json
        response = conn.userInPoll(userData)
    return {"response": response}


@app.route("/Poll/<user>/<url>", methods=["GET", "POST"])
def registerForPoll(user, url):
    global conn, response
    if request.method == "POST":
        userData = request.json
        response = conn.registerForPoll(userData)
    return {"response": response}


if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
