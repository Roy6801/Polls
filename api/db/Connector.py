import pymysql
import random
import time

char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


def registerURL():
    global char
    url = "REG"+"".join(random.choices(char, k=50))
    if conn.checkRegisterURL(url) == 1:
        return url
    else:
        registerURL()


def pollURL():
    global char
    url = "".join(random.choices(char, k=50))
    if conn.checkPollURL(url) == 1:
        return url
    else:
        pollURL()


def pollCreate(scheduled=0, deadline=int(time.time())+3600):
    ts = int(time.time())
    if int(deadline) > ts:
        pass
    else:
        deadline = ts + 3600
    pollurl = pollURL()
    pollid = str(ts)+"_"+pollurl
    if scheduled == 0:
        return (pollid, str(ts), pollurl, str(deadline), "")
    elif scheduled == 1:
        regurl = registerURL()
        return (pollid, str(ts), pollurl, str(deadline), regurl)


class Connection:
    def __init__(self):
        try:
            conn = pymysql.connect(user="root", password="", host="localhost",
                                   port=3306, database="polls_manager", autocommit=1)
        except:
            conn = pymysql.connect(user="root", password="", host="localhost",
                                   port=3308, database="polls_manager", autocommit=1)
        self.cur = conn.cursor()

    def exec(self, *args):
        try:
            self.cur.execute(self.query, *args)
            return 1
        except Exception as e:
            print(e)
            return 0

    def userNameExist(self, userName):
        self.query = 'select count(*) from user where userName = %s'
        flag = self.exec(userName)
        if self.cur.fetchone()[0] == 1 and flag == 1:
            return 1
        else:
            return 0

    def createUser(self, data):
        if not self.userNameExist(data['userName']):
            self.query = 'insert into user values (%s, %s, %s, %s, %s, %s)'
            flag = self.exec(tuple(data.values()))
            return flag
        else:
            return 0

    def verifyUser(self, data):
        if self.userNameExist(data['userName']):
            self.query = 'select password from user where userName = %s'
            flag = self.exec(data['userName'])
            if self.cur.fetchone()[0] == data['password'] and flag == 1:
                return 1
            else:
                return 0
        else:
            return 0

    def getUserInfo(self, data):
        self.query = 'select * from user where userName = %s'
        flag = self.exec(data['userName'])
        if flag == 1:
            val = self.cur.fetchone()
            return {"userName": val[0], "password": val[1], "firstName": val[2], "lastName": val[3], "email": val[4], "mobileNo": val[5]}
        else:
            return 0

    def checkPollURL(self, url):
        self.query = 'select count(*) from poll where pollURL = %s'
        flag = self.exec(url)
        if self.cur.fetchall()[0][0] == 0 and flag == 1:
            return 1
        else:
            return 0

    def checkRegisterURL(self, url):
        self.query = 'select count(*) from poll where registerURL = %s'
        flag = self.exec(url)
        if self.cur.fetchall()[0][0] == 0 and flag == 1:
            return 1
        else:
            return 0

    def createPoll(self, data):
        val = pollCreate(data['scheduled'], data['deadline'])
        pollData = {"poll_Id": val[0], "adminUserName": data['userName'], "verificationCriteria": "Aadhar", "registerURL": val[4], "pollURL": val[2],
                    "anonymity": 0, "timestamp": val[1], "deadline": val[3], "scheduled": 1, "radio": 1, "optionsCount": 4}
        self.query = 'insert into poll values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        flag = self.exec(tuple(pollData.values()))
        if flag == 1:
            self.query = 'create table ' + \
                val[0]+' (sr_no int(1) not null primary key auto_increment) engine="InnoDB"'
            if self.exec() == 1:
                for i in range(len(data['options'])):
                    self.query = 'alter table ' + \
                        val[0]+' add '+data['options'][i]+' int(10)'
                    self.exec()
                return 1
            else:
                return 0
        return flag

    def getPollInfo(self, data):
        if data[0:3] == "REG":
            self.query = 'select * from poll where registerURL = %s'
        else:
            self.query = 'select * from poll where pollURL = %s'
        flag = self.exec(data)
        if flag == 1:
            val = self.cur.fetchone()
            response = {"poll_Id": val[0], "adminUserName": val[1], "verificationCriteria": val[2], "registerURL": val[3], "pollURL": val[4],
                        "anonymity": val[5], "timestamp": val[6], "deadline": val[7], "scheduled": val[8], "radio": val[9], "optionsCount": val[10]}
            return response
        else:
            return 0

    def registerForPoll(self, data):
        pass

    def getPollListByAdmin(self, userName):
        pass

    def getAdminByPoll_Id(self, poll_Id):
        pass

    def getRegistrantList(self, poll_Id):
        pass

    def getParticipantList(self, poll_Id):
        pass


conn = Connection()

userData = {"userName": "Bose", "password": "Mondal06$", "firstName": "Sonu",
            "lastName": "Mondal", "email": "m@g", "mobileNo": "7900122097"}

pollForm = {"userName": "Kaara", "verificationCriteria": "Aadhar", "deadline": "1616866213",
            "anonymity": 0, "scheduled": 0, "radio": 1, "optionsCount": 4, "options": ["Maths", "History", "Science", "Civics"]}


# print(conn.verifyUser(userData))
print(conn.createPoll(pollForm))
# print(conn.checkRegisterURL("REGNQ1V02hdojVEJnCbswvgCgMPHovlOb6r8OPXaqzOek7Bk3TYF9"))
#print(conn.getPollInfo(
#    "trbORxo5tuBIwVgD3moQ3T4EDQilpIPXWp52N5cUgfvsXkKdrh"))
