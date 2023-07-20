import os

postgre_local_base = "postgresql://postgres:username@localhost/chat"
    
class TestingConfig():
        TESTING = True
        DEBUG = False
        SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-willguess'
        SQLALCHEMY_DATABASE_URI = "postgresql://postgres:username@localhost/Tests"
        SQLALCHEMY_TRACK_MODIFICATIONS = False

        
class DevelopmentConfig():
        SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
        SQLALCHEMY_DATABASE_URI = postgre_local_base
        DEBUG = True
        DEVELOPMENT = True
        SQLALCHEMY_TRACK_MODIFICATIONS = False
        
class ProductionConfig():
        
        SECRET_KEY = 'my_precious'
        DEBUG = False
        SQLALCHEMY_DATABASE_URI = 'postgresql:///example'
        
        
        
