# AD-Blockers #

## Study Group ##
### Spring: 2022 ###

#### Overview ####
Our application is a platform for students to find study groups for any of their classes. It allows students to create and join study groups and be part of the discussion. We have started this application from one of the difficulties we faced as freshmen before making our own friend circle. Sometimes your friends do not take the same class as you and it is hard to find the right group to study with. We do have groups on other social media like discord, facebook but what makes us innovative is the ability to get all of them under the same hood so that students do not have to search more for getting any assistance. The application has a very one click register method and you can start joining/creating a required study group. With its easy to use interface you can create a group and specify when and where you plan to meet, if it’s virtual please feel free to drop in the zoom link.

The application also lets you leave and join at your own convenience making the roster of your study groups different each semester. This is an attempt to make more collaborative learning sessions and give students additional resources.


#### Team Members ####
1. Anurag Gumidelli (Anurag-Gumidelli)
2. Sai Rohan Bangari (sbangariGIT)
3. Adithya Kethu (akethu)

#### User Interface ####


#### API's ####

#### Database ####
We used noSQL database: MongoDB atlas. Here we have two major collections <b>Users</b> and <b>Groups</b>.

1. Users
every document contains the following attributes
_id: Unique Identifier id (Type: Object)
email:  email of a user (Type: String)
name: name of the user (Type: String)
major: major of the user (Type: String)
cred_level: Freshman | Junior | Senior etc (Type: String)
profile_url: url of the image (Type: String)
notifications: array of notification (Type: Array)


1. Groups
every document contains the following attributes
_id: Unique Identifier id (Type: Object)
class: which class does the group belong (ex: CS 326) (Type: String)
name: name of the group (Type: String)
loc_and_time: location and time of meeting (Type: String)
type: Public | Private
size: max capacity (Type: Number)
members: array of notification (Type: Array)


#### URL Routes/Mappings ####
1. **GET /myGroups**
   Takes in userId which then gets the list of all the groups of a particular user.

    **Example Request**:

      [http://localhost:3000/myGroups/?email=${ls.getItem('email')](http://localhost:3000/myGroups?email=${ls.getItem('email'))

    **Example Request Body**:
      ```json
      { "email": "wcalcott0@soup.io" }
      ```

    **Example Response** (200 OK status code):

      ```json
      [{
    "group_id": "0913",
    "_class": "CS-58",
    "name": "Transcof",
    "members": [
      {
        "id": 1,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "group_id": "7713",
    "_class": "OIM-16",
    "name": "Temp",
    "members": [
      {
        "id": 1,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }]
      ```
2. **POST /createGroup**

      This endpoint will be used to create a new group given its details

      **Example Request**:

      [http://localhost:3000/createGroup](http://localhost:3000/createGroup)

      **Example Request Body**:

      ```json
        {
    "group_id": "5369",
    "_class": "CS-43",
    "name": "Asoka",
    "members": [
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
      }
      ```

      **Example Response** (200 OK status code):

      ```json
      {
        "status": "success"
      }
      ```

3. **GET /myNotis**
   Takes in userId which then gets the list of all the notifications of a particular user.

    **Example Request**:

      [http://localhost:3000/myNotis?email=${ls.getItem('email')](http://localhost:3000/myNotis?email=${ls.getItem('email'))


    **Example Response** (200 OK status code):

      ```json
      [{
            "message": "Wants to join the group",
            "sent_by_id": 1,
            "group_name": "Trippledex"
        }]
      ```
4. **POST /createNoti**

      This endpoint create notifications mentioned in noti field to all the users in the send_to button.

      **Example Request**:

      [http://localhost:3000/createNoti](http://localhost:3000/createNoti)

      **Example Request Body**:

      ```json
        {
     "noti": {
            "message": "Wants to join the group",
            "sent_by_id": 3,
            "group_name": "Trippledex"
        },
    "send_to": [{"id": 1, "id": 2}]
      }
      ```

      **Example Response** (200 OK status code):

      ```json
      {
        "status": "success"
      }
      ```

5. **POST /regesiter**

      This endpoint creates a new user into our backend

      **Example Request**:

      [http://localhost:3000/regesiter](http://localhost:3000/regesiter)

      **Example Request Body**:

      ```json
        {
        "id": 1,
        "email": "wcalcott0@soup.io",
        "name": "Zontrax",
        "major": "Human Resources",
        "cred_level": "Freshmen",
        "profile_url": "https://robohash.org/voluptatemreprehenderitexcepturi.png?size=50x50&set=set1"
      }
      ```

      **Example Response** (200 OK status code):

      ```json
      {
        "status": "success"
      }
      ```
6. **PUT /addToGroup**

      This endpoint adds the user to the members array in our groups.json

      **Example Request**:

      [http://localhost:3000/addToGroup](http://localhost:3000/addToGroup)

      **Example Request Body**:

      ```json
        {
        "id": 1,
        "email": "wcalcott0@soup.io",
        "name": "Zontrax",
        "cred_level": "Freshmen",
      }
      ```

      **Example Response** (200 OK status code):

      ```json
      {
        "status": "success"
      }
6. **GET /getAllGroup**

      This endpoint get the list of all groups

      **Example Request**:

      [http://localhost:3000/getAllGroup](http://localhost:3000/getAllGroup)


      **Example Response** (200 OK status code):

      ```json
      [{
    "_id": "2046",
    "class": "PHY-44",
    "name": "Sonsing",
    "members": [
      {
        "id": 4,
        "email": "atownson3@purevolume.com",
        "name": "Tempsoft",
        "cred_level": "Sophomore"
      },
      {
        "id": 9,
        "email": "rcolvine8@liveinternet.ru",
        "name": "Y-find",
        "cred_level": "Freshmen"
      }
    ],
    "type": "public",
    "max": 10
  }, {
    "_id": "2813",
    "class": "MATH-07",
    "name": "Gembucket",
    "members": [
      {
        "id": 1,
        "email": "wcalcott0@soup.io",
        "name": "Zontrax",
        "cred_level": "Freshmen"
      },
      {
        "id": 2,
        "email": "zruncieman1@live.com",
        "name": "Bytecard",
        "cred_level": "Junior"
      }
    ],
    "type": "public",
    "max": 10
  }]

7. **GET /login**

      This endpoint get the list of all groups

      **Example Request**:

      [/login?email=${sample@gmail.com}](/login?email=${sample@gmail.com)


      **Example Response** (200 OK status code):

       ```json
      {
        "status": "success",
      "id": 10,
      "email": "sample@gmail.com",
      "major": "major']",
      "cred_level": "cred_level",
      "profile_url": "profile_url"
      }
       ```json
      {
        "status": "no user"
      }


#### Authentication/Authorization ####

Login Authenitcation:



Inside the application:
While we make sure that you connot see any infromation apart from group names, the functionilty of going into a single group page only opens up if a particular user is part of the group.
Hence teven if you copy past a browser url from one browser to another we check if the group id exists for that user before giving him access to the group information. This is the only authorization part of our application. Given that public groups are open one gets admitted into the group as soon as you click join.

#### Division of Labor ####
1. Anurag Gumidelli (Anurag-Gumidelli):
<br>1. Points


2. Sai Rohan Bangari (sbangariGIT):
<br>1. Points

3. Adithya Kethu (akethu):
<br>1. Points

#### Conclusion ####
A conclusion describing your team’s experience in working on this project. This should include what you learned through the design and implementation process, the difficulties you encountered, what your team would have liked to know before starting the project that would have helped you later, and any other technical hurdles that your team encountered.