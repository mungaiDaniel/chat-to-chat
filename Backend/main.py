from flask import Flask
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from database.database import MY_DATABASE
from config import DevelopmentConfig
from app.users.routes import user_v1



app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=1)
JWTManager(app)
CORS(app)
app.register_blueprint(user_v1)

MY_DATABASE.connect_to_db()
# MY_DATABASE.create_Address_table()
# MY_DATABASE.create_company_table()
MY_DATABASE.create_user_table()
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)