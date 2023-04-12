from flask import Blueprint

star = Blueprint('vsxdata', __name__, template_folder='templates')

from . import views