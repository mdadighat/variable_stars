from flask_wtf import FlaskForm
from wtforms import StringField, TimeField, DateField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length, Email, EqualTo

class StarForm(FlaskForm):
    auid = StringField('AUID', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    const = StringField('Constellation', validators=[DataRequired()])
    #category = SelectField('Category', coerce=int , validators=[DataRequired()])
    #date = DateField('Date', format='%Y-%m-%d' , validators=[DataRequired()])
    #time = TimeField('Time', format='%H:%M' , validators=[DataRequired()])
    submit = SubmitField('Add star')
