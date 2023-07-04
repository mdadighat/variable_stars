from flask import Flask, request
from sqlalchemy import func, select
from config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import jsonify
import json
import jsonpickle
from flask_cors import CORS
from core.tools.location import get_altitude
import jsonpickle.ext.numpy as jsonpickle_numpy
jsonpickle_numpy.register_handlers()


app = Flask(__name__)
app.config.from_object(Configuration)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# blueprint for non-authentication parts of the app
from .star import star as star_blueprint
app.register_blueprint(star_blueprint)
CORS(app)

from core import views, models

@app.route('/stars_test')
def get_stars_test():
    stars= models.Vsxdata.query.filter_by(const="Ori").limit(1000).all()
    response_body = []

    starJson = jsonpickle.encode(stars)
    starData = json.loads(starJson) # type: ignore
    response_body.append(starData)

    jsonResponse = jsonify(response_body)
    jsonResponse.headers.add("Content-Type", "application/json")
    jsonResponse.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    jsonResponse.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    jsonResponse.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    jsonResponse.headers.add("Access-Control-Allow-Credentials", "true")
    
    return jsonResponse

@app.route('/stars')


def get_stars():
    #sql alchemy pagination

    page= request.args.get("page", 1, type=int)
    per_page = request.args.get("per-page", 100, type=int)
    stars = models.Vsxdata.query.paginate(page=page, per_page=per_page, error_out=False)
    stars = get_altitude(stars) 
    response_body = []

    starJson = jsonpickle.encode(stars.items)
    starData = json.loads(starJson) # type: ignore
    response_body.append(starData)

    jsonResponse = jsonify(response_body)
    jsonResponse.headers.add("Content-Type", "application/json")
    jsonResponse.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    jsonResponse.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    jsonResponse.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    jsonResponse.headers.add("Access-Control-Allow-Credentials", "true")
    
    return jsonResponse

@app.route('/starCount')
def get_star_count():
    row_count = db.session.query(func.count(models.Vsxdata.id)).scalar()

    jsonResponse = jsonify(row_count)
    jsonResponse.headers.add("Content-Type", "application/json")
    jsonResponse.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    jsonResponse.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    jsonResponse.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    jsonResponse.headers.add("Access-Control-Allow-Credentials", "true")
    
    return jsonResponse