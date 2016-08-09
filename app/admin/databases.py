#coding=utf-8
from app import db
from app.models import Navcat,Article
from sqlalchemy import text
from flask.ext.login import current_user
import hashlib

def dbAddArticle(data,thumbnailData):
	print data
	if data.get('show')=="on":
		show =True
	else:
		show =False

	thumbnail = thumbnailData
	if not thumbnail:
		thumbnail='/static/images/thumbnail.png'
	else:
		thumbnail = '/static/upload/'+thumbnailData

	article = Article(show=show,title=data.get('title'),click=data.get('click'),\
		note=data.get('note'),pid=data.get('pid'),attribute=data.get('hot')\
		,thumbnail=thumbnail,seoKey=data.get('seoKey'),seoDescription=data.get('seoDescription'))
	try:
		db.session.add(article)
		db.session.commit()
		article.url = hashlib.md5(str(article.id)).hexdigest()
		db.session.add(article)
		db.session.commit()
		return True
	except Exception, e:
		db.session.rollback()
		return False


#用户注册
def dbAddNavcat(data):
	html =''
	if data.get('html')=="":
		if data.get('attr')=='0':
			html = 'n.html'
			attr = 0
		if data.get('attr')=='1':
			html = 'a.html'
			attr=1
	else:
		html = data.get('html')
		attr = int(float(str(data.get('attr'))))
	if data.get('show')=="on":
		show =True
	else:
		show =False
	if data.get('pid') =="":
		pid=0
	else:
		pid= data.get('pid')
	
	navcat = Navcat(show=show,title=data.get('title'),\
		sort=data.get('sort'),attr=attr,\
		nlink=data.get('nlink'),html=html,\
		pid=pid,note=data.get('note'),seoKey=data.get('seoKey'),\
		seoDescription=data.get('seoDescription'),url='')

	try:
		db.session.add(navcat)
		db.session.commit()
		navcat.url = hashlib.md5(str(navcat.id)).hexdigest()
		db.session.add(navcat)
		db.session.commit()
		return True
	except Exception, e:
		db.session.rollback()
		return False
#更改导航
def dbEditNavcat(data):
	html =''
	if data.get('html')=="":
		if data.get('attr')=='0':
			html = 'n.html'
			attr = 0
		if data.get('attr')=='1':
			html = 'a.html'
			attr=1
	else:
		html = data.get('html')
		attr = int(float(str(data.get('attr'))))
	if data.get('show')=="on":
		show =True
	else:
		show =False
	if data.get('pid') =="":
		pid=0
	else:
		pid= data.get('pid')
	navcat  = Navcat.query.get(data.get('id'))
	navcat.show=show
	navcat.title=data.get('title')
	navcat.sort =data.get('sort')
	navcat.nlink=data.get('nlink')
	navcat.attr=attr
	navcat.html=html
	navcat.note=data.get('note')
	navcat.seoKey=data.get('seoKey')
	navcat.pid=pid
	navcat.seoDescription=data.get('seoDescription')
	try:
		db.session.commit()
		return True
	except Exception, e:
		db.session.rollback()
		return False

def dbEditArticle(data):
	if data.get('attr')=='0':
		attr = 0
	if data.get('attr')=='1':
		attr=1
	if data.get('attr')=='2':
		attr=2
	if data.get('show')=="on":
		show =True
	else:
		show =False
	if data.get('pid') =="":
		pid=0
	else:
		pid= data.get('pid')
	articl  = Article.query.get(data.get('id'))
	articl.show=show
	articl.title=data.get('title')
	articl.attribute=attr
	articl.note=data.get('note')
	articl.seoKey=data.get('seoKey')
	articl.pid=pid
	articl.seoDescription=data.get('seoDescription')
	try:
		db.session.commit()
		return True
	except Exception, e:
		db.session.rollback()
		return False

def GetAllNavcat():
	return Navcat().query.order_by('sort').all()

def dbGetArticle():
	sqlText = "select *,(select title from navcats p where p.id=a.pid) pidtitle from articles a order by pubd "
	data = db.engine.execute(text(sqlText))
	return data
	# return Article().query.order_by('pubd desc').all()

def dbGetOneArticle(value=''):
	return Article().query.filter_by(url=value).first()

def GetNavcat(condition=id,value=0):
	return Navcat().query.filter_by(url=value).first()

def GetAdminNavcat():
	sqlText = "select *,(select title from navcats p where p.id=n.pid) pidtitle from navcats n order by sort "
	data = db.engine.execute(text(sqlText))
	return data
def dbGetAllArticheNavcat():
	return Navcat().query.filter_by(attr=1).order_by('sort').all()



