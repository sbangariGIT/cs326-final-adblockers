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
      const data = JSON.parse(scoreFile);
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

async function getMyGroups(userId) {
  const groups = await groupsFunc();
  let result = [];
  groups.forEach(element => {
    
  });
  
  return result;
}

async function getMyNotis(userId) {
  const users = await usersFunc();
  console.log(users);
  let result = {};
  users.forEach(element => {
    if(element.hasOwnProperty("notification") && element.id == userId) {
      return element.notification;
    }
  });
  
  return result;
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/client', express.static('client'));

app.get('myNotis', async (request, response) => {
  console.log('here');
  const options = request.query;
  const arr = await getMyNotis(options.email);
  response.status(200).json(arr);
});

app.delete('deleteNoti', async (request, response) => {
  console.log('here');
  const options = request.body;
  const arr = await getMyNotis(options.sent_by_id);
  response.status(200).json(arr);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
