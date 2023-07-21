from flask_jwt_extended import create_access_token
from flask import Blueprint, make_response, jsonify, request
from app.users.model import UserModel
from datetime import datetime
import utils.responses as resp
from utils.responses import m_return

user_v1 = Blueprint('user-v1', __name__, url_prefix='/api/v1')

@user_v1.route('/register', methods=['POST'])
def post():
    data = request.get_json()

    name = data['name']
    username = data['username']
    email = data['email']
    # if UserModel.find_by_username(data['username']):
    #         return {'message': 'This username is already taken,kindly try another username'}, 409
    street= data['address']['street']
    suite = data["address"]["suite"]
    city = data["address"]["city"]
    zipcode =UserModel.generate_hash(data["address"]["zipcode"])
    lat = data["address"]["geo"]["lat"]
    lng = data["address"]["geo"]["lng"]
    phone = data["phone"]
    website = data["website"]
    company_name = data["company"]["name"]
    catchPhrase = data["company"]["catchPhrase"]
    bs = data["company"]["bs"]
    user_role= "user"


    new_user = UserModel(id=None, name=name, username=username, email=email, street=street, suite=suite, city=city, zipcode=zipcode, lat=lat,lng=lng, phone=phone,website=website, company_name=company_name,catchPhrase=catchPhrase, bs=bs, user_role=user_role)


    new_user.save( name=name, username=username, email=email, street=street, suite=suite, city=city, zipcode=zipcode, lat=lat,lng=lng, phone=phone,website=website, company_name=company_name,catchPhrase=catchPhrase, bs=bs, user_role=user_role)

    return make_response(jsonify({ 
        "status": 201,
        "data": new_user.json_dumps()
    }), 201)

@user_v1.route('/login', methods=['POST'])
def login():
      data = request.get_json()

      
      current_user = UserModel.find_by_username(data['username'])
      print('<><><><><>', current_user)
      if current_user == False:
            return {'message': 'username {} doesnt exist'.format(
                data['username'])}, 404
      zipcode = data['zipcode']

      hash = current_user[8]

      if not UserModel.verify_hash(zipcode, hash):
            return {
            "messgae":"Incorect password"
        }, 401
      if UserModel.find_by_email(data['email']):
        if current_user.user_role == "user":
                access_token = current_user.generate_auth_token(0)

        elif current_user.user_role == "premium":
                access_token = current_user.generate_auth_token(1)

        else:
                return m_return(http_code=resp.PERMISSION_DENIED['http_code'], message=resp.PERMISSION_DENIED['message'],
                            code=resp.PERMISSION_DENIED['code'])
        
        return m_return(http_code=resp.SUCCESS['http_code'],
                        message=resp.SUCCESS['message'],
                        value={'access_token': access_token })
      
      return {
        'message': 'wrong credentials'
    }, 403


            


