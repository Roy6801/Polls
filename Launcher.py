import os

os.system('pip3 install virtualenv')
os.system('virtualenv api\\venv')
os.system('api\\venv\\Scripts\\pip3 install -r api\\requirements.txt')
os.system('start /min cmd /c api\\venv\\Scripts\\python api\\app.py')
os.chdir('./polls-manager')
os.system('npm install')
os.system('start /min cmd /c npm start')
