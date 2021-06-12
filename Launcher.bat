pip3 install virtualenv
virtualenv api\\venv
api\\venv\\Scripts\\pip3 install -r api\\requirements.txt
start /min cmd /c api\\venv\\Scripts\\python api\\app.py
cd ./polls-manager
call npm install
start /min cmd /c npm start