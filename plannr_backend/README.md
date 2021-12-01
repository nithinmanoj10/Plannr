# How to use the backend API

## 1. For Student Signup:
Method: ```/signupStudent```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, name, pass, dob, email, mobNo, class

*Json returned:* { "result" : "_______" }, where _______ is  
  * invalidArg    (incase of missing parameter(s))  
  * fail          (incase of error in signup)  
  * success       (incase of successful signup)

*Example Request:* ```/signupStudent?regNo="B190714CS"&name="Varghese"&pass="Password"&dob="2001-10-15"&email="varghese1508@gmail.com"&mobNo="8137053710"&class="CSE-B"```


## 2. For Teacher Signup:
Method: ```/signupTeacher```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, name, pass, dob, email, mobNo

*Json returned:* { "result" : "_______" }, where _______ is  
  * invalidArg    (incase of missing parameter(s))  
  * fail          (incase of error in signup)  
  * success       (incase of successful signup)

*Example Request:* ```/signupTeacher?regNo="B190714CS"&name="Varghese"&pass="Password"&dob="2001-10-15"&email="varghese1508@gmail.com"&mobNo="8137053710"```


## 3. For Student Login:
Method: ```/loginStudent```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, pass

*Json returned:* { "regNo": " _____ ", "name": " _____ ", "email": " _____ ", "class": " _____ ", "status": " _____ " }, where status is  
  * invalidArg    (incase of missing parameter(s))
  * fail          (incase of error in login)
  * wrongPass     (incase of wrong password)
  * success       (incase of successful login)  
The other parameters (regNo, name, email, class) will have the correct values incase of successful signup. They are "empty" by default. 

*Example Request:* ```/loginStudent?regNo="B190714CS"&pass="Password"```