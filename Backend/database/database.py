import os
import psycopg2

class MY_DATABASE:

    def connect_to_db():

        connect = psycopg2.connect(os.environ['DATABASE_URL'])
        connect.autocommit = True
        cursor = connect.cursor()
        return cursor

    def create_user_table():

        cursor = MY_DATABASE.connect_to_db()
        sql_command = """CREATE TABLE IF NOT EXISTS "public"."user"(
        id SERIAL,
        name VARCHAR(100),
        username VARCHAR(500) NOT NULL ,
        email VARCHAR(100) UNIQUE,
        street VARCHAR(100),
        suite VARCHAR(100),
        city VARCHAR(100),
        zipcode VARCHAR(500),
        lat VARCHAR(100),
        lng VARCHAR(100),
        phone VARCHAR(200),
        website VARCHAR(100),
        company_name VARCHAR(100),
        catchPhrase TEXT,
        bs TEXT,
        user_role VARCHAR(200) DEFAULT 'user',
        PRIMARY KEY (id)
        

        )"""
        cursor.execute(sql_command)

    def save(self,format_str ):
        '''method to save to db'''
        cursor = MY_DATABASE.connect_to_db()
        
        try:
            cursor.execute(format_str)
        except:
            #log error
            return {
                "success":False,
                "error":"error"
            }
        return {
            "sucess": True,
            "message": "successfully save to db"
        }
