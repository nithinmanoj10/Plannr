# How to use the backend API

## 1. For Student Signup:
Method: ```/signupStudent```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, name, pass, dob, email, mobNo, class

*Json returned:* { "result" : "_______" }, where _______ is  
  * invalidArg    (incase of missing parameter(s))  
  * failure       (incase of error in signup)  
  * success       (incase of successful signup)

*Example Request:* ```/signupStudent?regNo="B190714CS"&name="Varghese"&pass="Password"&dob="2001-10-15"&email="varghese1508@gmail.com"&mobNo="8137053710"&class="CSE-B"```


## 2. For Teacher Signup:
Method: ```/signupTeacher```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, name, pass, dob, email, mobNo

*Json returned:* { "result" : "_______" }, where _______ is  
  * invalidArg    (incase of missing parameter(s))  
  * failure       (incase of error in signup)  
  * success       (incase of successful signup)

*Example Request:* ```/signupTeacher?regNo="PR001CS"&name="M Ajamumu"&pass="Password"&dob="1998-6-14"&email="ajamumu@gmail.com"&mobNo="8233675532"```


## 3. For Student Login:
Method: ```/loginStudent```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, pass

*Json returned:* { "regNo": " _____ ", "name": " _____ ", "email": " _____ ", "class": " _____ ", "status": " _____ " }, where status is  
  * invalidArg    (incase of missing parameter(s))
  * failure       (incase of error in login)
  * wrongPass     (incase of wrong password)
  * success       (incase of successful login)  
The other parameters (regNo, name, email, class) will have the correct values incase of successful signup. They are "empty" by default. 

*Example Request:* ```/loginStudent?regNo="B190714CS"&pass="Password"```


## 4. For Teacher Login:
Method: ```/loginTeacher```
=> remember to add parameters just like you would a normal url

*Parameters required:* regNo, pass

*Json returned:* { "teacherID": _ , "regNo": " _____ ", "name": " _____ ", "email": " _____ ", "status": " _____ " }, where status is  
  * invalidArg    (incase of missing parameter(s))
  * failure       (incase of error in login)
  * wrongPass     (incase of wrong password)
  * success       (incase of successful login)  
The other parameters (teacherID, regNo, name, email, class) will have the correct values incase of successful signup. They are "empty" by default. teacherID is an integer, and is required for the Slot Addition API.

*Example Request:* ```/loginTeacher?regNo="PR001CS"&pass="Password"```


## 5. For Slot Addition:
Method: ```/addSlot```
=> remember to add parameters just like you would a normal url

*Parameters required:* subjectName, slotNo, day, slotClass, teacherID [note: here, teacherID, slotNo(1-10) and day(1-5) are INTEGERS]

*Json returned:* { "status" : "_______" }, where _______ is  
  * invalidArg    (incase of missing parameter(s))  
  * failure       (incase of error in slot addition)  
  * success       (incase of successful slot addition)

*Example Request:* ```/addSlot?subjectName="Maths"&slotNo=1&day=2&slotClass="CSE-B"&teacherID=2```, for a Maths class on Tuesday 8-9 for CSE-B

## 6. To get Slots of a Class:
Method: ```/getSlots```  

=> remember to add parameters just like you would a normal url

*Parameters required:* class

*Json returned:* { "status" : "_______" }, where _______ is  
  * invalidArg    (incase of missing parameter(s))  
  * failure       (incase of error in slot return)  
  * success       (incase of successful slot return)  
If the status is *success*, the slots of the class are also a part of the JSON, and will be then of the form  
{
  "status": "success",  
  .  
  .  
  .  
  "< slotID >": [subjectName, slot, day, teacherName],  
  "< slotID >": [subjectName, slot, day, teacherName],  
  .  
  .  
  .  
}  

Here, the slotID may not be of use to you. Note: If the class doesn't exist or has no slots entered, the status will still be success.
But no slots will be returned.

*Example Request:* ```getSlots?class="CSE-B"```, to get the slots for class CSE-B