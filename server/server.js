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

// Create functions for reading from files.
const usersFunc = readTheFile(USERS_FILE);
const groupsFunc = readTheFile(GROUPS_FILE);


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
    console.log(members);
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
      console.log(element.notification);
      // writeFile(USERS_FILE, JSON.stringify(users), 'utf8');
    }
  });
}

const app = express();
const port = 3000;

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
  response.status(200).json({
    status: "successful"
  });
});

app.get('/getAllGroup', async (req,res) => {
  const list = await getAllGroup();
  res.status(200).json(list);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
