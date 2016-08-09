from flask.ext.wtf import Form
from wtforms import StringField, PasswordField, BooleanField, SubmitField 
from wtforms.validators import Required, Length, Email
class LoginForm(Form):
	username = StringField('username', validators=[Required(), Length(5, 32)])
	password = PasswordField('Password', validators=[Required()])
	submit = SubmitField('Log In')