import express from 'express';
import logger from 'morgan';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.DATABASE_URL;
console.log(uri)
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Returns a function that will read a score file.
    function readTheFile(path) {
      return async () => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
          await client.connect();
          console.log(path);
          const result = await client.db('cs326-final').collection(path).find({}).toArray();
          // console.log(result);
          return result;
        } catch (error) {
          // Likely the file doesn't exist
          console.error(error);
        } finally {
          client.close();
        }
        return [];
      };
    }

    function saveToUsersFile(path) {
      return async (id, email, name, major, cred_level, profile_url) => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
          await client.connect();
          console.log('I am here');
          let notifications = [];
          const data = {id, email, name, major, cred_level, profile_url, notifications};
          const result = await client.db('cs326-final').collection(path).insertOne(data);
          console.log(`Document ${result.insertedId} has been inserted!`);
        } catch(e) {
          console.error(e);
        } finally {
          client.close();
        }
      };
    }

    function saveToGroupsFile(path) {
      return async (classid, name, members,loc_and_time,type,size) => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
          await client.connect();
          console.log('I am here');
          const data = {class :classid, name, members,loc_and_time,type,size};
          const result = await client.db('cs326-final').collection(path).insertOne(data);
          console.log(`Document ${result.insertedId} has been inserted!`);
        } catch(e) {
          console.error(e);
        } finally {
          client.close();
        }
      };
    }

    // Create functions for reading from files.
    const usersFunc = readTheFile('users');
    const groupsFunc = readTheFile('groups');

    const register_user = saveToUsersFile('users');
    const register_group = saveToGroupsFile('groups');

    async function getAllGroup(){
      const groups = await groupsFunc();
      console.log(groups);
      return groups;
    }

    // Returns a function that will save a user to the user file.
    function saveToUserFile(path) {
      return async (id, email, name, major, cred_level, profile_url) => {
        const data = { id, email, name, major, cred_level, profile_url };
        register_user(data);
      };
    }

    // Returns a function that will save a group to the group file.
    function saveToGroupFile(path) {
      return async (group_id, _class, name, members, type, max) => {
        const data = { group_id, _class, name, members, type, max };
        register_group(data);
      };
    }

    async function updateProfile(email, name, major, cred_level){
      const users = await usersFunc();
      for(let i =0; i < users.length; i++){
        if(users[i].email === email){
          console.log(users[i]);
          users[i].name = name;
          users[i].major = major;
          users[i].cred_level = cred_level;
          console.log(users[i]);
          console.log(users);
          break;
        }

      }
      writeFile(USERS_FILE, JSON.stringify(users), 'utf8');
    }

    async function getMyGroups(emailId) {
      const groups = await groupsFunc();
      let result = [];
      groups.forEach(element => {
        let members = element.members.filter(mem => mem.email === emailId);
        if(members.length > 0) {
          result.push(element);
        }
      });
      return result;
    }

    async function getMyNotis(emailId) {
      const users = await usersFunc();
      let result = [];
      users.forEach(element => {
        if(element.hasOwnProperty("notification") && element.email == emailId) {
          result = element.notification;
        }
      });
      
      return result;
    }

    async function deleteNotis(emailId, given_id) {
      let users = await usersFunc();
      for(let i = 0; i < users.length; i++) {
        let element = users[i];
        if(element.hasOwnProperty('notification') && element.email === emailId) {
          let notifications = element.notification;
          let updatedNotis = [];
          for(let j = 0; j < notifications.length; j++) {
            let noti = notifications[j];
            if(noti['id'].toString() !== given_id) {
              updatedNotis.push(noti);
            }
          }
          element['notification'] = updatedNotis;
          writeFile(USERS_FILE, JSON.stringify(users), 'utf8');
        }
      }
    }

    async function sendNotification(data, user_email) {
      let users = await usersFunc();
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      // for(let i = 0; i < users.length; i++) {
      //   let element = users[i];
      //   if(element.email === user_email) {
      //     if(element.hasOwnProperty('notification')) {
      //       element['notification'].push(data);
      //     }
      //     else {
      //       element['notification'] = [data];
      //     }
          try {
            await client.connect();
            client.db('cs326-final').collection('users').updateOne(
              { email: user_email }, 
              {
                "$set": {
                  "notifications": {
                    "message": "zruncieman1@live.com has joined the group Transcof",
                    "group_name":"Transcof",
                    "id":"3"
                  }
                }
              }
            )
          } catch(e) {
            console.error(e);
          } finally {
            client.close();
          }
        } 
    //   }
    // }

    async function addUserToGroup(data, group_name) {
      let groups = await groupsFunc();
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        console.log(`${data} ${group_name}`);
        const result = client.db('cs326-final').collection('groups').updateOne(
          { name: group_name },
          {"$set": {
            "member": data
          }}
        );
        console.log(`${result.insertedId} has been updated with new user.`)
      } catch(e) {
        console.error(e);
      } finally {
        client.close();
      }
      // for(let i = 0; i < groups.length; i++) {
      //   let element = groups[i];
      //   if(element.name === group_name) {
      //     element['members'].push(data);
      //     writeFile(GROUPS_FILE, JSON.stringify(groups), 'utf8');
      //   }
      // }
    }

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(logger('dev'));
    app.use('/', express.static('client'));

    app.get('/myNotis', async (request, response) => {
      const options = request.query;
      const arr = await getMyNotis(options.email);
      response.status(200).json(arr);
    });

    app.get('/myGroups', async (request, response) => {
      const options = request.query;
      const arr = await getMyGroups(options.email);
      response.status(200).json(arr);
    });

    app.delete('/deleteNoti', async (request, response) => {
      const options = request.query;
      await deleteNotis(options.email, options.id);
      response.status(200).json( { status: "successful" })
    });

    app.get('/getAllGroup', async (req,res) => {
      const list = await getAllGroup();
      res.status(200).json(list);
    });

    app.get('/login', async (req, res) => {
      const users = await usersFunc();
      // console.log(req.params['email']);
      const result = users.filter(elem => elem.email === req.query['email']);
      if(result.length === 0){
        res.status(200).json({
          "status": "no user"
        });
      }else{
        console.log(result);
        res.status(200).json({
          "status": "success",
          "id": result[0]['id'],
          "name": result[0]['name'],
          "email": result[0]['email'],
          "major": result[0]['major'],
          "cred_level": result[0]['cred_level'],
          "profile_url": result[0]['profile_url']
        });
      }
    });

    app.post('/register', async (req, res) => {
      register_user(req.body['id'], req.body['email'], req.body['name'], req.body['major'], req.body['cred_level'], req.body['profile_url']);
      res.status(200).json({
        "status": "success"
      });
    });

    app.post('/sendNoti', (request, response) => {
      const options = request.body;
      const data = {
        "message": `${options.message}`,
        "sent_by_id": `${options.sent_by_id}`,
        "group_name": `${options.group_name}`,
        "id": `${options.noti_id}`
      };
      const user = {
        "id": `${options.user_id}`,
        "email": `${options.user_email}`,
        "name": `${options.name}`,
        "cred_level": `${options.cred_level}`
      };
      sendNotification(data, options.user_email);
      // console.log(user);
      addUserToGroup(user, options.group_name);
      response.status(200).json({
        "status": "success"
      });
    });

    app.post('/updateProfile', async (request, response) => {
      const options = request.query;
      await updateProfile(options.email, options.name, options.major, options.cred_level);

      response.status(200).json({
        "status": "success"
      });
    });

    app.post( '/createGroup', async (request, response) => {
      const options = request.body;
      // console.log(options)
      register_group(options.class, options.name, options.members, options.loc_and_time, options.type, options.size);
      
      response.status(200).json({
        "status": "success"
      });
    });



    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
