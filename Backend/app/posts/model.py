from datetime import datetime
import datetime
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, create_access_token
from passlib.handlers.pbkdf2 import pbkdf2_sha256
from app.users.model import UserModel
from app.comments.model import CommentsModel
from database.database import MY_DATABASE
        
cursor = MY_DATABASE.connect_to_db()
MY_DATABASE.create_user_table()
MY_DATABASE.create_post_table()
        
class PostModel(MY_DATABASE):
    '''Class to model a question'''

    def __init__(self,id, user_id, title, body):
        '''method to initialize Question class'''
        self.id = id
        self.user_id = user_id
        self.title = title
        self.body = body

    def save(self , user_id , title, body):
        '''method to save a question'''
        format_str = f"""
         INSERT INTO public.post (user_id,title,body)
         VALUES ('{user_id}', '{title}','{body}') ;
         """
        print("<><><><><>", format_str)
        cursor.execute(format_str)
        return {
            "user_id": user_id,
            "title": title,
            "body": body,
            
        }
    def json_dumps(self):
        '''method to return a json object from the question details'''
        obj = {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "user_id": self.user_id,
            "comments": CommentsModel.get_all_post_comments(self.id)
        }
        return obj
    
    @classmethod
    def get_by_id(cls, id):
        '''method to get a question by id'''
        cursor.execute('SELECT * FROM "public"."post" WHERE id=%s', (id,))
        row = cursor.fetchone()
        if row == None:
            return None
        posts = PostModel(id=row[0], user_id=row[1], title=row[2], body=row[3])

        retrieved_post = posts.json_dumps()
        comment = CommentsModel.get_all_post_comments(post_id=id)
        retrieved_post['comments'] = comment
        return retrieved_post
    @classmethod
    def get_all(cls):
        '''method to get all questions'''
        cursor.execute(
            f"SELECT * FROM public.post")
        rows = cursor.fetchall()
        list_dict = []

        for item in rows:
            new = PostModel(id=item[0], user_id=item[1], title=item[2], body=item[3])
            list_dict.append(new.json_dumps())
        return list_dict

    @classmethod
    def get_all_user_questions(cls, user):
        '''method to get all questions of a given user'''
        post_owner = UserModel.find_by_id(user)
        if post_owner:
            cursor.execute("SELECT * FROM public.post WHERE user_id = %s", (user,))
            rows = cursor.fetchall()
            list_dict = []

            for item in rows:
                new = PostModel(id=item[0], user_id=item[1], title=item[2], body=item[3])
                list_dict.append(new.json_dumps())
            return list_dict
        return {"message": "No user with that id"}, 404

    @classmethod
    def delete_question(cls, id):
        '''method to delete a question'''
        try:
            cursor.execute('DELETE FROM public.post CASCADE WHERE id = %s', (id,))
            return "successfully deleted"
        except Exception:
            return "failed"

    @classmethod
    def search_post(cls, body, title):
        cursor.execute(f"SELECT * FROM post WHERE body LIKE '%{body}%' OR title LIKE '%{title}%'")
        rows = cursor.fetchall()
        list_dict = []
        for item in rows:
            new = PostModel(id=item[0], user_id=item[1], title=item[2], body=item[3])
            list_dict.append(new.json_dumps())
        return list_dict
