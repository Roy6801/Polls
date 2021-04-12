import pymysql
import random
import time

char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


domain = "http://localhost:3000/Poll/"


def userToken(userName):
    return userName + "_" + "".join(random.choices(char, k=50))


def pollURL():
    global char
    url = domain + "".join(random.choices(char, k=50))
    if conn.checkPollURL(url) == 1:
        return url
    else:
        pollURL()


def pollCreate(ts=int(time.time()), deadline=int(time.time())+3600):
    global domain
    if int(deadline) < int(ts):
        deadline = int(ts) + 3600
    pollurl = pollURL()
    pollid = pollurl.replace(domain, "")
    return (pollid, str(ts), pollurl, str(deadline))


class Connection:
    def __init__(self):
        flag = False
        conn = None
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

    def token(self, data):
        self.query = 'select * from user where userToken = %s'
        flag = self.exec(data['userToken'])
        try:
            val = self.cur.fetchone()
        except:
            val = 0
        if val != 0 and flag == 1:
            return {"userName": val[0], "password": val[1], "firstName": val[2], "lastName": val[3], "email": val[4], "mobileNo": val[5], "userToken": val[6]}
        else:
            return 0

    def userNameExist(self, userName):
        print(userName)
        self.query = 'select count(*) from user where userName = BINARY %s'
        flag = self.exec(userName)
        if self.cur.fetchone()[0] == 1 and flag == 1:
            return 1
        else:
            return 0

    def createUser(self, data):
        if not self.userNameExist(data['userName']):
            self.query = 'insert into user values (%s, %s, %s, %s, %s, %s, %s)'
            flag = self.exec(tuple(data.values()))
            return flag
        else:
            return 0

    def verifyUser(self, data):
        if self.userNameExist(data['userName']) == 1:
            self.query = 'select password from user where userName = %s'
            flag = self.exec(data['userName'])
            if self.cur.fetchone()[0] == data['password'] and flag == 1:
                val = userToken(data['userName'])
                self.query = 'update user set userToken = %s where userName = %s'
                if self.exec((val, data['userName'])) == 1:
                    return val
                else:
                    return 0
            else:
                return 0
        else:
            return 0

    def checkPollURL(self, url):
        self.query = 'select count(*) from poll where pollURL = %s'
        flag = self.exec(url)
        if self.cur.fetchall()[0][0] == 0 and flag == 1:
            return 1
        else:
            return 0

    def createPoll(self, data):
        val = pollCreate(data['ts'], data['deadline'])
        pollData = {"poll_Id": val[0], "pollName": data['pollName'], "adminUserName": data['userName'], "verificationCriteria": data['verificationCriteria'], "pollURL": val[2],
                    "anonymity": data['anonymity'], "timestamp": val[1], "deadline": val[3], "scheduled": data['scheduled'], "radio": data['radio'], "optionsCount": data['optionsCount']}
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
        print(data)
        self.query = 'select * from poll where poll_Id = BINARY %s'
        flag = self.exec(data)
        if flag == 1:
            val = self.cur.fetchone()
            response = {"poll_Id": val[0], "pollName": val[1], "adminUserName": val[2], "verificationCriteria": val[3], "pollURL": val[4],
                        "anonymity": val[5], "timestamp": val[6], "deadline": val[7], "scheduled": val[8], "radio": val[9], "optionsCount": val[10]}
            return response
        else:
            return 0

    def userInPoll(self, data):
        self.query = "select * from registrant where poll_Id = BINARY %s and userName = BINARY %s"
        flag = self.exec(tuple(data.values()))
        val = self.cur.fetchone()
        if flag == 1 and val is None:
            return 1
        elif flag == 1 and val is not None:
            if val[4] == 0:
                return 2
            else:
                return 3
        else:
            return flag

    def registerForPoll(self, data):
        self.query = "insert into registrant(userName, poll_Id, verificationId) values (%s, %s, %s)"
        flag = self.exec(tuple(data.values()))
        return flag

    def getPollListByAdmin(self, userName):
        pass

    def getAdminByPoll_Id(self, poll_Id):
        pass

    def getRegistrantList(self, poll_Id):
        pass

    def getParticipantList(self, poll_Id):
        pass
