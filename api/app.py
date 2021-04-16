from db.Connector import Connection
from flask import Flask, request
from flask_cors import CORS


def crypt(text, flag):
    if flag:
        text = text[-1:]
        val = ""
        length = len(text)
        for i in range(length):
            temp = ord(text[i])
            if i % 2 == 0:
                temp = temp + length
            else:
                temp = temp - length
            val = val + chr(temp)
        return val
    else:
        val = ""
        length = len(text)
        for i in range(length):
            temp = ord(text[i])
            if i % 2 == 0:
                temp = temp - length
            else:
                temp = temp + length
            val = val + chr(temp)
        val = val[-1:]
        return val


conn = Connection()
response = 0

app = Flask(__name__)
CORS(app)


@app.route("/VerifyToken", methods=["GET", "POST"])
def verifyToken():
    global conn, response
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.token(userData)
    return {"response": response}


@app.route("/LoginUser", methods=["GET", "POST"])
def login():
    global conn, response
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.verifyUser(userData)
    return {"response": response}


@app.route("/RegisterUser", methods=["GET", "POST"])
def register():
    global conn, response
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.createUser(userData)
    return {"response": response}


@app.route("/CreatePoll", methods=["GET", "POST"])
def create():
    global conn, response
    if request.method == "POST":
        userData = request.json
        del userData['options'][0]
        print(userData)
        response = conn.createPoll(userData)
    return {"response": response}


@app.route("/PollInfo/<url>", methods=["GET"])
def PollInfo(url):
    global conn, response
    response = conn.getPollInfo(url)
    if response != 0:
        return response
    else:
        return str(response)


@app.route("/PollOptions/<url>", methods=["GET"])
def PollOptions(url):
    global conn, response
    response = conn.getPollOptions(url)
    if response != 0:
        return response
    else:
        return str(response)


@app.route("/UserPresent/<url>/<user>", methods=["GET", "POST"])
def userPresent(url, user):
    global conn, response
    userData = {"poll_Id": url, "userName": user}
    print(userData)
    response = conn.userInPoll(userData)
    return {"response": response}


@app.route("/Poll", methods=["GET", "POST"])
def registerForPoll():
    global conn, response
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.registerForPoll(userData)
    return {"response": response}


@app.route("/Participate", methods=["GET", "POST"])
def participate():
    global conn, response
    if request.method == "POST":
        userData = request.json
        print(userData)
    return {"response": response}

if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
