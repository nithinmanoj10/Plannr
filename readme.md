![Plannr Logo](https://github.com/nithinmanoj10/Plannr/blob/master/plannr_frontend/src/images/Plannr%20Banner.png?raw=true)

## Installing Git

Follow this tutorial if you haven't installed Git yet, else proceed to the next step.

[Install Git and Github in VSCode](https://www.jcchouinard.com/install-git-in-vscode/)

After installing it, run the following command to see if Git is successfully installed.

```
git --version
```

It should output the current verison of Git installed.

## Installing the WebApp

You can clone this repo to start using this webapp in your machine

Type the following command in the terminal in any working directory

```
git clone https://github.com/nithinmanoj10/Plannr.git
```

## Installing Flask and Setting Up the Virtual Environment

We need to setup the Virtual Environment and install Flask so that our python servers are working properly.

To run this on your system, you need to start up both frontend and backend.

## Backend:

1. Move into the backend directory.

```
cd plannr_backend
```

2. Activate the virtual environment.
   If you are on Windows, this can be done via Powershell with:

```
.\plannrVenv\Scripts\activate.ps1
```

3. Run the server file.

```
python server.py
```

4. Check if its running by loading http://localhost:5000/test on your browser.

## Frontend

1. Move into the frontend directory

```
cd plannr_frontend
```

2. Start the frontend using

```
npm start
```

3. Open http://localhost:3000/ on your browser. Check if your connection works by looking for a array called _connTest_ in your console.

Once the frontend and backend are working fine, proceed to pray that we finish this somehow. And hopefully, on time 🙂.
