from flask import Flask

app = Flask(__name__)


@app.route("/home", methods=["GET"])
def home():
    return {"Note": "Howdy!!"}

if __name__ == "__main__":
	app.run(host='0.0.0.0', threaded=True)