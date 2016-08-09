#coding=utf-8
from .import db
from datetime import datetime
from wtforms import TextAreaField
from wtforms.widgets import TextArea
import random
from flask.ext.login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



class User(UserMixin,db.Model):
	__tablename__ = 'users'
	id = db.Column(db.Integer,primary_key=True) 
	number = db.Column(db.String(64),index=True,unique=True,nullable=False) #管理员账号
	pwd_hash = db.Column(db.String(128),nullable=False) #密码1哈希
	last_seen = db.Column(db.DateTime(),default=datetime.utcnow) #最后一次登录时间
	pubd =  db.Column(db.DateTime(),default=datetime.utcnow)#创建时间
	

	def __str__(self):
		return "users %s" %self.number
	def __repr__(self):
		return "users %s" %self.number

	@property
	def pwd(self):
	    raise AttributeError('password is not a readable attribute')

	@pwd.setter
	def pwd(self, value):
	    self.pwd_hash = generate_password_hash(value)

	def verify_password(self, password):
		return check_password_hash(self.pwd_hash,password)

from . import login_manager
@login_manager.user_loader
def load_user(user_id):
	return User.query.get(int(user_id))


class Navcat(db.Model):
	__tablename__ = 'navcats'
	id = db.Column(db.Integer,primary_key=True)
	show = db.Column(db.Boolean,default=True)
	title = db.Column(db.String(64),nullable=False)#导航名称
	sort = db.Column(db.Integer,default=100,nullable=False)#排序
	pubd =  db.Column(db.DateTime(),default=datetime.utcnow)#创建时间
	attr  = db.Column(db.Integer,default=0,nullable=False) #栏目属性 0内容页  1列表 
	nlink = db.Column(db.String(64)) #外链
	html  = db.Column(db.String(64),nullable=False)#默认模板
	note =db.Column(db.UnicodeText) #内容
	pid  = db.Column(db.Integer)   #pid
	seoKey = db.Column(db.String(64))#优化关键字
	seoDescription = db.Column(db.String(64))#优化描述
	url = db.Column(db.String(32)) #加密地址
	
	def __str__(self):
		return '%s'%self.title

class Banner(db.Model):
	__tablename__ = 'banners'
	id = db.Column(db.Integer,primary_key=True)
	show = db.Column(db.Boolean,default=True)
	title = db.Column(db.String(64),nullable=False)
	photo = db.Column(db.UnicodeText)#排序
	
	def __str__(self):
		return '%s'%self.title


class Article(db.Model):
	__tablename__ = 'articles'
	id = db.Column(db.Integer,primary_key=True)
	show = db.Column(db.Boolean,default=True)
	title = db.Column(db.String(64),nullable=False,index=True)#标题名称
	pubd =  db.Column(db.DateTime(),default=datetime.utcnow,index=True)#创建时间
	click = db.Column(db.Integer,default=random.randint(100,200)) #点击次数
	note =db.Column(db.UnicodeText) #内容
	pid  = db.Column(db.Integer)   #所属导航栏
	attribute = db.Column(db.Integer,default=0,index=True)  #0默认   1热门  2推荐？
	thumbnail = db.Column(db.UnicodeText) #缩略图
	seoKey = db.Column(db.String(64))#优化关键字
	seoDescription = db.Column(db.String(64))#优化描述
	url = db.Column(db.String(64),index=True)#文章路径
	def __str__(self):
		return '%s'%self.title

class SysInfo(db.Model):
	__tablename__ = 'sysinfo'
	id = db.Column(db.Integer,primary_key=True)
	webname =db.Column(db.String(64),nullable=False)#网站名称
	webnote =db.Column(db.String(64),nullable=False)#网站介绍
	powerby =db.Column(db.String(128))#网站版权
	keywords =db.Column(db.UnicodeText)#网站关键字
	description =db.Column(db.UnicodeText)#网站描述
	viewcount = db.Column(db.Integer)  #查看次数



			



"""
class Navcat(db.Model):
	__tablename__ = 'Navcat'
	id = db.Column(db.Integer,primary_key=True)
	show = db.Column(db.Boolean,default=True)
	title = db.Column(db.String(64),nullable=False)#导航名称
	sort = db.Column(db.Integer,default=100,nullable=False)#排序
	pubd =  db.Column(db.DateTime(),default=datetime.utcnow)#创建时间
	attr  = db.Column(db.Integer,default=0,nullable=False) #栏目属性
	nlink = db.Column(db.String(64)) #外链
	html  = db.Column(db.String(64),nullable=False)#默认模板
	note =db.Column(db.UnicodeText) #内容
	pid  = db.Column(db.Integer,db.ForeignKey('Navcat.id'))
	arr_pid = db.relationship('Navcat',backref=db.backref('parent',remote_site=[id],),)
	def __str__(self):
		return '%s'%self.title


class Archives(db.Model):
	__tablename__ = 'archives'
	id = db.Column(db.Integer,primary_key=True)
	show = db.Column(db.Boolean,default=True)
	title = db.Column(db.String(64),nullable=False)#内容名称
	sort = db.Column(db.Integer,default=100,nullable=False)#排序
	pubd =  db.Column(db.DateTime(),default=datetime.utcnow)#创建时间
	click = db.Column(db.Integer,default=random.randint(100,200)) #点击次数
	note =db.Column(db.UnicodeText) #内容
	navcat_id = db.Column(db.Integer,db.ForeignKey('Navcat.id'))
	Navcat = db.relationship('Navcat',backref='Navcat')
	def __str__(self):
		#return '%s'%self.title


#下面是富编辑器的
class CKTextAreaWidget(TextArea):
	def __call__(self,field,**kwargs):
		kwargs.setdefault('class_','cheditor')
		return super(CKTextAreaWidget,self).__call__(field,**kwargs)

class CKTextAreaField(TextAreaField):
	widget = CKTextAreaWidget()

"""










	