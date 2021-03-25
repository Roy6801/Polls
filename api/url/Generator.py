import random
import time

char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


def registerURL():
    global char
    return "REG"+"".join(random.choices(char, k=50))


def pollURL():
    global char
    return "".join(random.choices(char, k=50))


def pollCreate(scheduled=0, deadline=int(time.time())+3600):
    ts = int(time.time())
    if deadline > ts:
        pass
    else:
        deadline = ts + 3600
    pollurl = pollURL()
    pollid = str(ts)+"_"+pollurl
    if scheduled == 0:
        return (pollid, ts, pollurl, deadline)
    elif scheduled == 1:
        regurl = registerURL()
        return (pollid, ts, pollurl, deadline, regurl)


val = pollCreate(scheduled=1)
print(val)
