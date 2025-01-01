from flask import Flask, request, send_from_directory
from sqlalchemy import func, select
from core.config import Configuration
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import jsonify
import json
import jsonpickle
from flask_cors import CORS
from core.tools.location import get_altitude
import jsonpickle.ext.numpy as jsonpickle_numpy
from astropy.coordinates import EarthLocation
from astropy.time import Time
jsonpickle_numpy.register_handlers()
import os

# Get the absolute path to the build directory
BUILD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'build')

app = Flask(__name__, 
           static_folder=BUILD_DIR,
           static_url_path='')
app.config.from_object(Configuration)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# blueprint for non-authentication parts of the app
from .star import star as star_blueprint
app.register_blueprint(star_blueprint)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:8000",
            "http://127.0.0.1:8000",
            "http://localhost:4173",
            "http://127.0.0.1:4173"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Add CORS debugging
@app.after_request
def after_request(response):
    origin = request.headers.get('Origin', '')
    if origin in [
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:4173",
        "http://127.0.0.1:4173"
    ]:
        response.headers.add('Access-Control-Allow-Origin', origin)
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response



@app.route('/')
def serve():
    if os.path.exists(os.path.join(BUILD_DIR, 'index.html')):
        return send_from_directory(BUILD_DIR, 'index.html')
    return f"File not found. Looking in: {BUILD_DIR}"

@app.errorhandler(404)
def not_found(e):
    if os.path.exists(os.path.join(BUILD_DIR, 'index.html')):
        return send_from_directory(BUILD_DIR, 'index.html')
    return f"File not found. Looking in: {BUILD_DIR}"

@app.route('/stars_test')
def get_stars_test():
    stars= models.Vsxdata.query.filter_by(const="Ori").limit(1000).all()
    response_body = []

    starJson = jsonpickle.encode(stars)
    starData = json.loads(starJson) # type: ignore
    response_body.append(starData)

    jsonResponse = jsonify(response_body)

    return jsonResponse

@app.route('/stars')
def get_stars():
    latitude = request.args.get('lat', type=float)
    longitude = request.args.get('long', type=float)
    elevation = request.args.get('elevation', type=float)
    jd = request.args.get('jd', type=float)

    # Check if any of the arguments is None
    if latitude is None or longitude is None or elevation is None or jd is None:
        return "Error: Missing one or more required parameters (lat, long, elevation, jd)"

    location = EarthLocation.from_geodetic(longitude, latitude, elevation)
    time = Time(jd, format='jd')
    #sql alchemy pagination

    page= request.args.get("page", 1, type=int)
    per_page = request.args.get("per-page", 100, type=int)
    stars = models.Vsxdata.query.paginate(page=page, per_page=per_page, error_out=False)
    stars = get_altitude(stars, location, time) 
    response_body = []

    starJson = jsonpickle.encode(stars.items)
    starData = json.loads(starJson) # type: ignore
    response_body.append(starData)

    jsonResponse = jsonify(response_body)
    return jsonResponse

@app.route('/starCount')
def get_star_count():
    row_count = db.session.query(func.count(models.Vsxdata.id)).scalar()

    jsonResponse = jsonify(row_count)
    return jsonResponse

# Add debug route to check file structure
@app.route('/debug')
def debug():
    try:
        files = os.listdir(BUILD_DIR)
        return {
            'build_dir': BUILD_DIR,
            'files': files,
            'index_exists': os.path.exists(os.path.join(BUILD_DIR, 'index.html'))
        }
    except Exception as e:
        return {'error': str(e)}