# How to use the backend API

## 1. For student signup:
Method: ```/signupStudent```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, name, pass, dob, email, mobNo, class

*Json returned:* { "result" : "_______" }, where _______ is  
  * invalidArg    (incase of missing parameter(s))  
  * fail          (incase of error in signup)  
  * success       (incase of successful signup)

*Example Request:* ```/signupStudent?regNo="B190714CS"&name="Varghese"&pass="Password"&dob="2001-10-15"&email="varghese1508@gmail.com"&mobNo="8137053710"&class="CSE-B"```