import smtplib
import json

with open("credentials.json", "r") as file:
    cred = json.load(file)


class Send:
    def __init__(self):
        global cred
        self.server = smtplib.SMTP('smtp.gmail.com', 587)
        self.server.starttls()
        self.server.login(cred['email'], cred['password'])

    def message(self, receiver, pollName, url):
        global cred
        text = '''You had previously registered for the poll '''+pollName+'''
        .\nPoll is about to start shortly. Participate in the poll using the link :
        \n\t'''+url+'''\n\nPolls-Manager-G22.'''
        self.server.sendmail(cred['email'], receiver)
