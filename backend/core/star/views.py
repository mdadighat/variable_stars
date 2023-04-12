from flask import render_template, redirect, url_for, request
#from .models import Category
from ..models import Vsxdata
from . import star
from .forms import StarForm
from .. import db
from datetime import datetime

@star.route('/add-star', methods=['GET', 'POST'])
def stars():
    check= None
    star= Vsxdata.query.all()
    date= datetime.now()
    now= date.strftime("%Y-%m-%d")

    form= StarForm()
    #form.category.choices =[(category.id, category.name) for category in Category.query.all()]

    if request.method == "POST":
        if request.form.get('starDelete') is not None:
            deleteStar = request.form.get('checkedbox')
            if deleteStar is not None:
                star = Vsxdata.query.filter_by(id=int(deleteStar)).one()
                db.session.delete(star)
                db.session.commit()
                return redirect(url_for('star.stars'))
            else:
                check = 'Please check-box of task to be deleted'

        elif form.validate_on_submit():
            #selected= form.category.data
            #category= Category.query.get(selected)
            star = Vsxdata(name=form.name.data, auid=form.auid.data, const= form.const.data)
            db.session.add(star)
            db.session.commit()
            return redirect(url_for('star.stars'))


    return render_template('star/star.html', title='Add Star', form=form, star=star, DateNow=now, check=check)