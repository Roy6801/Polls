import pymysql


class Connection:
    def __init__(self):
        conn = pymysql.connect(user="root", password="", host="localhost",
                               port=3308, database="polls_manager", autocommit=1)
        self.cur = conn.cursor()

    def exec(self, *args):
        try:
            self.cur.execute(self.query, *args)
        except Exception as e:
            print(e)

    def userNameExist(self, userName):
        self.query = 'select count(*) from user where userName = %s'
        self.exec(userName)
        if self.cur.fetchone()[0] == 1:
            return 1
        else:
            return 0

    def createUser(self, userName, password, firstname, lastname, email, mobileNo):
        if not self.userNameExist(userName):
            self.query = 'insert into user values (%s, %s, %s, %s, %s, %s)'
            self.exec((userName, password, firstname,
                       lastname, email, mobileNo))
            return 1
        else:
            return 0

    def verifyUser(self, userName, password):
        if self.userNameExist(userName):
            self.query = 'select password from user where userName = %s'
            self.exec(userName)
            if self.cur.fetchone()[0] == password:
                return 1
            else:
                return 0
        else:
            return 0

    def getUserInfo(self, userName):
        self.query = 'select * from user where userName = %s'
        self.exec(userName)
        return self.cur.fetchone()

    def getPollListByAdmin(self, userName):
        pass

    def getAdminByPollId(self, poll_Id):
        pass

    def getRegistrantList(self, userName, poll_Id):
        pass
