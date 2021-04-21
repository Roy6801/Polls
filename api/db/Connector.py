import pymysql
import random
import time

char = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


domain = "http://localhost:3000/Poll/"


def userToken(userName):
    return userName + "_" + "".join(random.choices(char, k=50))


def pollURL(conn):
    global char
    url = domain + "".join(random.choices(char, k=50))
    if conn.checkPollURL(url) == 1:
        return url
    else:
        pollURL(conn)


def pollCreate(conn, ts=int(time.time()), deadline=int(time.time())+3600):
    global domain
    if int(deadline) < int(ts):
        deadline = int(ts) + 3600
    pollurl = pollURL(conn)
    pollid = pollurl.replace(domain, "")
    return (pollid, str(ts), pollurl, str(deadline))


class Connection:
    def __init__(self):
        flag = False
        self.conn = None
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
        val = self.cur.fetchone()
        if val is not None and flag == 1:
            return {"userName": val[0], "password": val[1], "firstName": val[2], "lastName": val[3], "email": val[4], "mobileNo": val[5], "userToken": val[6]}
        else:
            return 0

    def userNameExist(self, userName):
        self.query = 'select count(*) from user where userName = BINARY %s'
        flag = self.exec(userName)
        if self.cur.fetchone()[0] == 1 and flag == 1:
            return 1
        else:
            return 0

    def getUserInfo(self, userName):
        self.query = 'select * from user where userName = BINARY %s'
        flag = self.exec(userName)
        val = self.cur.fetchone()
        if flag == 1 and val is not None:
            return val
        else:
            return flag

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
        val = pollCreate(self, data['ts'], data['deadline'])
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
                        val[0]+' add '+data['options'][i]+' int(10) default 0'
                    self.exec()
                self.query = "insert into " + \
                    val[0] + "(sr_no) values(1)"
                flag = self.exec()
                if flag == 1:
                    return val[2]
                else:
                    return flag
            else:
                return 0
        return flag

    def getPollInfo(self, data):
        self.query = 'select * from poll where poll_Id = BINARY %s'
        flag = self.exec(data)
        val = self.cur.fetchone()
        if flag == 1 and val is not None:
            response = {"poll_Id": val[0], "pollName": val[1], "adminUserName": val[2], "verificationCriteria": val[3], "pollURL": val[4],
                        "anonymity": val[5], "timestamp": val[6], "deadline": val[7], "scheduled": val[8], "radio": val[9], "optionsCount": val[10]}
            return response
        else:
            return "0"

    def getPollOptions(self, data):
        self.query = "select * from information_schema.columns where table_name = N'"+data+"'"
        flag = self.exec()
        val = self.cur.fetchall()
        if flag == 1 and val is not None:
            options = dict()
            for i in val:
                if i[3] != 'sr_no':
                    options[i[4] - 1] = i[3]
            return options
        else:
            return "0"

    def getPollResults(self, data):
        self.query = "select * from "+data
        flag = self.exec()
        val = self.cur.fetchone()
        if flag == 1 and val is not None:
            val = list(val)
            del val[0]
            op = self.getPollOptions(data)
            result = dict()
            for i in range(1, len(val)+1):
                result[op[i]] = val[i - 1]
            return result
        else:
            return "0"

    def userInPoll(self, data):
        self.query = "select * from registrant where poll_Id = BINARY %s and userName = BINARY %s"
        flag = self.exec(tuple(data.values()))
        val = self.cur.fetchone()
        print(val)
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

    def participateInPoll(self, registrant, ans, scheduled, radio):
        if scheduled == 1:
            self.query = "update registrant set participated = 1 where userName = %s and poll_Id = %s"
            flag = self.exec(
                tuple([registrant['userName'], registrant['poll_Id']]))
            if flag == 1:
                if radio == 1:
                    self.query = "update " + \
                        registrant['poll_Id']+" set " + \
                        ans+" = "+ans+" + 1 where sr_no = 1"
                    return self.exec()
                else:
                    for op in ans:
                        if op is not None and op != "$$$NULL$$$":
                            self.query = "update " + \
                                registrant['poll_Id']+" set " + \
                                op+" = "+op+" + 1 where sr_no = 1"
                            self.exec()
                    return 1
            else:
                return flag
        else:
            self.query = "insert into registrant(userName, poll_Id, verificationId, participated) values (%s, %s, %s, %s)"
            flag = self.exec(tuple(registrant.values()))
            if flag == 1:
                print(type(radio))
                if radio == 1:
                    self.query = "update " + \
                        registrant['poll_Id']+" set " + \
                        ans+" = "+ans+" + 1 where sr_no = 1"
                    return self.exec()
                else:
                    for op in ans:
                        if op is not None and op != "$$$NULL$$$":
                            self.query = "update " + \
                                registrant['poll_Id']+" set " + \
                                op+" = "+op+" + 1 where sr_no = 1"
                            self.exec()
                    return 1
            else:
                return flag

    def getPollListByAdmin(self, userName):
        self.query = "select poll_Id, pollName from poll where adminUserName = %s order by deadline desc"
        flag = self.exec(userName)
        val = self.cur.fetchall()
        if flag == 1 and val is not None:
            result = dict()
            for i, n in enumerate(val):
                result[i] = n
            return result
        else:
            return "0"

    def getParticipantList(self, poll_Id):
        self.query = "select userName, participated, verificationId from registrant where poll_Id = %s"
        flag = self.exec(poll_Id)
        val = self.cur.fetchall()
        if flag == 1 and val is not None:
            result = dict()
            for i in val:
                result[i[0]] = (i[1], i[2])
            return result
        else:
            return "0"

    def getRegisteredInPolls(self, userName, part):
        self.query = "select registrant.poll_Id, poll.pollName from registrant inner join poll on registrant.poll_Id = poll.poll_Id where userName = %s and participated = %s order by poll.deadline desc"
        flag = self.exec(tuple([userName, part]))
        val = self.cur.fetchall()
        if flag == 1 and val is not None:
            result = dict()
            for i, n in enumerate(val):
                result[i] = n
            return result
        else:
            return "0"


#conn = Connection()

#print(conn.userInPoll({"poll_Id": "mpetgr589esl4fuf64zv3aalidh9keq8nj6dvw4liitbdwkuoz", "userName": "Kai"}))
#print(conn.getRegisteredInPolls("Roy", 1))
#print(conn.getPollListByAdmin("Roy"))
