![Plannr Logo](https://github.com/nithinmanoj10/Plannr/blob/master/plannr_frontend/src/images/Plannr%20Banner.png?raw=true)

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Installing the WebApp](#installing-the-webapp)
- [Setting Up the Virtual Environment](#setting-up-the-virtual-environment)
- [Installing Backend requirements](#installing-backend-requirements)
- [Installing Frontend requirements](#installing-frontend-requirements)
- [Installing PostgreSQL Database](#installing-postgresql-database)
- [Starting the Backend:](#starting-the-backend)
- [Starting the Frontend](#starting-the-frontend)

## Pre-requisites

Make sure these are installed before continuing with the rest of the installations. You may click on the links for the tutorial.

1. [Node.js and npm](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
2. [Git](https://www.jcchouinard.com/install-git-in-vscode/)
3. [Python](https://www.python.org/downloads/)
4. [pip](https://phoenixnap.com/kb/install-pip-windows)

## Installing the WebApp

You can clone this repo to start using this webapp in your local machine

Type the following command in the terminal in any working directory

```
git clone https://github.com/nithinmanoj10/Plannr.git
```

## Setting Up the Virtual Environment

Install virtualenv

```
pip install virtualenv
```

Go back one directory and install the PlannrEnv environment folder.

```
cd ../
python -m virtualenv PlannrEnv
```

Before activating the virtualenv, we need to set the Set-ExecutionPolicy as unrestricted.

1. Open Powershell as administrator
2. Run the following
   ```
   Set-ExecutionPolicy unrestricted
   ```
3. Selection option A for `[A] Yes to All`

Now go back to the terminal you were using earlier

Activate the environment

```
.\PlannrEnv\Scripts\activate.ps1
```

## Installing Backend requirements

Now go into the `plannr_backend` folder and install all the requirements

```
cd .\Plannr\plannr_backend
pip install -r requirements.txt
```

## Installing Frontend requirements

Go into the `plannr_frontend` folder and install all the requirements

```
cd ..\plannr_frontend
npm install
```

## Installing PostgreSQL Database

We will be using the postgreSQL as our database. Make sure it is installed in your system. You can follow this video tutorial to do so.

_Note: Please make sure to remember the password you have set as it is really important when starting the database. Recommended that the password only has alphabets and numbers and no special characters._

[Install PostgreSQL](https://www.youtube.com/watch?v=RAFZleZYxsc)

Please follow the given steps after installing PostgreSQL to setup a local session of the Plannr Database.

1. Open up SQL Shell (PSQL)

   ![open psql](https://github.com/nithinmanoj10/Plannr/blob/master/Images/open_psql.JPG?raw=true)

2. Hit enter 4 times to set to the default values and then enter your password.

   ![enter psql details](https://github.com/nithinmanoj10/Plannr/blob/master/Images/psql_enter_details.JPG?raw=true)

   You can ignore the warning

3. Create the plannr database. You can use `\l` to view all your databases.

   ```
   CREATE DATABASE plannr;
   \l
   ```

   ![create database](https://github.com/nithinmanoj10/Plannr/blob/master/Images/create_database.JPG?raw=true)

4. Connect to the plannr database

   ```
   \c plannr
   ```

   ![connect database](https://github.com/nithinmanoj10/Plannr/blob/master/Images/connect%20database.JPG?raw=true)

5. Connect to the plannr database from `server.py`

   1. Go to `server.py` inside the `plannr_backend` folder.
   2. Locate to line 11 and set the `databasePassword` variable to your PostgreSQL password.

## Starting the Backend:

_Note: Make sure the virtual enviroment is activated._

While still inside the `plannr_backend` directory, run

```
python server.py
```

Check if its running by loading http://localhost:5000/test on your browser.

## Starting the Frontend

While inside the `plannr_frontend` directory, run

```
npm start
```

Open http://localhost:3000/ on your browser. Check if your connection works by looking for a array called _connTest_ in your console.

Once the frontend and backend are working fine, proceed to pray that we finish this somehow. And hopefully, on time 🙂!
