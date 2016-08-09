#coding=utf-8
from flask import Flask,render_template
from flask.ext.moment import Moment
from flask.ext.sqlalchemy import SQLAlchemy
from config import config
moment = Moment()
db = SQLAlchemy()
from flask.ext.login import LoginManager
login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'

from .models import User
def create_app(config_name):
	app = Flask(__name__)
	app.config.from_object(config[config_name])
	config[config_name].init_app(app)
	moment.init_app(app)
	db.init_app(app)

	from .main import main as main_blueprint
	app.register_blueprint(main_blueprint)


	from .admin import admin as admin_blueprint
	app.register_blueprint(admin_blueprint,url_prefix='/admin')

	from .auth import auth as auth_blueprint 
	app.register_blueprint(auth_blueprint, url_prefix='/auth')
	
	login_manager.init_app(app)
	# app.config["SQLALCHEMY_ECHO"] = True  #显示sql语句

	return app

