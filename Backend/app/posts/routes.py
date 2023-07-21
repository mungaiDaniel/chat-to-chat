from flask import Blueprint, make_response, jsonify, request
from app.posts.model import PostModel
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


post_v1 = Blueprint("post_v1", __name__, url_prefix='/api/v1')

