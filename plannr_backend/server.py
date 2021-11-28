from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/members")
def members():
    return jsonify({'members' : ["mem1", "mem2", "mem3"]})

if __name__ == "__main__":
    app.run(debug=True)