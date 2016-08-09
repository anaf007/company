#coding=utf-8

from flask import render_template,session,redirect,url_for,send_file,request,make_response
from flask.ext.login import login_required
from . import admin
import os,random
from datetime import datetime
import datetime as dtt
from flask.ext.login import current_app
from .databases import dbAddNavcat,GetAllNavcat,GetNavcat,GetAdminNavcat,dbEditNavcat,dbGetArticle,dbGetAllArticheNavcat,dbAddArticle,dbGetOneArticle,dbEditArticle
from ..models import Navcat,Article,db
@admin.route('/',methods=['GET','POST'])
@login_required
def index():
    return render_template('admin/index.html')
@admin.route('/ckfinder',methods=['GET','POST'])
@login_required
def ckfinder():
	return render_template('admin/ckfinder.html')

@admin.route('/main',methods=['GET','POST'])
@login_required
def main():
	return render_template('admin/main.html',Articlenavcat=dbGetAllArticheNavcat(),click=random.randint(100,200))

#修改密码
@admin.route('/ChangePassword',methods=['GET','POST'])
@login_required
def ChangePassword():
	return render_template('admin/changePassword.html')

#添加导航
@admin.route('/AddNavcat/<url>',methods=['GET','POST'])
@admin.route('/AddNavcat',methods=['GET','POST'])
@login_required
def AddNavcat(url=None):
    
    if request.method=="POST":
        if dbAddNavcat(request.form):
            return redirect('admin/Navcat')
        else:
            return "添加失败，请检查数据是否输入正确。"
    else:
        if url:
            navcatOne = GetNavcat('url',url)
        else:
            navcatOne=[]

        navcat = GetAllNavcat()
        return render_template('admin/AddNavcat.html',navcat= navcat,navcatOne=navcatOne)

#编辑导航
@admin.route('/EditNavcat/<url>',methods=['GET','POST'])
@login_required
def EditNavcat(url):
    if request.method=="POST":
        if dbEditNavcat(request.form):
            return redirect('admin/Navcat')
        else:
            return "更改失败，请检查数据是否输入正确。"
    
    return render_template('admin/EditNavcat.html',navcatOne =GetNavcat('',url),navcat=GetAllNavcat())

#编辑文章
@admin.route('/EditArticle/<url>',methods=['GET','POST'])
@login_required
def EditArticle(url):
    if request.method=="POST":
        print request.form
        if dbEditArticle(request.form):
            return redirect('admin/Article')
        else:
            return "更改失败，请检查数据是否输入正确。"
    
    return render_template('admin/EditArticle.html',article =dbGetOneArticle(url),navcat=GetAllNavcat())



#添加文章
@admin.route('/AddArticle',methods=['GET','POST'])
@login_required
def AddArticle():
    if request.method=="POST":
        fileobj = request.files['thumbnail']
        if fileobj:
            fname, fext = os.path.splitext(fileobj.filename)
            rnd_name = '%s%s' % (gen_rnd_filename(), fext)
            filepath = os.path.join(current_app.static_folder, 'upload', rnd_name)
            fileobj.save(filepath)
        else:
            rnd_name = ''
        

        if dbAddArticle(request.form,rnd_name):
            if request.form.get('url'):
                return redirect(request.form.get('url'))
            return redirect('admin/Article')
        else:
            return "添加失败，请检查数据是否输入正确。"
    else:
        
        return render_template('admin/AddArticle.html',Articlenavcat=dbGetAllArticheNavcat(),click=random.randint(100,200))

#添加banner 横幅
@admin.route('/AddBanner',methods=['GET','POST'])
@login_required
def AddBanner():
	return render_template('admin/AddBanner.html')

#banner管理
@admin.route('/Banner',methods=['GET','POST'])
@login_required
def Banner():
	return render_template('admin/Banner.html')

#文章管理
@admin.route('/Article',methods=['GET','POST'])
@login_required
def Article():
	return render_template('admin/Article.html',article=dbGetArticle())

#导航管理
@admin.route('/Navcat',methods=['GET','POST'])
@login_required
def Navcat():
    navcat = GetAdminNavcat()
    return render_template('admin/Navcat.html',navcat=navcat)

#删除文章
@admin.route('/deleteArticle',methods=['GET','POST'])
@login_required
def deleteArticle():
    article = dbGetOneArticle(request.form.get('url'))
    db.session.delete(article)
    db.session.commit()
    return redirect('admin/Article')



#ckeditor图片上传
def gen_rnd_filename():
    filename_prefix = dtt.datetime.now().strftime('%Y%m%d%H%M%S')
    return '%s%s' % (filename_prefix, str(random.randrange(1000, 10000)))
@admin.route('/upload', methods=['GET', 'POST'])
@login_required
def UploadFileImage():
    """CKEditor file upload"""
    error = ''
    url = ''
    callback = request.args.get("CKEditorFuncNum")
    if request.method == 'POST' and 'upload' in request.files:
        fileobj = request.files['upload']
        fname, fext = os.path.splitext(fileobj.filename)
        rnd_name = '%s%s' % (gen_rnd_filename(), fext)
        filepath = os.path.join(current_app.static_folder, 'upload', rnd_name)
        
        dirname = os.path.dirname(filepath)
        if not os.path.exists(dirname):
            try:
                os.makedirs(dirname)
            except:
                error = 'ERROR_CREATE_DIR'
        elif not os.access(dirname, os.W_OK):
            error = 'ERROR_DIR_NOT_WRITEABLE'
        if not error:
            fileobj.save(filepath)
            url = url_for('static', filename='%s/%s' % ('upload', rnd_name))
    else:
        error = 'post error'
    res = """

<script type="text/javascript">
  window.parent.CKEDITOR.tools.callFunction(%s, '%s', '%s');
</script>

""" % (callback, url, error)
    response = make_response(res)
    response.headers["Content-Type"] = "text/html"
    return response
	

#请求上下文 对于导航栏等的读取
@admin.context_processor
def navcatgetPidName():
    def pidNavcatName():
        return  GetAdminNavcat()
    return dict(pidNavcatName=pidNavcatName)

	
	
