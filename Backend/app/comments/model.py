
import datetime
from database.database import MY_DATABASE


        
cursor = MY_DATABASE.connect_to_db()
MY_DATABASE.create_post_table()
MY_DATABASE.create_comments_table()
        
class CommentsModel(MY_DATABASE):
    '''Class to model an comment'''

    def __init__(self, id, name, body, post_id, user_id, email):
        '''method to initialize commentMedel class'''
        self.id = id
        self.name = name
        self.body = body
        self.post_id = post_id
        self.user_id = user_id
        self.email = email

    def save(self, name, body, post_id, user_id, email):
        '''method to save an comment'''
        format_str = f"""INSERT INTO public.comment (name, body, post_id, user_id, email)
                 VALUES ('{name}', '{body}', '{post_id}', '{user_id}', '{email}');
                 """
        cursor.execute(format_str)
        return {
            "name": name,
            "body": body,
            "post_id": post_id,
            "user_id": user_id,
            "email": email
        }
        
    def json_dumps(self):
        '''method to return a json object from the comment details'''
        
        obj = {
            "id": self.id,
            "name": self.name,
            "body": self.body,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "email": self.email
            
        }
        return obj

    @classmethod
    def get_all_post_comments(cls, post_id):
        '''method to get all comments of a given question'''
        cursor.execute(
            f"SELECT * FROM public.comment")
        rows = cursor.fetchall()
        comments_retrieved_dict = []
        for comment in rows:
            if comment[3] == (post_id):
                comment_post = CommentsModel(id=comment[0], name=comment[1], body=comment[2], post_id=comment[3],
                                         user_id=comment[4], email=[5])
                comments_retrieved_dict.append(comment_post.json_dumps())
        return comments_retrieved_dict

    @classmethod
    def get_by_id(cls, id):
        '''method to get an comment by id'''
        cursor.execute('SELECT * FROM "public"."comment" WHERE id=%s', (id,))
        row = cursor.fetchone()
        if row == None:
            return None
        comment = {
            "id": row[0],
            "name": row[1],
            "body": row[2],
            "post_id": row[3],
            "user_id": row[4],
            "email": row[5]
        }
        retrieved_comment = comment
        return retrieved_comment

    @classmethod
    def update(cls, name, body,  user_id, id):
        """Method to update an comment"""
        format_str = f"""
         UPDATE public.comment SET name = '{name}' body = '{body}' WHERE id = {id};
         """

        cursor.execute(format_str)

        return {
            "id": id,
            "name": name,
            "body": body,
            "user_id": user_id,
        }