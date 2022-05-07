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

    async function userLogin(email){
      const client  = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      try {
        await client.connect();
        const res = await client.db('cs326-final').collection('users').find({email : email}).toArray();
        return res;

      } catch (error){
        console.error(error);
      }
    }

    function saveToUsersFile(path) {
      return async (id, email, name, major, password, cred_level, profile_url) => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
          await client.connect();
          console.log('I am here');
          let notifications = [];
          const data = {id, email, name, major, password, cred_level, profile_url, notifications};
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
      
      const client  = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      try {
        await client.connect();
        console.log(email);
        const col = await client.db('cs326-final').collection('users').updateOne({email, email}, {$set: {name: name, major:major, cred_level: cred_level }});

      } catch (error){
        console.error(error);
      }
    }

    async function getMyGroups(emailId) {
      // const groups = await groupsFunc();
      // let result = [];
      // groups.forEach(element => {
      //   let members = element.members.filter(mem => mem.email === emailId);
      //   if(members.length > 0) {
      //     result.push(element);
      //   }
      // });
      // return result;
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        let grps =  await client.db('cs326-final').collection('groups').find({ 'members.email': emailId } ).toArray();
        //const myGroups = await client.db('cs326-final').collection('groups').find({ 'members': { 'email': emailId } }).toArray();
        console.log(JSON.stringify(grps));
        return grps;
      } catch(e) {
        console.error(e);
      } finally {
        client.close();
      }
      return [];
    }

    async function getMyNotis(emailId) {
      // const users = await usersFunc();
      // let result = [];
      // users.forEach(element => {
      //   if(element.hasOwnProperty("notification") && element.email == emailId) {
      //     result = element.notification;
      //   }
      // });
      
      // return result;
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        let notis = await client.db('cs326-final').collection('users').find({ 'email': emailId }).toArray();
        console.log("hello" + JSON.stringify(notis[0].notifications));
        let notifis = notis[0].notifications;
        return notifis;
      } catch(e) {
        console.error(e);
      } finally {
        client.close();
      }
      return [];
    }

    async function deleteNotis(emailId, given_id) {
      let users = await usersFunc();
      // for(let i = 0; i < users.length; i++) {
      //   let element = users[i];
      //   if(element.hasOwnProperty('notification') && element.email === emailId) {
      //     let notifications = element.notification;
      //     let updatedNotis = [];
      //     for(let j = 0; j < notifications.length; j++) {
      //       let noti = notifications[j];
      //       if(noti['id'].toString() !== given_id) {
      //         updatedNotis.push(noti);
      //       }
      //     }
      //     element['notification'] = updatedNotis;
      //     writeFile(USERS_FILE, JSON.stringify(users), 'utf8');
      //   }
      // }
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        //let notis = await client.db('cs326-final').collection('users').find({ 'email': emailId }).toArray();
        await client.db('cs326-final').collection('users').updateOne(
          { email: user_email }, 
          {
            "$pull": {
              "notifications": {
                "id": given_id
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

    async function sendNotification(data, user_email) {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        let notis = await client.db('cs326-final').collection('users').find({ 'email': user_email }).toArray();
        let notifis = notis[0].notifications;
        notifis.push(data);
        await client.db('cs326-final').collection('users').updateOne(
          { email: user_email }, 
          {
            "$set": {
              "notifications": notifis
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
        let group = await client.db('cs326-final').collection('groups').find({ 'name': group_name }).toArray();
        let group_members = group[0].members;
        group_members.push(data);
        const result = await client.db('cs326-final').collection('groups').updateOne(
          { name: group_name },
          {"$set": {
            "members": group_members
          }}
        );
        console.log(`${result.upsertedId} has been updated with new user.`)
      } catch(e) {
        console.error(e);
      } finally {
        client.close();
      }
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
      const user = await userLogin(req.query['email']);
      console.log('here');
      console.log(user);
      if(user.length === 0){
        res.status(200).json({
          "status": "no user"
        });
      }else{
        if( user[0]['password'] !== req.query['password']){
          res.status(200).json({
            "status": "Incorrect Password"
          });
        }else{
        res.status(200).json({
          "status": "success",
          "id": user[0]['id'],
          "name": user[0]['name'],
          "email": user[0]['email'],
          "major": user[0]['major'],
          "cred_level": user[0]['cred_level'],
          "profile_url": user[0]['profile_url']
        });
      }
      }
    });

    app.post('/register', async (req, res) => {
      register_user(req.body['id'], req.body['email'], req.body['name'], req.body['major'], req.body['password'], req.body['cred_level'], req.body['profile_url']);
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
      console.log("Everything works till here");
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
      await register_group(options.class, options.name, options.members, options.loc_and_time, options.type, options.size);
      
      response.status(200).json({
        "status": "success"
      });
    });



    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
