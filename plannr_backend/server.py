from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

def connectDB_TEST():
    engine = create_engine("postgresql://postgres:Alan200!@localhost:5432/plannr")
    db = scoped_session(sessionmaker(bind=engine))
    db.execute("CREATE TABLE TEST (id INTEGER NOT NULL, name VARCHAR, PRIMARY KEY (id));")
    db.commit()
    db.close()

@app.route("/test")
def test():
    connectDB_TEST()
    return jsonify({"connTest" : ["this", "is", "a", "python", "object"]})

if __name__ == "__main__":
    app.run(debug=True)