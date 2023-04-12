from flask import Flask
from config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import jsonify
import json
import jsonpickle

app = Flask(__name__)
app.config.from_object(Configuration)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# blueprint for non-authentication parts of the app
from .star import star as star_blueprint
app.register_blueprint(star_blueprint)

from core import views, models

@app.route('/stars')
def get_stars():
    stars= models.Vsxdata.query.filter_by(const="Ori").all()
    response_body = []
   # for star in stars:
    starJson = jsonpickle.encode(stars)
    starData = json.loads(starJson)
    response_body.append(starData)

    jsonResponse = jsonify(response_body)

    return jsonResponse