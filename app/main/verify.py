#coding=utf-8
from app import db
from app.models import UserInfo,User
def verify_form_reaccount(data):
	#保单中心  为空  或者不是数字
	if data.get('center')==''  or not str(data.get('center')).isdigit():
		return u'报单中心不能为空并且只能是数字'
	#推荐人  为空 或者不是数字
	if data.get('tuijian')=='' or not str(data.get('tuijian')).isdigit():
		return u'推荐人不能为空并且只能是数字'
	#接点人    为空 或者不是数字
	if data.get('jiedian')=='' or not str(data.get('jiedian')).isdigit():
		return u'接点人不能为空并且只能是数字'
	#会员编号   为空 或者  不为数字
	if data.get('number')=='' or not str(data.get('number')).isdigit():
		return u'会员编号不能为空并且只能是数字'
	#密码  为空或者两次不一样
	if data.get('password')=='' or data.get('password') !=data.get('repassword'):
		return u'两次密码必须相同且不能为空'
	#密码长度不在6-18
	if len(data.get('password'))<6 or len(data.get('password'))>18:
		return '密码长度必须在6-18位'
	#安全密码   长度不在6-18
	if len(data.get('safe_password'))<6 or len(data.get('safe_password'))>18:
		return '安全码长度必须在6-18位'
	#安全密码两次不一样  
	if data.get('safe_password')=='' or data.get('safe_password') !=data.get('resafe_password'):
		return '安全吗两次输入必须相同且不能为空'
	#姓名  不能为空
	if data.get('username')=='':
		return '用户名不能为空'
	#手机号码    不能为空
	if data.get('phone')=='':
		return "手机号码不能为空"
	if data.get('bank_name')=='':
		return "银行卡号不能为空"
	if data.get('yinhangkahao')=='':
		return False
	if data.get('kaihuname')=='':
		return False
	if data.get('kaihucity')=='':
		return False
	if data.get('kaihus')=='':
		return False
	if data.get('kaihuadd')=='':
		return False
	if data.get('shenfenzheng')=='':
		return False
	if data.get('address')=='':
		return False
	if data.get('email')=='':
		return False
	if data.get('qq')=='':
		return False
	if data.get('goodsname')=='':
		return False
	if data.get('goodsphone')=='':
		return False
	if data.get('goodsaddress')=='':
		return False
	if data.get('product')=='':
		return False
	return True

def verify_database_reaccount(data):
	jiedian = User.query.filter_by(number=data.get('jiedian')).first()
	tuijian = User.query.filter_by(number=data.get('tuijian')).first()
	center = User.query.filter_by(number=data.get('center')).first()
	number = User.query.filter_by(number=data.get('number')).first()
	phone = UserInfo.query.filter_by(phone=data.get('phone')).first()
	num = UserInfo.query.filter_by(num=data.get('shenfenzheng')).first()
	if not jiedian:return u'数据校验失败，接点人不存在'
	if not tuijian:return u'数据校验失败，推荐人不存在'
	if not center:return u'数据校验失败，保单中心不存在'
	if number:return u'数据校验失败，该编号已经存在'
	if phone:return u'数据校验失败，该手机号码已经存在'
	if num:return u'数据校验失败，该身份证号已经存在'
	return ''






def verify_form_tuijianjiang(data):
	if len(data.get('title'))<1 or len(data.get('title'))>10:
		return False
	if not str(data.get('price')).isdigit():
		return False
	if not str(data.get('jiangli')).isdigit():
		return False
	if len(data.get('remark')) < 1 and len(data.get('remark'))>1000:
		return False
	return True