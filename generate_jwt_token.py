import jwt
import requests
import datetime

payload = {
    'login': "admin",               #Don't know what the login info is so I placed this inside
    'password':"admin",
    'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=3600)
}

secret_key = "Ain't no way you're seeing this"

token = jwt.encode(
    payload, 
    secret_key, 
    algorithm='HS256'
    )

token = token.decode('utf-8')

api_url = 'localhost:3000/login'

headers = {'Authorization': 'Bearer' + token }  #Bearer is the type of authentication scheme used for authorization.

response = requests.get(api_url, )
                        
if response.status_code == 200:
    print("API call successful!")
    print("Response:" , response.json())
else:
    print("API call failed with status code:" response.status_code)




