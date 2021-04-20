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


app = Flask(__name__)
CORS(app)


@app.route("/VerifyToken", methods=["GET", "POST"])
def verifyToken():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.token(userData)
    return {"response": response}


@app.route("/LoginUser", methods=["GET", "POST"])
def login():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.verifyUser(userData)
    return {"response": response}


@app.route("/RegisterUser", methods=["GET", "POST"])
def register():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.createUser(userData)
    return {"response": response}


@app.route("/CreatePoll", methods=["GET", "POST"])
def create():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        del userData['options'][0]
        print(userData)
        response = conn.createPoll(userData)
    return {"response": response}


@app.route("/PollInfo/<url>")
def PollInfo(url):
    conn = Connection()
    response = conn.getPollInfo(url)
    return response


@app.route("/PollOptions/<url>")
def PollOptions(url):
    conn = Connection()
    response = conn.getPollOptions(url)
    return response


@app.route("/PollResults/<url>")
def PollResults(url):
    conn = Connection()
    response = conn.getPollResults(url)
    return response


@app.route("/UserPresent/<url>/<user>", methods=["GET", "POST"])
def userPresent(url, user):
    conn = Connection()
    userData = {"poll_Id": url, "userName": user}
    print(userData)
    response = conn.userInPoll(userData)
    return {"response": response}


@app.route("/Poll", methods=["GET", "POST"])
def registerForPoll():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        print(userData)
        response = conn.registerForPoll(userData)
    return {"response": response}


@app.route("/Participate/<url>/<user>/<scheduled>/<radio>", methods=["GET", "POST"])
def participate(url, user, scheduled, radio):
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        registrant = {"userName": user, "poll_Id": url,
                      "verificationId": userData['verificationId'], "part": 1}
        ans = userData['ans']
        response = conn.participateInPoll(
            registrant, ans, int(scheduled), int(radio))
    return {"response": response}


@app.route("/GetPollListByAdmin/<admin>")
def pollListByAdmin(admin):
    conn = Connection()
    response = conn.getPollListByAdmin(admin)
    return response


@app.route("/GetParticipants/<url>")
def getParticipants(url):
    conn = Connection()
    response = conn.getParticipantList(url)
    return response


@app.route("/RegisteredInPolls/<user>")
def RegisteredinPolls(user):
    conn = Connection()
    response = conn.getRegisteredInPolls(user)
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
