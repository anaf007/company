#coding=utf-8
import os
basedir = os.path.abspath(os.path.dirname(__file__))
class Config:
	# SECRET_KEY = os.environ.get('SECRET_KEY')#环境变量，设置完毕  要重启
	SECRET_KEY = os.environ.get('SSH_AUTH_SOCK')#环境变量，设置完毕  要重启
	SQLALCHEMY_COMMIT_ON_TEARDOWN = True
	FLASKY_MAIL_SUBJECT_PREFIX = '[Flasky]'
	FLASKY_MAIL_SENDER = 'Flasky Admin <flasky@example.com>'
	FLASKY_ADMIN = os.environ.get('FLASKY_ADMIN')
	@staticmethod
	def init_app(app):
		pass
class DevelopmentConfig(Config):
	DEBUG = True
	MAIL_SERVER = 'smtp.googlemail.com'
	MAIL_PORT = 587
	MAIL_USE_TLS = True
	SQLALCHEMY_TRACK_MODIFICATIONS = True
	MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
	MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
	USERNAME = os.environ.get('COMPANY_USERNAME') or 'root'
	PASSWORD = os.environ.get('COMPANY_PASSWORD') or 'cnpl3815241'
	SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or 'mysql://'+USERNAME+':'+PASSWORD+'@127.0.0.1:3306/company'
class TestingConfig(Config):
	TESTING = True
	SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'data-test.sqlite')
class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
config = {'development': DevelopmentConfig,\
	'testing': TestingConfig,\
	'production': ProductionConfig,\
	'default': DevelopmentConfig\
	}