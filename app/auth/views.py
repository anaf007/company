#coding=utf-8
from flask import render_template,redirect,request,url_for,flash
from . import auth
from .forms import LoginForm
from ..models import User
from flask.ext.login import logout_user, login_required,login_user
@auth.route('/login', methods=['GET', 'POST'])
def login():
	form = LoginForm()
	if request.method=="POST":
		if form.validate_on_submit():
			user = User.query.filter_by(number=form.username.data).first()
			if user is not None and user.verify_password(form.password.data):
				login_user(user)
				return redirect(request.args.get('next') or url_for('admin/'))
			else:
				return "密码不匹配"
		else:
			return u"数据校验错误"
	else:
		return render_template('auth/login.html',form=form)

@auth.route('/logout')
@login_required
def logout():
	logout_user()
	flash('You have been logged out.') 
	return redirect(url_for('main.index'))
