import express from 'express';
import logger from 'morgan';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import 'dotenv/config';

const uri = process.env.DATABASE_URL;

// Returns a function that will read a score file.
    function readTheFile(path) {
      return async () => {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
          await client.connect();
          const result = await client.db('cs326-final').collection(path).find({}).toArray();
          return result;
        } catch (error) {
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
          let notifications = [];
          const data = {id, email, name, major, password, cred_level, profile_url, notifications};
          const result = await client.db('cs326-final').collection(path).insertOne(data);
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
          const data = {class :classid, name, members,loc_and_time,type,size};
          const result = await client.db('cs326-final').collection(path).insertOne(data);
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
        const col = await client.db('cs326-final').collection('users').updateOne({email: email}, {$set: {name: name, major:major, cred_level: cred_level }});

      } catch (error){
        console.error(error);
      }
    }



    async function getMyGroups(emailId) {

      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        let grps =  await client.db('cs326-final').collection('groups').find({ 'members.email': emailId } ).toArray();
        //const myGroups = await client.db('cs326-final').collection('groups').find({ 'members': { 'email': emailId } }).toArray();
        return grps;
      } catch(e) {
        console.error(e);
      } finally {
        client.close();
      }
      return [];
    }

    async function getMyNotis(emailId) {

      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        let notis = await client.db('cs326-final').collection('users').find({ 'email': emailId }).toArray();
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

      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      try {
        await client.connect();
        let notis = await client.db('cs326-final').collection('users').find({ 'email': emailId }).toArray();
        let notifis = notis[0].notifications;
        let updatedNotifis = [];
        notifis.forEach(element => {
          if(element.id !== given_id) {
            updatedNotifis.push(element);
          }
        });
        await client.db('cs326-final').collection('users').updateOne(
          { email: emailId }, 
          {
            "$set": {
              "notifications": updatedNotifis
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
      await register_group(options.class, options.name, options.members, options.loc_and_time, options.type, options.size);
      
      response.status(200).json({
        "status": "success"
      });
    });



    async function exit_group(email, groupId){
      const client  = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      try {
        await client.connect();

        const group = await client.db('cs326-final').collection('groups').find({ _id: ObjectId(groupId)}).toArray();
        

        const nGroup = group[0].members.filter(e => e.email !== email);
        
        await client.db('cs326-final').collection('groups').updateOne({_id : ObjectId(groupId)}, { $set : {members : nGroup}});

      } catch (error){
        console.error(error);
      }
    }



    app.delete('/exitGroup', async (request, response)=> {

      const options = request.query;

      await exit_group(options.email, options.id);

      response.status(200).json({
        "status": "success"
      });

    });



    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
