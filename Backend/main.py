from flask import Flask
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from database.database import db



def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=1)
    JWTManager(app)
    CORS(app)
    db.init_app(app)
    app.app_context().push()
    

    return app

app = create_app('config.DevelopmentConfig')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)