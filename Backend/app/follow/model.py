from datetime import datetime
import datetime
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, create_access_token
from passlib.handlers.pbkdf2 import pbkdf2_sha256
from database.database import MY_DATABASE

cursor = MY_DATABASE.connect_to_db()

class FollowModel(MY_DATABASE):

    def __init__(self, id, follower_id, followee_id):
        self.id = id
        self.follower_id = follower_id
        self.followee_id = followee_id

    def save(self, follower_id, followee_id):
        format_str = f"""
                  INSERT INTO public.follow (follower_id, followee_id)
                 VALUES ('{follower_id}', '{followee_id}')
 """
        cursor.execute(format_str)
        return{
            "follower_id": follower_id,
            "followee_id": followee_id
        }
    @classmethod
    def unfollow(cls, follower_id, followee_id):
        format_str = f"""
                  DELETE FROM public.follow WHERE follower_id = '{follower_id}' AND followee_id = '{followee_id}'
 """
        cursor.execute(format_str)

        return{
            "message" : "unfollow successfully"
        }
    @classmethod
    
    def json_dumps(self):
        '''method to return a json object from the post details'''
        obj = {
            "id": self.id,
            "follower_id": self.follower_id,
            "followee_id": self.followee_id
        }
        return obj
    @classmethod
    def get_all_follows(cls):
    
        format_str = "SELECT * FROM public.follow"
        cursor.execute(format_str)
        follows = cursor.fetchall()

        follow_list = []
        for follow in follows:
            follow_obj = FollowModel(id=follow[0], follower_id=follow[1], followee_id=follow[2])
            follow_list.append(follow_obj.json_dumps())

        return follow_list

    @classmethod
    def get_follow_by_id(cls, id):
        format_str = f"SELECT * FROM public.follow WHERE id = '{id}'"
        cursor.execute(format_str)
        follow = list(cursor.fetchone())
        output = FollowModel(id=follow[0], follower_id=follow[1], followee_id=follow[2])

        return output
