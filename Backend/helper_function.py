import json

def register_user(self):
    '''register user'''
    return self.client.post(
        'api/v1/register',
        data=json.dumps(dict(
            name = "name", 
            username = "username", 
            email = "email", 
            suite = "suite", 
            street = "address""street",
            city = "address""city",
            zipcode = "address""zipcode",
            lat = "address""geo""lat", 
            lng = "address""geo""lng",
            phone = "phone", 
            website= "website",
            campany_name = "company""name",
            catchPhrase = "company""catchPhrase",
            bs = "company""bs",
            user_role = "user",
        )),
        content_type='application/json'
    )

def register_user2(self):
    '''register user'''
    return self.client.post(
        'api/v1/register',
        data=json.dumps(dict(
            name = "name22", 
            username = "username222", 
            email = "email22@com", 
            suite = "suite344", 
            street = "address""street433",
            city = "address""city333",
            zipcode = "address""zipcode333",
            lat = "address""geo""lat333", 
            lng = "address""geo""lng333",
            phone = "phone333", 
            website= "website3333",
            campany_name = "company""name3333",
            catchPhrase = "company""catchPhrase3333",
            bs = "company""bs333",
            user_role = "user",
        )),
        content_type='application/json'
    )
    
def login_user(self):
    '''login the registered user'''
    return self.client.post(
        'api/v1/login',
        data=json.dumps(dict(
            username = "username",
            zipcode = "zipcode",
        )),
        content_type='application/json'
    )
    
def post_quiz(self):
    '''loginthe registered user'''
    response = login_user(self)
    result = json.loads(response.data)
    self.assertIn("access_token", result)
    new_question = {'user_id': 1, 'title': 'error sit voluptatem accusantium doloremque laudantium',
                    'body': 'error sit voluptatem accusantium doloremque laudantiumerror sit volupta'}
    response = self.client.post('api/v1/post', data=json.dumps(new_question),
                                headers={'Authorization': f'Bearer {result["token"]}',
                                         'Content-Type': 'application' '/json'})
    return response

def post_answer(self):
    '''login the registered user'''
    response = login_user(self)
    result = json.loads(response.data)
    self.assertIn("token", result)
    new_answer = { 'body': 'error sit voluptatem accusantium doloremque laudantiumerror sit volupta'}
    response = self.client.post('/api/v2/answer/4', data=json.dumps(new_answer),
                                headers={'Authorization': f'Bearer {result["access_token"]}',
                                         'Content-Type': 'application' '/json'})
    return response