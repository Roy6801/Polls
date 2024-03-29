from db.Connector import Connection
from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/VerifyToken", methods=["GET", "POST"])
def verifyToken():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        response = conn.token(userData)
    return {"response": response}


@app.route("/LoginUser", methods=["GET", "POST"])
def login():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        response = conn.verifyUser(userData)
    return {"response": response}


@app.route("/RegisterUser", methods=["GET", "POST"])
def register():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        response = conn.createUser(userData)
    return {"response": response}


@app.route("/CreatePoll", methods=["GET", "POST"])
def create():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
        del userData['options'][0]
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
    response = conn.userInPoll(userData)
    return {"response": response}


@app.route("/Poll", methods=["GET", "POST"])
def registerForPoll():
    conn = Connection()
    if request.method == "POST":
        userData = request.json
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


@app.route("/RegisteredInPolls/<user>/<part>")
def RegisteredInPolls(user, part):
    conn = Connection()
    response = conn.getRegisteredInPolls(user, int(part))
    return response


@app.route("/PollsToStart/<user>/<time>")
def PollsToStart(user, time):
    conn = Connection()
    response = conn.getPollsToStart(user, int(time))
    return response


@app.route("/SearchPolls/<user>/<pollName>")
def PollSearch(user, pollName):
    conn = Connection()
    response = conn.SearchPolls(user, pollName)
    return response


@app.route("/UserAnalysis/<user>")
def UserAnalysis(user):
    conn = Connection()
    response = conn.UserAnalysis(user)
    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', threaded=True)
