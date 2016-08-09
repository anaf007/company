#coding=utf-8
from app import db
from app.models import UserInfo,User
from sqlalchemy import text
from flask.ext.login import current_user

#用户注册
def insert_reaccount(data):
	user = User(number=data.get('number'),center=data.get('center'),\
		tuijian=data.get('tuijian'),jiedian=data.get('jiedian'),\
		pwdo=data.get('password'),pwdt=data.get('safe_password'))
	
	userinfo = UserInfo(user_id=data.get('number'),username=data.get('username'),\
		yinhang=data.get('bank_name'),carNum=data.get('yinhangkahao'),\
		carName=data.get('kaihuname'),carCity=data.get('kaihucity'),\
		carS=data.get('kaihus'),carA=data.get('kaihuadd'),num=data.get('shenfenzheng'),\
		address=data.get('address'),email=data.get('email'),phone=data.get('phone'),\
		qq=data.get('qq'),level=int(float(str(data.get('product')))))

	
	try:
		db.session.add(user)
		db.session.add(userinfo)
		db.session.commit()
	except Exception, e:
		db.session.rollback()
		raise e

#用户查看自身名下注册会员
def UserAndInfo():
	sqlText = "select * from users u join userinfo i where  i.user_id=u.number and u.tuijian=':name' order by u.static,pubd"
	data = db.engine.execute(text(sqlText),{'name':current_user.number})
	return data


def GetUserAndInfo(uid):
	sqlText = "select * from users u join userinfo i where i.user_id = u.number and u.number=:name "
	data = db.engine.execute(text(sqlText),{'name':uid})
	return data




