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

    def create_post_table():

        cursor = MY_DATABASE.connect_to_db()
        sql_command = """CREATE TABLE IF NOT EXISTS "public"."post"(
        id SERIAL,
        user_id INTEGER NOT NULL,
        title VARCHAR(500),
        body VARCHAR(500),
        PRIMARY KEY (id),
        FOREIGN KEY (user_id)
        REFERENCES \"user\" (id)
        

        )"""
        cursor.execute(sql_command)

    def create_comments_table():

        cursor = MY_DATABASE.connect_to_db()
        sql_command = """ CREATE TABLE IF NOT EXISTS "public"."comment"  (
                id SERIAL ,
                name VARCHAR(200) NOT NULL ,
                body VARCHAR(400) NOT NULL,
                post_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                email VARCHAR(50),
                PRIMARY KEY (id),
                FOREIGN KEY (post_id)
                REFERENCES \"post\" (id),
                FOREIGN KEY (user_id)
                REFERENCES \"user\" (id)
                    )"""
        cursor.execute(sql_command)

    def drop_post_table():
        '''function to drop questions table'''
        cursor = MY_DATABASE.connect_to_db()
        sql_command = """ DROP TABLE \"post\" CASCADE;"""
        cursor.execute(sql_command)


    def drop_comment_table():
        '''function to drop answers table'''
        cursor =MY_DATABASE.connect_to_db()
        sql_command = """ DROP TABLE \"comment\" CASCADE;"""
        cursor.execute(sql_command)


    def drop_users_table():
        '''function to drop answers table'''
        cursor =MY_DATABASE.connect_to_db()
        sql_command = """ DROP TABLE \"user\" CASCADE;"""
        cursor.execute(sql_command)

