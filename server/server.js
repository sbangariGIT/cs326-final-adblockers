import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';

const GROUPS_FILE = 'groups.json';
const USERS_FILE = 'users.json';

// Returns a function that will read a score file.
function readTheFile(path) {
  return async () => {
    try {
      const file = await readFile(path, 'utf8');
      const data = JSON.parse(file);
      return data;
    } catch (error) {
      // Likely the file doesn't exist
      return [];
    }
  };
}

function saveToUsersFile(path) {
  return async (id, email, name, major, cred_level, profile_url) => {
    const data = {id, email, name, major, cred_level, profile_url};
    const scores = await usersFunc();
    scores.push(data);
    writeFile(path, JSON.stringify(scores), 'utf8');
  };
}
// Create functions for reading from files.
const usersFunc = readTheFile(USERS_FILE);
const groupsFunc = readTheFile(GROUPS_FILE);

const register_user = saveToUsersFile(USERS_FILE);

async function getAllGroup(){
  const groups = await groupsFunc();
  return groups;
}

// Returns a function that will save a user to the user file.
function saveToUserFile(path) {
  return async (id, email, name, major, cred_level, profile_url) => {
    const data = { id, email, name, major, cred_level, profile_url };
    const users = await usersFunc();
    users.push(data);
    writeFile(path, JSON.stringify(users), 'utf8');
  };
}

// Returns a function that will save a group to the group file.
function saveToGroupFile(path) {
  return async (group_id, _class, name, members, type, max) => {
    const data = { group_id, _class, name, members, type, max };
    const groups = await groupsFunc();
    groups.push(data);
    writeFile(path, JSON.stringify(groups), 'utf8');
  };
}

function checkForMember(key, value, userId) {

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
  users.forEach(element => {
    if(element.hasOwnProperty("notification") && element.email === emailId) {

      element.notification = element['notification'].filter(message => message['id'] !== given_id);
      // writeFile(USERS_FILE, JSON.stringify(users), 'utf8');
    }
  });
}

async function sendNotification(data, user_email) {
  let users = await usersFunc();
  for(let i = 0; i < users.length; i++) {
    let element = users[i];
    if(element.email === user_email) {
      if(element.hasOwnProperty('notification')) {
        element['notification'].push(data);
      }
      else {
        element['notification'] = [data];
      }
      writeFile(USERS_FILE, JSON.stringify(users), 'utf8');
    }
  }
}

async function addUserToGroup(data, group_name) {
  let groups = await groupsFunc();
  for(let i = 0; i < groups.length; i++) {
    let element = groups[i];
    if(element.name === group_name) {
      element['members'].push(data);
      writeFile(GROUPS_FILE, JSON.stringify(groups), 'utf8');
    }
  }
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/client', express.static('client'));

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

app.post('/register', (req, res) => {
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
  console.log(user);
  addUserToGroup(user, options.group_name);
  response.status(200).json({
    "status": "success"
  });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
