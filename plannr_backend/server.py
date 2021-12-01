from flask import Flask, jsonify, request
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import scoped_session, sessionmaker
import sqlalchemy as db
import os
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

engine = create_engine(f"postgresql://postgres:{os.environ.get('psqlPass')}@localhost:5432/plannr")
# start of functionality for 'test' method

# uncomment what you want to test here
def connectDB_TEST():
    # print(os.environ.get('emailPass'))
    #engine = create_engine(f"postgresql://postgres:{os.environ.get('emailPass')}@localhost:5432/plannr")
    #db = scoped_session(sessionmaker(bind=engine))
    #db.execute("CREATE TABLE IF NOT EXISTS TEST2 (id INTEGER NOT NULL, name VARCHAR, PRIMARY KEY (id));")
    #db.commit()

    #with engine.connect() as conn:
    #    conn.execute('''INSERT INTO test2 (id,name)
    #                    VALUES (2, 'Akshay'), (3, 'Nithin'), (4,'Adwaith'), (5,'Jeswell');
    #                ''')
    
    #with engine.connect() as conn:
    #    res = conn.execute("SELECT * FROM test2")
    #    for r in res:
    #        print(r)

    #db.close()
    print('test')

@app.route("/test")
def test():
    connectDB_TEST()
    return jsonify({"connTest" : ["this", "is", "a", "python", "object"]})

# start of functionality for 'signupStudent' 

def signupStudentCreateTable():
    db = scoped_session(sessionmaker(bind=engine))
    
    db.execute('''
                CREATE TABLE IF NOT EXISTS USERS (
                    UserId SERIAL PRIMARY KEY,
                    RegNo VARCHAR UNIQUE NOT NULL,
                    Name VARCHAR NOT NULL,
                    PasswordHash VARCHAR NOT NULL,
                    DateOfBirth DATE,
                    Email VARCHAR UNIQUE,
                    MobileNo VARCHAR,
                    Role VARCHAR
                    );
                ''')
    db.commit()

    db.execute('''
                CREATE TABLE IF NOT EXISTS STUDENTS (
                    StudentId INTEGER NOT NULL CHECK (StudentID>0),
                    Class VARCHAR NOT NULL,
                    CONSTRAINT studUserID
                        FOREIGN KEY(StudentID)
                            REFERENCES users(userid)
                            ON DELETE CASCADE
                    );
                ''')
    db.commit()

    db.close()

def signupInsertStudent(userRegNo, userName, userPassHash, userDOB, userEmail, userMobNo, userClass):
    db = scoped_session(sessionmaker(bind=engine))

    result = "_ _"
    userid = -1     # -ve value check will cause error if insert into student is done with -ve userid

    try:
        with engine.connect() as conn:
            returnVal = conn.execute(f'''
                            INSERT INTO users (RegNo, Name, PasswordHash, DateOfBirth, Email, MobileNo, Role)
                            VALUES ('{userRegNo}', '{userName}', '{userPassHash}', '{userDOB}', '{userEmail}', '{userMobNo}', 'S')
                            RETURNING userid;                    
                        ''')
            for row in returnVal:
                userid = row[0]
            
            conn.execute(f'''
                            INSERT INTO students (StudentID, Class)
                            VALUES ({userid}, '{userClass}');
                        ''')
            result = "success"
    except exc.SQLAlchemyError as e:
        print('Eroorr: ')
        print(type(e))
        result = "failure"

    db.commit()
    db.close()

    return result

@app.route("/signupStudent")
def signupStudent():
    userRegNo = request.args.get('regNo', type = str, default='empty').replace('"','')
    userName = request.args.get('name', type = str, default='empty').replace('"','')
    userPass = request.args.get('pass', type = str, default='empty').replace('"','')
    userDOB = request.args.get('dob', type = str, default='empty').replace('"','')
    userEmail = request.args.get('email', type = str, default='empty').replace('"','')
    userMobNo = request.args.get('mobNo', type = str, default='empty').replace('"','')
    userClass = request.args.get('class', type = str, default='empty').replace('"','')

    result = ""

    # print(userRegNo, userName, userPass, userDOB, userEmail, userMobNo, userClass)

    if '' in [userRegNo, userName, userPass, userDOB, userEmail, userMobNo, userClass]:
        result="invalidArg"
    else:
        result = "_"
        userPassHash = bcrypt.generate_password_hash(userPass).decode("utf-8")
        signupStudentCreateTable()
        result = signupInsertStudent(userRegNo, userName, userPassHash, userDOB, userEmail, userMobNo, userClass)

    return jsonify({ "result" : f"{result}" })


# start of functionality for 'signupTeacher'

def signupTeacherCreateTable():
    db = scoped_session(sessionmaker(bind=engine))
    
    db.execute('''
                CREATE TABLE IF NOT EXISTS USERS (
                    UserId SERIAL PRIMARY KEY,
                    RegNo VARCHAR UNIQUE NOT NULL,
                    Name VARCHAR NOT NULL,
                    PasswordHash VARCHAR NOT NULL,
                    DateOfBirth DATE,
                    Email VARCHAR UNIQUE,
                    MobileNo VARCHAR,
                    Role VARCHAR
                    );
                ''')
    db.commit()
    db.close()

def signupInsertTeacher(userRegNo, userName, userPassHash, userDOB, userEmail, userMobNo):
    db = scoped_session(sessionmaker(bind=engine))

    result = "_ _"

    try:
        with engine.connect() as conn:
            conn.execute(f'''
                            INSERT INTO users (RegNo, Name, PasswordHash, DateOfBirth, Email, MobileNo, Role)
                            VALUES ('{userRegNo}', '{userName}', '{userPassHash}', '{userDOB}', '{userEmail}', '{userMobNo}', 'T');                    
                        ''')
            result = "success"
    except exc.SQLAlchemyError as e:
        print(type(e))
        result = "failure"

    db.commit()
    db.close()

    return result

@app.route("/signupTeacher")
def signupTeacher():
    userRegNo = request.args.get('regNo', type = str, default='empty').replace('"','')
    userName = request.args.get('name', type = str, default='empty').replace('"','')
    userPass = request.args.get('pass', type = str, default='empty').replace('"','')
    userDOB = request.args.get('dob', type = str, default='empty').replace('"','')
    userEmail = request.args.get('email', type = str, default='empty').replace('"','')
    userMobNo = request.args.get('mobNo', type = str, default='empty').replace('"','')

    result = ""

    if "empty" in [userRegNo, userName, userPass, userDOB, userEmail, userMobNo]:
        result="invalidArg"
    else:
        result = "_"
        userPassHash = bcrypt.generate_password_hash(userPass).decode("utf-8")
        signupTeacherCreateTable()
        result = signupInsertTeacher(userRegNo, userName, userPassHash, userDOB, userEmail, userMobNo)

    return jsonify({ "result" : f"{result}" })

# start of functionality for 'student login'

def validateStudentLogin(userRegNo, userPass, result):
    db = scoped_session(sessionmaker(bind=engine))

    result["status"] = "_ _"
    
    userid = -1
    try:
        with engine.connect() as conn:
            returnVal = conn.execute(f'''
                            SELECT * FROM users
                            WHERE RegNo = '{userRegNo}' AND Role = 'S';                   
                        ''')
            for row in returnVal:
                userid = row[0]
                pw_hash = row[3]
                
                if bcrypt.check_password_hash(pw_hash, userPass)==False:
                    result["status"] = "wrongPass"
                    return result
                
                result["name"] = row[2]
                result["email"] = row[5]

            returnVal = conn.execute(f'''
                            SELECT class FROM students
                            WHERE studentid = '{userid}';                   
                        ''')
            for row in returnVal:
                result["batch"] = row[0]

            result["status"] = "success"

    except exc.SQLAlchemyError as e:
        print(type(e))
        result["status"] = "failure"

    db.commit()
    db.close()

    return result

@app.route("/loginStudent")
def loginStudent():
    userRegNo = request.args.get('regNo', type = str, default='empty').replace('"','')
    userPass = request.args.get('pass', type = str, default='empty').replace('"','')

    result = { "regNo": f"{userRegNo}", "name": "empty", "email": "empty", "class": "empty", "status": "empty" }

    if "" in [userRegNo, userPass]:
        result["status"]="invalidArg"
    else:
        result["status"]="_"
        signupStudentCreateTable()  # to ensure student tables already exist
        result = validateStudentLogin(userRegNo, userPass, result)

    return jsonify(result)

# start of functionality for 'teacher login'

def validateTeacherLogin(userRegNo, userPass, result):
    db = scoped_session(sessionmaker(bind=engine))

    result["status"] = "_ _"
    
    try:
        with engine.connect() as conn:
            returnVal = conn.execute(f'''
                            SELECT * FROM users
                            WHERE RegNo = '{userRegNo}' AND Role = 'T';                   
                        ''')
            for row in returnVal:
                pw_hash = row[3]
                
                if bcrypt.check_password_hash(pw_hash, userPass)==False:
                    result["status"] = "wrongPass"
                    return result
                
                result["teacherID"] = row[0]
                result["name"] = row[2]
                result["email"] = row[5]

            result["status"] = "success"

    except exc.SQLAlchemyError as e:
        print(type(e))
        result["status"] = "failure"

    db.commit()
    db.close()

    return result

@app.route("/loginTeacher")
def loginTeacher():
    userRegNo = request.args.get('regNo', type = str, default='empty').replace('"','')
    userPass = request.args.get('pass', type = str, default='empty').replace('"','')

    result = { "teacherID":0, "regNo": f"{userRegNo}", "name": "empty", "email": "empty", "status": "empty" }

    if "" in [userRegNo, userPass]:
        result["status"]="invalidArg"
    else:
        result["status"]="_"
        signupTeacherCreateTable()  # to ensure teacher tables already exist
        result = validateTeacherLogin(userRegNo, userPass, result)

    return jsonify(result)

# start of functionality for 'add slot'

def createSubjectSlotTable():
    db = scoped_session(sessionmaker(bind=engine))
    
    db.execute('''
                CREATE TABLE IF NOT EXISTS SUBJECTS (
                    SubjectId SERIAL PRIMARY KEY,
                    SubjectName VARCHAR NOT NULL
                    );
                ''')
    db.commit()

    db.execute('''
                CREATE TABLE IF NOT EXISTS SLOTS (
                    SlotId SERIAL PRIMARY KEY,
                    SubjectID INTEGER NOT NULL,
                    Slot INTEGER NOT NULL,
                    Day INTEGER NOT NULL,
                    Class VARCHAR NOT NULL,
                    TeacherID INTEGER NOT NULL,
                    CONSTRAINT subID
                        FOREIGN KEY(SubjectID)
                            REFERENCES subjects(subjectId)
                            ON DELETE CASCADE,
                    CONSTRAINT teachID
                        FOREIGN KEY(TeacherID)
                            REFERENCES users(userId)
                            ON DELETE CASCADE
                    );
                ''')
    db.commit()

    db.close()

def insertSlot(subjectName, slotNo, day, slotClass, teacherID):
    db = scoped_session(sessionmaker(bind=engine))
    status="_ _"
    subid=-7

    try:
        retVal = db.execute(f'''
                                SELECT * FROM Subjects
                                WHERE SubjectName = '{subjectName}';
                            ''')
        for row in retVal:
            subid = row[0]
        
        if subid==-7:
            with engine.connect() as conn:
                retVal = conn.execute(f'''
                            INSERT INTO subjects (subjectName)
                            VALUES ('{subjectName}')
                            RETURNING *;
                        ''')
                for row in retVal:
                    subid = row[0]
        
        with engine.connect() as conn:
            conn.execute(f'''
                        INSERT INTO slots (subjectID, Slot, Day, Class, teacherID)
                        VALUES ({subid}, {slotNo}, {day}, '{slotClass}', {teacherID});
                    ''')
            status="success"

    except exc.SQLAlchemyError as e:
            print(type(e))
            print(e)
            status = "failure"

    return status

@app.route("/addSlot")
def addSlot():
    subjectName = request.args.get('subjectName', type = str, default='empty').replace('"','')
    slotNo = request.args.get('slotNo', type = int, default=-1)
    day = request.args.get('day', type = int, default=-1)
    slotClass = request.args.get('slotClass', type = str, default='empty').replace('"','')
    teacherID = request.args.get('teacherID', type = int, default=-1)

    result = {}

    if "empty" in [subjectName, slotClass]:
        result["status"]="invalidArg"
    elif -1 in [slotNo, day, teacherID]:
        result["status"]="invalidArg"
    else:
        result["status"]="_"
        createSubjectSlotTable()
        result["status"] = insertSlot(subjectName, slotNo, day, slotClass, teacherID)
    
    return jsonify(result)

# start of 'get all slots of a class' functionality

@app.route("/getSlots")
def getSlot():
    userClass = request.args.get('class', type = str, default='empty').replace('"','')

    result = {}

if __name__ == "__main__":
    app.run(debug=True)