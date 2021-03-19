from flask import Flask

app = Flask(__name__)


@app.route("/home", methods=["GET"])
def home():
    return {"Note": "Howdy!!"}
