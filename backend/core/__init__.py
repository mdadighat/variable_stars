from flask import Flask
from config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import jsonify
import json
import jsonpickle
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Configuration)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# blueprint for non-authentication parts of the app
from .star import star as star_blueprint
app.register_blueprint(star_blueprint)
CORS(app, origins=[
  'http://localhost:3000',
])

from core import views, models

@app.route('/stars')
def get_stars():
    stars= models.Vsxdata.query.filter_by(const="Ori").limit(1000).all()
    response_body = []

    starJson = jsonpickle.encode(stars)
    starData = json.loads(starJson)
    response_body.append(starData)

    jsonResponse = jsonify(response_body)
    jsonResponse.headers.add("Access-Control-Allow-Origin", "*")
    return jsonResponse