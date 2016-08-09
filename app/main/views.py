#coding=utf-8
from flask import render_template,session,redirect,url_for,send_file,request,abort
from flask.ext.login import login_required
from .forms import reaccountForm

from . import main
from .. import db
from ..models import User,Navcat,Article,SysInfo
from sqlalchemy import text
from flask.ext.login import current_user
from app.admin.databases import GetNavcat



@main.app_errorhandler(404)
def page_not_found(e):
	return render_template('404.html'), 404
@main.app_errorhandler(500)
def internal_server_error(e):
	return render_template('500.html'), 500



#栏目内容，获取栏目下的文章
@main.route('/category/<url>',methods=['GET','POST'])
@main.route('/category/<url>/<int:page>',methods=['GET','POST'])
def category(url,page=1):
	navcat = Navcat().query.filter_by(url=url).first()
	if not navcat:
		abort(404)
	#获取当前目录下的所有文章
	article = Article.query.join(Navcat,)
	if navcat.pid == 0:
		article = Article.query.join(Navcat,Article.pid==Navcat.id).filter(Navcat.pid==navcat.id).paginate(page,5,False)
	else:
		article = Article().query.filter_by(pid=navcat.pid).paginate(page,5,False)
	return render_template(navcat.html,navcatInfo=navcat,news = article)


@main.route('/article/<url>',methods=['GET','POST'])
def article(url):
	article = Article().query.filter_by(url=url).first()
	if not article:
		abort(404)
	navcat = Navcat().query.filter_by(id=article.pid).first()
	article.click = article.click+1
	db.session.add(article) 
	return render_template('article.html',article=article,navcat=navcat)


@main.route('/product/<url>',methods=['GET','POST'])
def product(url):
	return render_template('product.html')



@main.route('/',methods=['GET','POST'])
def index():
	# u = User(number=100000,center=1,tuijian=1,jiedian=1,pwdo='1',pwdt='1')
	# db.session.add(u)
	# db.session.commit()
	return redirect('index.php')
	

@main.route('/index.php',methods=['GET','POST'])
def indexphp():
	return render_template("index.html")

#请求上下文 对于导航栏等的读取
@main.context_processor
def navcatget():
    return dict({'navcattop':Navcat.query.filter_by(pid=0,show=1).order_by('sort').all()})


#请求上下文 获取系统配置
@main.context_processor
def sysget():
    return dict({'sys':SysInfo.query.first()})

#请求上下文 对于导航栏等的读取
@main.context_processor
def navcatArcitle():
    def article(url):
        aid = Navcat.query.filter_by(url=url).first().id
        return Navcat.query.filter_by(pid=aid).order_by('sort').all()
    return dict(navcatArcitle=article)
#请求上下文 栏目的上级目录的读取
@main.context_processor
def navcatArcitlePid():
    def articlePid(url):
    	pid =  Navcat.query.filter_by(url=url).first().pid
    	if pid ==0:
    		return []
    	return Navcat.query.filter_by(pid=pid).order_by('sort').all()
        
    return dict(navcatArcitlepid=articlePid)













