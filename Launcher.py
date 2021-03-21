import os

def dependency():
	os.chdir('./polls-manager')
	os.system('pip3 install virtualenv')
	os.system('virtualenv api\\venv')
	os.system('api\\venv\\Scripts\\pip3 install -r requirements.txt')
	os.system('npm install')

dependency()
os.system('start /min cmd /c npm run start-api')
os.system('start /min cmd /c npm start')
